import { useState, useEffect, Fragment } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { ReactReduxContext, Provider, useDispatch, useSelector } from "react-redux";
import { startWire, resetWire } from "../store/slices/wireSlice";
import { changeBlockConnection } from '../store/slices/blockSlice';
import { cloneDeep, last, compact } from 'lodash';

import Block from './Block';
import ClkPanel from "./ClkPanel";

const BLOCKS_AMOUNT = 2;

export default function Field() {
    const blocks = useSelector(state => state.blockReducer.blocks);
    const wires = useSelector(state => state.wireReducer.wires);
    const lastMovedBlockId = useSelector(state => state.blockReducer.lastMovedBlockId);

    const createBlocksComponents = () => {
        const blocks = [];
        for (let i = 0; i < BLOCKS_AMOUNT; i++) {
            blocks.push(
                <Block
                    x={ 20 }
                    y={ (i + 1) * 20 + i*50}
                    key={i}
                    id={`block${i}`}
                />
            )
        }

        return blocks;
    }

    const [blocksComponents, setBlocksComponents] = useState(createBlocksComponents());
    const [lines, setLines] = useState([]);
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
            newLines[lineIndex] = <Line
                points={[...wireStartCoords, ...wireEndCoords]}
                stroke='black'
                strokeWidth='4'
                lineCap='round'
                lineJoin='round'
                id={`${wire.id}`}
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

        const wireStartCoords = [
            newWire.connections[0].position.x + wireFromBlock.position.x,
            newWire.connections[0].position.y + wireFromBlock.position.y,
        ];
        const wireEndCoords = [
            newWire.connections[1].position.x + wireToBlock.position.x,
            newWire.connections[1].position.y + wireToBlock.position.y,
        ];

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

        const line = <Line
            points={[...wireStartCoords, ...wireEndCoords]}
            stroke='black'
            strokeWidth='4'
            lineCap='round'
            lineJoin='round'
            id={newWire.id}
            key={newWire.id}
        />

        setLines([...lines, line]);

        dispatch(resetWire());
    }, [wires]);


    const resetLineDrawing = () => {
        dispatch(startWire(null));
    }

    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Fragment>
                    <Stage width={window.innerWidth} height={70} onClick={resetLineDrawing}>
                        <Provider store={store}>
                            <Layer>
                                <ClkPanel/>
                            </Layer>
                        </Provider>
                    </Stage>
                    <Stage width={window.innerWidth} height={window.innerHeight - 70} onClick={resetLineDrawing}>
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