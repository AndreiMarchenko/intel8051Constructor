import Block from "../../Block";

import {LOGIC_ZERO_BLOCK_WIDTH, LOGIC_ZERO_BLOCK_HEIGHT, LOGIC_ZERO_BLOCK_COLOR} from "../../../../globals/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect} from "react";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import {Text} from "react-konva";

export default function LogicZero({id, x, y, name}) {
    const dispatch = useDispatch();
    const clk = useSelector(state => state.clkReducer.clk);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => connection.split('.')[0] === id);
        })
    );

    const connections = getConnections(id);


    useEffect(() => {
        if (clk === 1) {
            const qWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.q`));
            if (qWire) {
                dispatch(updateWirePayload({
                    id: qWire.id,
                    payload: 0,
                }));
            }
        }
    }, [clk]);

    const slot = (
        <Fragment>
            <Text
                x={0}
                y={0}
                text={name}
                fontSize={22}
                fontFamily='Calibri'
                fill='black'
            />
        </Fragment>
    );

    return (
        <Block
            id={id}
            x={x}
            y={y}
            width={LOGIC_ZERO_BLOCK_WIDTH}
            height={LOGIC_ZERO_BLOCK_HEIGHT}
            connections={connections}
            slot={slot}
            color={LOGIC_ZERO_BLOCK_COLOR}
        />
    );
}
