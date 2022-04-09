import {useRef, Fragment, useState, useEffect} from "react";
import { Rect, Group } from 'react-konva';
import { useDispatch, useSelector } from "react-redux";
import { changeBlockPosition, setSelectedBlockId } from "../../store/slices/blockSlice";

import BlockConnection from "./BlockConnection";
import useThrottle from "../../hooks/useThrottle";

export default function Block({id, x, y, width, height, connections, slot, color}) {
    const dispatch = useDispatch();
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const selectedBlockId = useSelector(state => state.blockReducer.selectedBlockId);

    let [isActive, setIsActive] = useState(false);

    const blockRef = useRef();

    useEffect(() => {
        if (selectedBlockId === id) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [selectedBlockId]);

    const moveBlock = () => {
        if (activeConnection) {
            blockRef.current.stopDrag();
            return;
        }

        const newCoordinates = blockRef.current.children[0].getAbsolutePosition();
        dispatch(changeBlockPosition({blockId:id, position: newCoordinates}));
    }

    const handleBlockClick = () => {
        if (isActive) {
            dispatch(setSelectedBlockId({ blockId: null }));
        } else {
            dispatch(setSelectedBlockId({ blockId: id }));
        }
    };

    return (
        <Group x={x} y={y} draggable ref={blockRef} onDragMove={useThrottle(moveBlock, 50)} onClick={handleBlockClick}>
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