import {useRef, useState, Fragment, useEffect} from "react";
import { Rect, Group } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { changeBlockPosition, setBlockToStorage } from "../../store/slices/blockSlice";
import useThrottle from "../../hooks/useThrottle";
import { TOP_PANEL_HEIGHT } from '../../globals/globals';

import BlockConnection from "./BlockConnection";

export default function Block({id, x, y, width, height, connections, slot, color, name}) {
    const dispatch = useDispatch();
    const blockFromStorage = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);

    const [block, setBlock] = useState({
        id,
        name: name,
        connections: connections,
        position: {
            x: x,
            y: y,
        }
    });

    const [blockConnectionsComponents, setBlockConnectionsComponents] = useState([]);

    const blockRef = useRef();

    useEffect(() => {
        dispatch(setBlockToStorage(block));
    }, []);

    useEffect(() => {
        if (!blockFromStorage) {
            return;
        }
        setBlock(blockFromStorage);
    }, [blockFromStorage]);

    const moveBlock = () => {
        if (activeConnection) {
            blockRef.current.stopDrag();
            return;
        }

        const newCoordinates = blockRef.current.children[0].getAbsolutePosition();
        dispatch(changeBlockPosition({blockId: block.id, position: newCoordinates}));
    }

    useEffect(() => {
        setBlock({...block, connections});
        let blockConnections = block.connections.map(connection => {
            return <BlockConnection
                id={connection.id}
                key={connection.id}
                name={connection.name}
                x={connection.position.x}
                y={connection.position.y}
                connectedTo={connection.connectedTo}
                blockId={connection.blockId}
                input={connection.type === 'in'}
            />
        });

        setBlockConnectionsComponents(blockConnections);
    }, [connections]);


    return (
        <Group x={x} y={y} draggable ref={blockRef} onDragMove={useThrottle(moveBlock, 50)}>
            <Fragment>
                <Rect
                    x={0}
                    y={0}
                    width={width} //50
                    height={height} //50
                    fill={color}
                    shadowBlur={5}

                    id={id}
                />
                { slot }
                { blockConnectionsComponents }
            </Fragment>
        </Group>
    );
}