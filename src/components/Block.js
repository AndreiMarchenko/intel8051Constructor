import {useRef, useState, Fragment, useEffect} from "react";
import { Rect, Group } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { changeBlock, setBlockToStorage } from "../store/slices/blockSlice";
import useThrottle from "../hooks/useThrottle";

import BlockConnection from "./BlockConnection";

export default function Block({id, x, y}) {
    const dispatch = useDispatch();
    const blockFromStorage = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));
    const connections = [
        {
            id: id + '.clk',
            name: 'clk',
            connectedTo: null,
            type: 'in',
            position: {
                x: 0,
                y: 0,
            },
            blockId: id,
        },
        {
            id: id + '.d',
            name: 'd',
            connectedTo: null,
            type: 'in',
            position: {
                x: 0,
                y: 20,
            },
            blockId: id,
        },
        {
            id: id + '.en',
            name: 'en',
            connectedTo: null,
            type: 'in',
            position: {
                x: 0,
                y: 40,
            },
            blockId: id,
        },
        {
            id: id + '.q',
            name: 'q',
            connectedTo: null,
            type: 'out',
            position: {
                x: 40,
                y: 0,
            },
            blockId: id,
        },
        {
            id: id + '.qn',
            name: 'qn',
            connectedTo: null,
            type: 'out',
            position: {
                x: 40,
                y: 20,
            },
            blockId: id,
        },
        {
            id: id + '.qq',
            name: 'qq',
            connectedTo: null,
            type: 'out',
            position: {
                x: 40,
                y: 40,
            },
            blockId: id,
        },
    ];

    const [block, setBlock] = useState({
        id,
        name: 'ram',
        connections: connections,
        position: {
            x: x,
            y: y,
        }
    });

    const rect = useRef();

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
        <Group ref={rect} x={x} y={y} draggable onDragMove={useThrottle(changeBlockPosition, 50)}>
            <Fragment>
                <Rect
                    x={0}
                    y={0}
                    width={50}
                    height={50}
                    fill={'red'}
                    shadowBlur={5}

                    id={id}
                />
                { blockConnectionsComponents }
            </Fragment>
        </Group>
    );
}