import { Rect } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { startWire, endWire, resetWire } from "../store/slices/wiresSlice";

export default function BlockConnection(props) {
    const connectionId = props.blockName + props.id;

    const dispatch = useDispatch();
    const startPosition = useSelector(state => state.wireReducer.startPosition);
    const blockPosition = useSelector(state => {
        return state.blocksReducer.positions.find(position => position.id === connectionId);
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
            connectionId: connectionId,
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
        <Rect
            onClick={handleClick}
            x={props.x}
            y={props.y}
            width={10}
            height={10}
            fill={'yellow'}
            shadowBlur={5}
        />
    );
}