import {useRef, useState, Fragment, useEffect} from "react";
import { Rect, Group } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { changeBlock, setBlockToStorage } from "../store/slices/blockSlice";
import useThrottle from "../hooks/useThrottle";

import BlockConnection from "./BlockConnection";

export default function Block({id, x, y, width, height, connections, slot, color}) {
    const dispatch = useDispatch();
    const blockFromStorage = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);

    const [block, setBlock] = useState({
        id,
        name: 'ram',
        connections: connections,
        position: {
            x: x,
            y: y,
        }
    });

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

    const changeBlockPosition = event => {
        if (activeConnection) {
            blockRef.current.stopDrag();
            return;
        }

        const newCoordinates = event.currentTarget.find(`#${id}`)[0].getAbsolutePosition();
        dispatch(changeBlock({...block, position: newCoordinates}));
    }

    const blockConnectionsComponents = block.connections.map(connection => {
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


    return (
        <Group x={x} y={y} draggable ref={blockRef} onDragMove={useThrottle(changeBlockPosition, 50)}>
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