import { Group, Rect, Text } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { startWire, endWire, resetWire } from "../store/slices/wiresSlice";
import {addConnectionPosition} from "../store/slices/connectionsSlice";
import {useEffect} from "react";

export default function BlockConnection({id, x, y, name, blockGlobalCoords, input}) {
    const dispatch = useDispatch();
    const startPosition = useSelector(state => state.wireReducer.startPosition);
    const wiresPositions = useSelector(state => state.wireReducer.wiresPositions);


    useEffect(() => {
        dispatch(addConnectionPosition({
            x: blockGlobalCoords.startX + x,
            y: blockGlobalCoords.startY + y,
            id: id
        }));
    });

    const positionIsTaken = (x, y) => wiresPositions.some(position => {
        const wireStartCoordinates = {
            x: position.sequence[0],
            y: position.sequence[1],
        };
        const wireEndCoordinates = {
            x: position.sequence[position.sequence.length - 2],
            y: position.sequence[position.sequence.length - 1],
        };
        return (
            (wireStartCoordinates.x === x && wireStartCoordinates.y === y) ||
            (wireEndCoordinates.x === x && wireEndCoordinates.y === y)
        );
    });


    const handleClick = event => {
        event.cancelBubble = true;

        const wireEndInfo = {
            x: blockGlobalCoords.startX + x + 5,
            y: blockGlobalCoords.startY + y + 5,
            connectionId: id,
        };

        const startPositionExistsAndNotEqualsEndPosition = startPosition
            && (startPosition.x !== wireEndInfo.x || startPosition.y !== wireEndInfo.y);

        if (!positionIsTaken(wireEndInfo.x, wireEndInfo.y)) {
            dispatch(startPositionExistsAndNotEqualsEndPosition ? endWire(wireEndInfo) : startWire(wireEndInfo));
        } else {
            dispatch(resetWire());
        }
    }

    return (
        <Group>
            <Rect
                onClick={handleClick}
                x={x}
                y={y}
                width={10}
                height={10}
                fill={'yellow'}
                shadowBlur={5}
            />
            <Text
                x={input ? x - 20 : x + 20}
                y={y}
                text={name}
                fontSize='12'
                fontFamily='Calibri'
                fill='black'
            />
        </Group>
    );
}