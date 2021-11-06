import { useEffect, useRef } from "react";
import { Rect, Group } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { addBlockPosition } from "../store/slices/blocksSlice";
import { addWirePosition } from "../store/slices/wiresSlice";
import { clone } from 'lodash';

import InputConnections from "./InputConnections";
import OutputConnections from "./OutputConnections";

export default function Block(props) {
    const className = `block blockId${props.blockId}`;
    const dispatch = useDispatch();
    const wires = useSelector(state => state.wireReducer.wiresPositions);

    const setBlockPositionInStorage = event => {
        const newCoordinates = event.currentTarget.find(`#block${props.id}`)[0].getAbsolutePosition();
        dispatch(addBlockPosition({
            x: newCoordinates.x,
            y: newCoordinates.y,
            id: props.id
        }));

        const blockWire = wires.filter(wire => {
            return wire.fromConnection === props.id || wire.toConnection === props.id;
        });

        if (blockWire.length) {
            const changeWireBeginning = blockWire[0].fromConnection === props.id;
            const newSequence = clone(blockWire[0].sequence);
            if (changeWireBeginning) {
                newSequence[0] = newCoordinates.x + 45;
                newSequence[1] = newCoordinates.y + 25;
            } else {
                newSequence[newSequence.length - 2] = newCoordinates.x + 45;
                newSequence[newSequence.length - 1] = newCoordinates.y + 25;
            }
            dispatch(addWirePosition({
                id: blockWire[0].id,
                sequence: newSequence,
            }));
        }
    }

    const rect = useRef();

    useEffect(() => {
        const coordinates = rect.current.getAbsolutePosition();
        dispatch(addBlockPosition({
            x: coordinates.x,
            y: coordinates.y,
            id: props.id
        }));
    });

    const blockCoords = {
        startX: props.x,
        startY: props.y,
        endX: props.x + 50,
        endY: props.y + 50,
    };


    const inputConnectionNames = ['clk', 'd', 'r'];
    const outputConnectionNames = ['q', 'qn'];

    return (
        <Group x={props.x} y={props.y} draggable onDragMove={setBlockPositionInStorage}>
            <Rect
                ref={rect}
                x={blockCoords.startX}
                y={blockCoords.startY}
                width={blockCoords.endX - blockCoords.startX}
                height={blockCoords.endY - blockCoords.startY}
                fill={'red'}
                shadowBlur={5}

                id={`block${props.id}`}
                className={className}
            />
            <InputConnections blockCoords={blockCoords} blockId={props.blockId} names={inputConnectionNames}/>
            <OutputConnections blockCoords={blockCoords} blockId={props.blockId} names={outputConnectionNames}/>
        </Group>
    );
}