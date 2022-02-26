import { useState, useEffect, Fragment } from 'react';
import {Stage, Layer, Group} from 'react-konva';
import { ReactReduxContext, Provider, useDispatch, useSelector } from "react-redux";
import { resetWire, updateActiveWirePath, deleteWire } from "../../store/slices/wireSlice";
import { changeBlockConnection, changeBlockPosition, deleteBlock, resetConnection, resetLastMovedBlock } from '../../store/slices/blockSlice';
import { cloneDeep, last, compact, chunk } from 'lodash';
import { STATES } from '../../globals/globalStates';
import { changeState } from "../../store/slices/globalStateSlice";
import {BLOCK_SIZES, TOP_PANEL_HEIGHT} from "../../globals/globals";

import Wire from './Wire';
import ClkPanel from "./clk/ClkPanel";
import BlockFactory from "../../utils/BlockFactory";
import useThrottle from "../../hooks/useThrottle";


export default function Field({ clkPanelDimensions, fieldDimensions }) {
    const blocks = useSelector(state => state.blockReducer.blocks);
    const wires = useSelector(state => state.wireReducer.wires);
    const lastMovedBlockId = useSelector(state => state.blockReducer.lastMovedBlockId);
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const activePath = useSelector(state => state.wireReducer.activePath);
    const activeBlock = blocks.find(block => block.connections.find(connection => connection.id === activeConnection?.id));
    const globalState = useSelector(state => state.globalStateReducer.globalState);
    const globalStatePayload = useSelector(state => state.globalStateReducer.statePayload);

    const [blocksComponents, setBlocksComponents] = useState([]);
    const [lines, setLines] = useState([]);
    const [creatingWireFlag, setCreatingWireFlag] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!lastMovedBlockId) {
            return;
        }

        const lastMovedBlock = blocks.find(block => block.id === lastMovedBlockId);

        const changedWires = lastMovedBlock ? compact(
            lastMovedBlock.connections.map(connection => {
                return connection.connectedTo;
            })
        ) : [];

        const newLines = cloneDeep(lines);
        changedWires.forEach(wire => {
            const wireFromBlock = blocks.find(block => block.id === wire.connections[0].blockId);
            const wireToBlock = blocks.find(block => block.id === wire.connections[1].blockId);

            const wireStartCoords = [
                wire.connections[0].position.x + wireFromBlock.position.x,
                wire.connections[0].position.y + wireFromBlock.position.y,
            ];
            const wireEndCoords = [
                wire.connections[1].position.x + wireToBlock.position.x,
                wire.connections[1].position.y + wireToBlock.position.y,
            ];

            const lineIndex = lines.findIndex(line => +line.props.id === wire.id);
            newLines[lineIndex] = <Wire
                points={[...wireStartCoords, ...wire.path.slice(2, -2), ...wireEndCoords]}
                id={+wire.id}
                key={wire.id}
            />
        });

        setLines(newLines);
        dispatch(resetWire());

    }, [blocks]);

    useEffect(() => {
        const newWire = last(wires);
        if (!newWire) {
            return;
        }

        const wireFromBlock = blocks.find(block => block.id === newWire.connections[0].blockId);
        const wireToBlock = blocks.find(block => block.id === newWire.connections[1].blockId);

        dispatch(changeBlockConnection({
            blockId: wireFromBlock.id,
            connectionId: newWire.connections[0].id,
            connectedTo: newWire,
        }));
        dispatch(changeBlockConnection({
            blockId: wireToBlock.id,
            connectionId: newWire.connections[1].id,
            connectedTo: newWire,
        }));

        setCreatingWireFlag(false);

        dispatch(resetWire());
    }, [wires.length]);

    const handleClickOnField = event => {
        if (globalState === STATES.ADDING_BLOCKS) {
            dispatch(changeBlockPosition({
                blockId: last(blocks).id,
                position: {
                    x: event.evt.clientX,
                    y: event.evt.clientY - TOP_PANEL_HEIGHT,
                }
            }));
            dispatch(changeState(STATES.GENERAL));
        } else if (globalState === STATES.DELETING) {
            dispatch(resetLastMovedBlock());

            const deleteX = event.evt.clientX;
            const deleteY = event.evt.clientY - TOP_PANEL_HEIGHT;

            const wire = wires.find(wire => {
                return wire.path.find((_, index) => {
                    if (index % 2 !== 0) {
                        return false;
                    }
                    if (!wire.path[index + 3]) {
                        return false;
                    }

                    const firstPoint = [wire.path[index], wire.path[index + 1]];
                    const secondPoint = [wire.path[index + 2], wire.path[index + 3]];

                    const A = firstPoint[1] - secondPoint[1];
                    const B = secondPoint[0] - firstPoint[0];
                    const C = firstPoint[0] * secondPoint[1] - secondPoint[0] * firstPoint[1];
                    const distanceToWire = Math.abs(A * deleteX + B * deleteY + C) / (Math.sqrt(A * A + B * B));

                    const clickedOnWire = distanceToWire < 5;

                    return clickedOnWire;
                });
            });

            if (wire) {
                dispatch(deleteWire({
                    wireId: wire.id
                }));

                const localWiresIndex = lines.findIndex(localWire => localWire.props.id === wire.id);

                const newLines = cloneDeep(lines);
                newLines.splice(localWiresIndex, 1);

                setLines(newLines);
                return;
            }

            const block = blocks.find(block => {
                return  (deleteX >= block.position.x && deleteX <= block.position.x + BLOCK_SIZES[block.name])
                    && (deleteY >= block.position.y && deleteY <= block.position.y + BLOCK_SIZES[block.name])
            });

            if (!block) {
                return;
            }

            for (let connection of block.connections) {
                if (connection.connectedTo) {
                    const wire = connection.connectedTo;
                    dispatch(deleteWire({
                        wireId: wire.id
                    }));

                    wire.connections.forEach(connection => {
                        dispatch(resetConnection({
                            blockId: connection.blockId,
                            name: connection.name,
                        }));
                    })

                    setLines(lines => {
                        const localWiresIndex = lines.findIndex(localWire => localWire.props.id === wire.id);
                        const linesCopy = cloneDeep(lines);
                        console.log(linesCopy);
                        linesCopy.splice(localWiresIndex, 1)
                        return linesCopy;
                    });
                }
            }

            dispatch(deleteBlock({
                blockId: block.id
            }));

            const blockComponentIndex = blocksComponents.findIndex(blockComponent => blockComponent.props.id === block.id);

            const newBlockComponents = cloneDeep(blocksComponents);
            newBlockComponents.splice(blockComponentIndex, 1);

            setBlocksComponents(newBlockComponents);
        } else if (activeConnection) {
            dispatch(updateActiveWirePath({
                x: event.evt.clientX,
                y: event.evt.clientY - 80,
            }));
        }
    }

    useEffect(() => {
        if (activePath) {
            const line = <Wire
                points={activePath}
                id={lines.length}
                key={lines.length}
            />
            if (creatingWireFlag) {
                setLines([...lines.slice(0, -1), line]); // null at the end will be removed on mouseMove
            } else {
                setLines([...lines, null]);
            }
        } else {
            if (creatingWireFlag) {
                const lastLine = last(lines);
                const beforeLastLine = lines[lines.length - 2];

                const isDirectWire = beforeLastLine;
                const beforeLastLinePoints = isDirectWire ? beforeLastLine.props.points : [];

                const line = <Wire
                    points={[...beforeLastLinePoints, ...lastLine.props.points]}
                    id={wires.length - 1}
                    key={wires.length - 1}
                />
                setLines([...lines.slice(0, -1), line]);
            }
        }
    }, [activePath]);

    useEffect(() => {
        if (globalState === STATES.CANCEL_ADDING_BLOCKS) {

            dispatch(deleteBlock({
                blockId: last(blocksComponents)?.id
            }));
            setBlocksComponents([...blocksComponents.slice(0, -1)]);
            dispatch(changeState(STATES.GENERAL));
            return;
        }

        if (globalState === STATES.ADDING_BLOCKS) {
            const lastBlockId = last(blocks)?.id || 0;

            const block = BlockFactory(globalStatePayload.blockType, +lastBlockId + 1);
            addBlockToField(block);
        }
    }, [globalState, globalStatePayload]);

    const handleMouseMove = useThrottle(event => {
        if (globalState === STATES.ADDING_BLOCKS) {
            const lastBlockId = last(blocks)?.id || 0;

            // dispatch(deleteBlock({
            //     blockId: lastBlockId
            // }));
            let movedBlock = BlockFactory(globalStatePayload.blockType, +lastBlockId, event.evt.clientX, event.evt.clientY - 80);
            const slicedBlockComponents = cloneDeep(blocksComponents).slice(0, -1);
            setBlocksComponents([...slicedBlockComponents, movedBlock]);
        } else if (activeConnection) {
            const line = <Wire
                points={[...activePath, event.evt.clientX - 3, event.evt.clientY - 80 - 3]}
                id={'movingLine'}
                key={'movingLine'}
            />
            const slicedLines = cloneDeep(lines).slice(0, -1);
            setLines([...slicedLines, line]);
            setCreatingWireFlag(true);
        }
    }, 40);

    const addBlockToField = block => {
        if (globalStatePayload.alreadyMoving) {
            dispatch(deleteBlock({
                blockId: last(blocksComponents).id
            }));
        }
        const slicedBlocksComponents = cloneDeep(blocksComponents).slice(0, -1);

        setBlocksComponents([...(globalStatePayload.alreadyMoving ? slicedBlocksComponents : blocksComponents), block]);
    };

    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Fragment>
                    <Stage
                        width={fieldDimensions.width}
                        height={fieldDimensions.height}
                        onClick={handleClickOnField}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={e => {
                            const container = e.target.getStage().container();
                            if (globalState === STATES.DELETING) {
                                container.style.cursor = "crosshair";
                            } else  {
                                container.style.cursor = "default";
                            }
                        }}
                    >
                        <Provider store={store}>
                            <Layer>
                                <Fragment>
                                    { blocksComponents }
                                    { lines }
                                </Fragment>
                            </Layer>
                        </Provider>
                    </Stage>
                    <Stage
                        width={clkPanelDimensions.width}
                        height={clkPanelDimensions.height}
                    >
                        <Provider store={store}>
                            <Layer>
                                <ClkPanel/>
                            </Layer>
                        </Provider>
                    </Stage>
                </Fragment>
            )}
        </ReactReduxContext.Consumer>
    );
}