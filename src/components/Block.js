import { useRef } from "react";
import { Rect, Group } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { addWirePosition } from "../store/slices/wiresSlice";
import { clone } from 'lodash';

import InputConnections from "./InputConnections";
import OutputConnections from "./OutputConnections";

export default function Block({id, x, y, passBlockPositionToParent}) {
    const dispatch = useDispatch();
    const wires = useSelector(state => state.wireReducer.wiresPositions);
    const blockPositions = useSelector(state => state.blocksReducer.positions);

    const rect = useRef();

    const setBlockPositionInStorage = event => {
        const newCoordinates = event.currentTarget.find(`#${id}`)[0].getAbsolutePosition();
        const prevCoordinates = blockPositions.find(position => position.id === id);
        const coordinateDiff = {
            x: newCoordinates.x - prevCoordinates?.x,
            y: newCoordinates.y - prevCoordinates?.y,
        }

        const blockWires = wires.filter(wire => {
            return wire.fromConnection.includes(id) || wire.toConnection.includes(id);
        });

        blockWires.forEach(blockWire => {
            const changeWireBeginning = blockWire.fromConnection.includes(id);
            const newSequence = clone(blockWire.sequence);
            if (changeWireBeginning) {
                newSequence[0] = blockWire.sequence[0] + coordinateDiff.x;
                newSequence[1] = blockWire.sequence[1] + coordinateDiff.y;
            } else {
                newSequence[newSequence.length - 2] = blockWire.sequence[newSequence.length - 2] + coordinateDiff.x;
                newSequence[newSequence.length - 1] = blockWire.sequence[newSequence.length - 1] + coordinateDiff.y;
            }
            dispatch(addWirePosition({
                id: blockWire.id,
                sequence: newSequence,
            }));
        });


        passBlockPositionToParent({
            x: newCoordinates.x,
            y: newCoordinates.y,
            id: id
        });
    }

    const blockGlobalCoords = {
        startX: x,
        startY: y,
        endX: x + 50,
        endY: y + 50,
    };


    const inputConnectionNames = ['clk', 'd', 'r'];
    const outputConnectionNames = ['q', 'qn'];

    return (
        <Group ref={rect} x={x} y={y} draggable onDragEnd={setBlockPositionInStorage}>
            <Rect
                x={0}
                y={0}
                width={50}
                height={50}
                fill={'red'}
                shadowBlur={5}

                id={id}
            />
            <InputConnections blockGlobalCoords={blockGlobalCoords} blockId={id} names={inputConnectionNames}/>
            <OutputConnections blockGlobalCoords={blockGlobalCoords} blockId={id} names={outputConnectionNames}/>
        </Group>
    );
}