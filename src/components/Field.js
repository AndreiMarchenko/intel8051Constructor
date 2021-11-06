import { useState, useEffect, Fragment } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { ReactReduxContext, Provider, useDispatch, useSelector } from "react-redux";
import { startWire, resetWire, addWirePosition } from "../store/slices/wiresSlice";
import { addBlockPosition } from '../store/slices/blocksSlice';
import { cloneDeep } from 'lodash';
import usePrevious from '../hooks/usePrevious';

import Block from './Block';

const BLOCKS_AMOUNT = 4;

export default function Field(props) {
    const newWireStartPosition = useSelector(state => state.wireReducer.startPosition);
    const newWireEndPosition= useSelector(state => state.wireReducer.endPosition);
    const lastMovedBlockId = useSelector(state => state.blocksReducer.lastMovedBlockId);
    const blocksPositions =  useSelector(state => state.blocksReducer.positions);
    const lastChangedWireId = useSelector(state => state.wireReducer.lastChangedWireId);
    const wiresPositions = useSelector(state => state.wireReducer.wiresPositions);


    const syncBlockPositionInStorage = position => {
        dispatch(addBlockPosition({
            x: position.x,
            y: position.y,
            id: position.id
        }));
    };

    const createBlocks = blocksPositions => {
        const blocks = [];
        for (let i = 0; i < BLOCKS_AMOUNT; i++) {
            let x;
            let y;
            let block = blocksPositions.find(blockPosition => blockPosition.id === `block${i}`);
            if (block) {
                x = block.x;
                y = block.y;
            }

            blocks.push(
                <Block
                    x={ x ?? 20 }
                    y={ y ?? (i + 1) * 20 + i*50}
                    key={i}
                    id={`block${i}`}
                    passBlockPositionToParent={syncBlockPositionInStorage}
                />
            )
        }

        return blocks;
    }

    const [blocks, setBlocks] = useState(createBlocks(blocksPositions));
    const [lines, setLines] = useState([]);
    const [linePoints, setLinePoints] = useState([]);
    const dispatch = useDispatch();


    const lastMovedBlock = blocksPositions.find(block => block.id === lastMovedBlockId);
    const prevWireStartPosition = usePrevious(newWireStartPosition);

    useEffect(() => {
        setBlocks(createBlocks(blocksPositions));

        const changedWiresPositions = wiresPositions.filter(position => {
            return position.fromConnection.includes(lastMovedBlock.id) ||
                position.toConnection.includes(lastMovedBlock.id);
        });


        const newLines = cloneDeep(lines);
        changedWiresPositions.forEach(position => {
            const wireIndex = lines.findIndex(wire => +wire.props.id === +position.id);
            newLines[wireIndex] = <Line
                points={position.sequence}
                stroke='black'
                strokeWidth='4'
                lineCap='round'
                lineJoin='round'
                id={`${position.id}`}
                key={position.id}
            />
        });

        setLines(newLines);
        dispatch(resetWire());

    }, [blocksPositions]);

    useEffect(() => {
        if (!newWireStartPosition) {
            return;
        }

        if (
            prevWireStartPosition?.x !== newWireStartPosition?.x
            && prevWireStartPosition?.y !== newWireStartPosition?.y
        ) {
            setLinePoints([newWireStartPosition.x, newWireStartPosition.y]);
        }
    }, [newWireStartPosition]);

    useEffect(() => {
        if (!newWireEndPosition || !newWireStartPosition) {
            return;
        }

        const wireSequence = [
            newWireStartPosition.x,
            newWireStartPosition.y,
            newWireEndPosition.x,
            newWireEndPosition.y
        ];

        const line = <Line
            points={wireSequence}
            stroke='black'
            strokeWidth='4'
            lineCap='round'
            lineJoin='round'
            id={lines.length}
            key={lines.length}
        />

        setLines([...lines, line]);
        dispatch(addWirePosition({
            id: lines.length,
            sequence: wireSequence,
            fromConnection: newWireStartPosition.connectionId,
            toConnection: newWireEndPosition.connectionId,
        }));

        dispatch(resetWire());
    }, [newWireEndPosition]);


    const resetLineDrawing = (event) => {
        dispatch(startWire(null));
    }

    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Stage width={window.innerWidth} height={window.innerHeight} onClick={resetLineDrawing}>
                    <Provider store={store}>
                        <Layer>
                            <Fragment>
                                { blocks }
                                { lines }
                            </Fragment>
                        </Layer>
                    </Provider>
                </Stage>
            )}
        </ReactReduxContext.Consumer>
    );
}