import {useRef, Fragment, useState, useEffect} from "react";
import { Rect, Group } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import {changeBlockPosition, setBlockToStorage, setSelectedBlockId} from "../../store/slices/blockSlice";

import BlockConnection from "./BlockConnection";
import useThrottle from "../../hooks/useThrottle";
import { FIELD_WIDTH, FIELD_HEIGHT, BLOCK_SIZES } from "../../globals/globals";

export default function Block({id, x, y, width, height, connections, slot, color}) {
    const dispatch = useDispatch();
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const selectedBlockId = useSelector(state => state.blockReducer.selectedBlockId);
    const block = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));

    let [isActive, setIsActive] = useState(false);

    const blockRef = useRef();

    useEffect(() => {
        if (selectedBlockId === id) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [selectedBlockId]);

    const setBlockToStorage = useThrottle((newCoordinates) => {
        dispatch(changeBlockPosition({blockId: id, position: newCoordinates}));
    }, 100);

    const moveBlock = () => {
        if (activeConnection) {
            blockRef.current.stopDrag();
            return;
        }


        const newCoordinates = blockRef.current.children[0].getAbsolutePosition();

        if (newCoordinates.x < 0) {
            newCoordinates.x = 0;
            blockRef.current.setAbsolutePosition({
                x: 0,
                y: newCoordinates.y,
            });
        }

        if (newCoordinates.x + BLOCK_SIZES[block.type].width > FIELD_WIDTH) {
            newCoordinates.x = FIELD_WIDTH;
            blockRef.current.setAbsolutePosition({
                x: FIELD_WIDTH - BLOCK_SIZES[block.type].width,
                y: newCoordinates.y,
            });
        }

        if (newCoordinates.y < 0) {
            newCoordinates.y = 0;
            blockRef.current.setAbsolutePosition({
                x: newCoordinates.x,
                y: 0,
            });
        }
        if (newCoordinates.y + BLOCK_SIZES[block.type].height > FIELD_HEIGHT) {
            newCoordinates.y = FIELD_HEIGHT;
            blockRef.current.setAbsolutePosition({
                x: newCoordinates.x,
                y: FIELD_HEIGHT - BLOCK_SIZES[block.type].height,
            });
        }

        setBlockToStorage(newCoordinates);
    }

    const handleBlockClick = () => {
        if (isActive) {
            dispatch(setSelectedBlockId({ blockId: null }));
        } else {
            dispatch(setSelectedBlockId({ blockId: id }));
        }
    };

    return ( // onDragMove={useThrottle(moveBlock, 70)}
        <Group x={x} y={y} draggable ref={blockRef} onDragMove={moveBlock} onClick={handleBlockClick}>
            <Fragment>
                <Rect
                    x={0}
                    y={0}
                    width={width} //50
                    height={height} //50
                    fill={color}
                    shadowBlur={5}

                    strokeWidth={isActive ? 3 : 0} // border width
                    stroke="black"

                    id={id}
                />
                {
                    connections.map(connection => {
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
                    })
                }
                { slot }
            </Fragment>
        </Group>
    );
}