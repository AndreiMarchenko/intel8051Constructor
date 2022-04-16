import { Group, Line, Ellipse, Text } from 'react-konva';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {STATES} from "../../globals/globalStates";
import { BLOCK_CONNECTION_SIZE } from '../../globals/globals';
import {
    createWireConnection,
    startWire,
    changeWireConnectionPosition,
    updateWirePath,
    deleteWire,
    deleteWireConnections, setWireToStorage
} from "../../store/slices/wireSlice";
import usePrevious from "../../hooks/usePrevious";
import toHex from "../../utils/toHex";

export default function Wire({points, id}) {
    const wire = useSelector(state => state.wireReducer.wires.find(wire => wire.id === id));
    const wires = useSelector(state => state.wireReducer.wires);
    const activePath = useSelector(state => state.wireReducer.activePath);
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const payload = useSelector(state => state.wireReducer.wires.find(wire => +wire.id === +id)?.payload);
    const wireConnections = useSelector(state => state.wireReducer.wireConnections);
    const wireFromBlock = useSelector(state => state.blockReducer.blocks.find(block => block.connections.find(connection => connection.id === wire?.connections[0])));
    const wireToBlock = useSelector(state => state.blockReducer.blocks.find(block => block.connections.find(connection => connection.id === wire?.connections[1])));
    const wireFromWire = useSelector(state => state.wireReducer.wires.find(storageWire => {
        return wire?.connections[0].split('.')[1] === storageWire.id;
    }));
    const wireToWire = useSelector(state => state.wireReducer.wires.find(storageWire => {
        return wire?.connections[1].split('.')[1] === storageWire.id;
    }));
    const globalState = useSelector(state => state.globalStateReducer.globalState);
    const dispatch = useDispatch();


    const prevWireFromWireValue = usePrevious(wireFromWire);

    let [text, setText] = useState({
        x: null,
        y: null,
        content: null,
    });

    useEffect(() => {
        const x = points[0] + (points[2] - points[0]) / 2;
        const y = points[1] + (points[3] - points[1]) / 2;

        setText({
            x: isNaN(x) ? 0 : x,
            y: isNaN(y) ? 0 : y,
            content: toHex(payload)
        });
    }, [points, payload]);

    useEffect(() => {
        return () => {
            if (wire) {
                dispatch(deleteWireConnections({ wireId: wire.id}));
            }
        };
    }, []);

    useEffect(() => {
        if (!wire) {
            return;
        }

        let currentWireConnections = wireConnections.filter(wireConnection => +wireConnection.wireId === +wire.id);

        currentWireConnections.forEach(wireConnection => {
            const needsToMoveConnection = wireConnection.connectionIndex === 0 || wireConnection.connectionIndex === wire.path.length - 4;
            if (needsToMoveConnection) {
                const wirePath = wire.path;

                let newX;
                let newY;

                if (wireConnection.connectionIndex === 0) {
                    newX = wirePath[0] + (wirePath[2] - wirePath[0]) * wireConnection.firstPartToLengthRatio;
                    newY = wirePath[1] + (wirePath[3] - wirePath[1]) * wireConnection.firstPartToLengthRatio;
                } else if (wireConnection.connectionIndex === wire.path.length - 4) {
                    newX =
                        wirePath[wire.path.length - 4] +
                        (wirePath[wire.path.length - 2] - wirePath[wire.path.length - 4]) * wireConnection.firstPartToLengthRatio;

                    newY =
                        wirePath[wire.path.length - 3] +
                        (wirePath[wire.path.length - 1] - wirePath[wire.path.length - 3]) * wireConnection.firstPartToLengthRatio;
                }

                dispatch(changeWireConnectionPosition({
                    id: wireConnection.id,
                    x: newX,
                    y: newY,
                }));


                wires.forEach(wire => {
                    if (wire.connections[0] === wireConnection.id) {
                        dispatch(updateWirePath({
                            wireId: wire.id,
                            path: [newX, newY, ...wire.path.slice(2)],
                        }));
                    }
                })
            }
        });
    }, [wire]);

    useEffect(() => {
        if (!wireFromBlock && !wireFromWire) {
            if (!wireFromWire && prevWireFromWireValue) {
                dispatch(deleteWire({ wireId: id }));
            }
            return;
        }

        if (!wireToBlock && !wireToWire) {
            dispatch(deleteWire({ wireId: id }));
            return;
        }

        let wireStartCoords;

        const isFromWire = wire.connections[0].includes('wire');
        if (!isFromWire) {
            const wireFromBlockConnection = wireFromBlock.connections.find(connection => connection.id === wire.connections[0]);

            wireStartCoords = [
                wireFromBlockConnection.position.x + wireFromBlock.position.x + BLOCK_CONNECTION_SIZE / 2,
                wireFromBlockConnection.position.y + wireFromBlock.position.y + BLOCK_CONNECTION_SIZE / 2,
            ];
        } else {
            const wireFromWireConnection = wireConnections.find(connection => connection.id === wire.connections[0]);
            wireStartCoords = [
                wireFromWireConnection.position.x + BLOCK_CONNECTION_SIZE / 2,
                wireFromWireConnection.position.y + BLOCK_CONNECTION_SIZE / 2,
            ];
        }

        let wireEndCoords;
        const isToWire = wire.connections[1].includes('wire');
        if (!isToWire) {
            const wireToBlockConnection = wireToBlock.connections.find(connection => connection.id === wire.connections[1]);

            wireEndCoords = [
                wireToBlockConnection.position.x + wireToBlock.position.x + BLOCK_CONNECTION_SIZE / 2,
                wireToBlockConnection.position.y + wireToBlock.position.y + BLOCK_CONNECTION_SIZE / 2,
            ];
        } else {
            const wireToWireConnection = wireConnections.find(connection => connection.id === wire.connections[1]);
            wireEndCoords = [
                wireToWireConnection.position.x + BLOCK_CONNECTION_SIZE / 2,
                wireToWireConnection.position.y + BLOCK_CONNECTION_SIZE / 2,
            ];
        }

        dispatch(updateWirePath({
            wireId: wire.id,
            path: [...wireStartCoords, ...wire.path.slice(2, -2), ...wireEndCoords],
        }));
    }, [wireFromBlock, wireFromWire, wireToBlock, wireToWire]);

    const handleWireClick = event => {
        const position = event.target.getLayer().getRelativePointerPosition();
        if (globalState === STATES.DELETING || !wire) {
            return;
        }
        event.cancelBubble = true;

        const connectionId = `wire.${id}.` + (wireConnections.length ? wireConnections.length + 1 : 0);

        const x = position.x;
        const y = position.y;

        let connectionIndex;
        let firstPartToLengthRatio;

        for (let i = 0; i <= wire.path.length - 4; i += 2) {
            const firstPoint = [wire.path[i], wire.path[i + 1]];
            const secondPoint = [wire.path[i + 2], wire.path[i + 3]];

            const A = firstPoint[1] - secondPoint[1];
            const B = secondPoint[0] - firstPoint[0];
            const C = firstPoint[0] * secondPoint[1] - secondPoint[0] * firstPoint[1];
            const distanceToWire = Math.abs(A * x + B * y + C) / (Math.sqrt(A * A + B * B));

            if (distanceToWire < 2) {
                connectionIndex = i;
                const wireLength = Math.sqrt(Math.pow(wire.path[i + 2] - wire.path[i], 2) + Math.pow(wire.path[i + 3] - wire.path[i + 1], 2));
                const wireStartToConnectionLength =
                    Math.sqrt(Math.pow(x - wire.path[i], 2) + Math.pow(y - wire.path[i + 1], 2));

                firstPartToLengthRatio = wireStartToConnectionLength / wireLength;
            }
        }

        const wireConnection = {
            position: {
                x: x,
                y: y,
            },
            id: connectionId,
            wireId: id,
            connectionIndex: connectionIndex,
            firstPartToLengthRatio: firstPartToLengthRatio
        };

        dispatch(createWireConnection(wireConnection));

        if (!activePath) {
            dispatch(startWire({ connection: wireConnection }));
        } else {
            dispatch(setWireToStorage({
                firstConnection: activeConnection,
                secondConnection: wireConnection,
            }));
        }
    }

    return (
        <Group
            onClick={handleWireClick}
            onMouseEnter={e => {
                if (globalState === STATES.DELETING) {
                    return;
                }
                const container = e.target.getStage().container();
                container.style.cursor = "pointer";
            }}
            onMouseLeave={e => {
                const container = e.target.getStage().container();

                if (globalState === STATES.DELETING) {
                    container.style.cursor = "crosshair";
                } else {
                    container.style.cursor = "default";
                }
            }}
        >
            <Line
                points={points}
                stroke='black'
                strokeWidth={3}
                lineCap='round'
                lineJoin='round'
            />
            { wire && wire.prevPayload !== undefined && wire.payload !== wire.prevPayload &&
                <Ellipse
                    x={text.x + 5 + (text.content?.length*3 ?? 0)}
                    y={text.y + 10}
                    width={30 + (text.content?.length ?? 0)*12}
                    height={20 + (text.content?.length ?? 0)}
                    strokeWidth={2}
                    opacity={0.9}
                    stroke='blue'
                />
            }
            <Text
                x={text.x}
                y={text.y}
                text={text.content}
                fontSize={22}
                fontFamily='Calibri'
                fill='red'
            />
        </Group>
    );
}