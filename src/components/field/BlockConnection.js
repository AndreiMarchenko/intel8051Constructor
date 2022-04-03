import { Group, Rect, Text } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { startWire, resetWire, setWireToStorage } from "../../store/slices/wireSlice";
import { useState } from "react";

import { STATES} from "../../globals/globalStates";
import { BLOCK_CONNECTION_SIZE } from '../../globals/globals';

export default function BlockConnection({id, x, y, name, input, connectedTo, connectedToType, blockId}) {
    const dispatch = useDispatch();
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const block = useSelector(state => state.blockReducer.blocks.find(block => block.id === blockId));
    const globalState = useSelector(state => state.globalStateReducer.globalState);

    const [connection, setConnection] = useState({
        id,
        name,
        position: {
            x: x,
            y: y,
        },
        connectedTo,
        connectedToType,
        input,
        blockId
    });

    const handleClick = event => {
        event.cancelBubble = true;

        if (connectedTo) {
            dispatch(resetWire());
            return;
        }

        if (activeConnection === null) {
            let connectionWithAbsoluteCoords = connection;

            setConnection(connectionWithAbsoluteCoords);
            dispatch(startWire({
                connection: connection.id,
                block
            }));
            return;
        }

        if (activeConnection.id !== connection.id) {
            dispatch(setWireToStorage({
                firstConnection: activeConnection,
                secondConnection: connection.id,
                secondBlock: block,
            }));
        }
    }

    return (
        <Group
            onMouseEnter={e => {
                const container = e.target.getStage().container();
                container.style.cursor = "pointer";
            }}
            onMouseLeave={e => {
                const container = e.target.getStage().container();

                if (globalState === STATES.DELETING) {
                    container.style.cursor = "crosshair";
                } else {
                    container.style.cursor = "default";
                }
            }}
        >
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
                x={input ? x - name.length * 5 - 10 : x + 20}
                y={y}
                text={name}
                fontSize={12}
                fontFamily='Calibri'
                fill='black'
            />
        </Group>
    );
}