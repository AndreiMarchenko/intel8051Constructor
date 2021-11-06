import { Group, Rect, Text } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { startWire, endWire, resetWire } from "../store/slices/wiresSlice";

export default function BlockConnection(props) {
    const dispatch = useDispatch();
    const startPosition = useSelector(state => state.wireReducer.startPosition);
    const blockPosition = useSelector(state => {
        return state.blocksReducer.positions.find(position => position.id === props.id);
    });
    const wiresPositions = useSelector(state => state.wireReducer.wiresPositions);



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
            x: blockPosition.x + 45,
            y: blockPosition.y + 25,
            connectionId: props.id,
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
                x={props.x}
                y={props.y}
                width={10}
                height={10}
                fill={'yellow'}
                shadowBlur={5}
            />
            <Text
                x={props.input ? props.x - 20 : props.x + 20}
                y={props.y}
                text={props.name}
                fontSize='12'
                fontFamily='Calibri'
                fill='black'
            />
        </Group>
    );
}