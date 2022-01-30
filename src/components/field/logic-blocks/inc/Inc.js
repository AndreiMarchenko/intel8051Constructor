import Block from "../../Block";

import {INC_BLOCK_SIZE, INC_BLOCK_COLOR} from "../../../../utils/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import {Text} from "react-konva";

export default function Inc({id, x, y}) {
    const dispatch = useDispatch();

    const clk = useSelector(state => state.clkReducer.clk);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => connection.blockId === id);
        })
    );

    const connections = getConnections(id);

    useEffect(() => {
        if (clk === 1) {
            const inWire = wires.find(wire => wire.connections.find(connection => connection.id === `${id}.in`));
            const outWire = wires.find(wire => wire.connections.find(connection => connection.id === `${id}.out`));

            if (!outWire || !inWire) {
                return;
            }

            if (inWire.payload === 'z') {
                return
            }

            dispatch(updateWirePayload({
                id: outWire.id,
                payload: inWire.payload + 1,
            }));
        }
    }, [clk]);


    const slot = (
        <Text
            x={0}
            y={0}
            text={'Inc'}
            fontSize='22'
            fontFamily='Calibri'
            fill='black'
        />
    );

    return (
        <Block
            id={id}
            x={x}
            y={y}
            width={INC_BLOCK_SIZE}
            height={INC_BLOCK_SIZE}
            connections={connections}
            slot={slot}
            color={INC_BLOCK_COLOR}
        />
    );
}
