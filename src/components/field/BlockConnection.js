import { Group, Rect, Text } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { startWire, resetWire, setWireToStorage } from "../../store/slices/wireSlice";
import { useState } from "react";

import { BLOCK_CONNECTION_SIZE } from '../../globals/globals';

export default function BlockConnection({id, x, y, name, input, connectedTo, blockId}) {
    const dispatch = useDispatch();
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const block = useSelector(state => state.blockReducer.blocks.find(block => block.id === blockId));

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
            let connectionWithAbsoluteCoords = connection;
            // connectionWithAbsoluteCoords.position = {
            //     x: x + block.position.x,
            //     y: y + block.position.y,
            // };

            setConnection(connectionWithAbsoluteCoords);
            dispatch(startWire({connection, block}));
            return;
        }

        if (activeConnection.id !== connection.id) {
            dispatch(setWireToStorage({
                firstConnection: activeConnection,
                secondConnection: connection,
                secondBlock: block,
            }));
            // dispatch(resetWire());
        }
    }

    return (
        <Group>
            <Rect
                onClick={handleClick}
                x={x}
                y={y}
                width={BLOCK_CONNECTION_SIZE}
                height={BLOCK_CONNECTION_SIZE}
                fill={'yellow'}
                shadowBlur={5}
            />
            <Text
                x={input ? x - 20 : x + 20}
                y={y}
                text={name}
                fontSize={12}
                fontFamily='Calibri'
                fill='black'
            />
        </Group>
    );
}