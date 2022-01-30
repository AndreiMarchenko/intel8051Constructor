import { useState, useEffect, Fragment } from 'react';
import { Stage, Layer } from 'react-konva';
import { ReactReduxContext, Provider, useDispatch, useSelector } from "react-redux";
import { startWire, resetWire, updateActiveWirePath } from "../store/slices/wireSlice";
import { changeBlockConnection } from '../store/slices/blockSlice';
import { cloneDeep, last, compact, isEmpty } from 'lodash';

import Register from './logic-blocks/register/Register';
import Inc from './logic-blocks/inc/Inc';
import Block from './Block';
import Wire from './Wire';
import ClkPanel from "./clk/ClkPanel";

const BLOCKS_AMOUNT = 2;

export default function Field() {
    const blocks = useSelector(state => state.blockReducer.blocks);
    const wires = useSelector(state => state.wireReducer.wires);
    const lastMovedBlockId = useSelector(state => state.blockReducer.lastMovedBlockId);
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const activePath = useSelector(state => state.wireReducer.activePath);
    const activeBlock = blocks.find(block => block.connections.find(connection => connection.id === activeConnection?.id));

    const createBlocksComponents = () => {
        const blocks = [];
        for (let i = 0; i < BLOCKS_AMOUNT; i++) {
            blocks.push(
                <Register
                    x={ 20 }
                    y={ (i + 1) * 20 + i*50 }
                    key={i}
                    id={`block${i}`}
                />
            )
        }

        blocks.push(
            <Inc
                x={ 20 }
                y={ 200 }
                key={3}
                id={`block${3}`}
            />
        )

        return blocks;
    }

    const [blocksComponents, setBlocksComponents] = useState(createBlocksComponents());
    const [lines, setLines] = useState([]);
    const [creatingWireFlag, setCreatingWireFlag] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!lastMovedBlockId) {
            return;
        }

        const lastMovedBlock = blocks.find(block => block.id === lastMovedBlockId);

        const changedWires = compact(
            lastMovedBlock.connections.map(connection => {
                return connection.connectedTo;
            })
        );

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

        const wireFromBlock = blocks.find(block => block.id ===  newWire.connections[0].blockId);
        const wireToBlock = blocks.find(block => block.id ===  newWire.connections[1].blockId);


        // let lastLine = last(lines);
        // setLines(...lines.slice(0, -1), lastLine);

        // const wireStartCoords = [
        //     newWire.connections[0].position.x + wireFromBlock.position.x,
        //     newWire.connections[0].position.y + wireFromBlock.position.y,
        // ];
        // const wireEndCoords = [
        //     newWire.connections[1].position.x + wireToBlock.position.x,
        //     newWire.connections[1].position.y + wireToBlock.position.y,
        // ];

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

        // const line = <Wire
        //     //points={[...wireStartCoords, ...wireEndCoords]}
        //     points={newWire.path}
        //     id={newWire.id}
        //     key={newWire.id}
        // />

        // setLines([...lines, line]);
        setCreatingWireFlag(false);

        dispatch(resetWire());
    }, [wires.length]);


    const handleClickOnField = event => {
        if (activeConnection) {
            dispatch(updateActiveWirePath({
                x: event.evt.clientX,
                y: event.evt.clientY - 70,
            }));
        }
    }

    useEffect(() => {
        if (activePath) {
            console.log('test');
            const line = <Wire
                points={activePath}
                id={lines.length}
                key={lines.length}
            />
            if (creatingWireFlag) {
                setLines([...lines.slice(0, -1), line, null]); // null at the end will be removed on mouseMove
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
                setLines([...lines.slice(0, -2), line]);
            }
        }
    }, [activePath]);

    const handleMouseMove = event => {
        if (activeConnection) {
            const startPosition = {
                x: activePath[activePath.length - 2],
                y: activePath[activePath.length - 1],
            };
            const line = <Wire
                points={[startPosition.x, startPosition.y, event.evt.clientX - 3, event.evt.clientY - 70 - 3]}
                id={'movingLine'}
                key={'movingLine'}
            />

            setLines([...lines.slice(0, -1), line]);
            setCreatingWireFlag(true);
        }
    }

    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Fragment>
                    <Stage width={window.innerWidth} height={70} onClick={handleClickOnField}>
                        <Provider store={store}>
                            <Layer>
                                <ClkPanel/>
                            </Layer>
                        </Provider>
                    </Stage>
                    <Stage width={window.innerWidth} height={window.innerHeight - 70} onClick={handleClickOnField} onMouseMove={handleMouseMove}>
                        <Provider store={store}>
                            <Layer>
                                <Fragment>
                                    { blocksComponents }
                                    { lines }
                                </Fragment>
                            </Layer>
                        </Provider>
                    </Stage>
                </Fragment>
            )}
        </ReactReduxContext.Consumer>
    );
}