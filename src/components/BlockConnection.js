import { Group, Rect, Text } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { startWire, resetWire, setWireToStorage } from "../store/slices/wireSlice";
import { useState } from "react";

export default function BlockConnection({id, x, y, name, input, connectedTo, blockId}) {
    const dispatch = useDispatch();
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);

    const [connection, setConnection] = useState({
        id,
        name,
        position: {
            x: x,
            y: y,
        },
        connectedTo,
        input,
        blockId
    });

    const handleClick = event => {
        event.cancelBubble = true;

        if (connectedTo) {
            dispatch(resetWire());
            return;
        }

        if (!activeConnection) {
            dispatch(startWire(connection));
            return;
        }

        if (activeConnection.id !== connection.id) {
            dispatch(setWireToStorage([activeConnection, connection]));
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