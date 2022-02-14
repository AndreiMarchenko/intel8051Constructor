import Block from "../../Block";

import {LOGIC_ONE_BLOCK_SIZE, LOGIC_ONE_BLOCK_COLOR} from "../../../../globals/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect} from "react";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import {Text} from "react-konva";

export default function LogicOne({id, x, y}) {
    const dispatch = useDispatch();
    const clk = useSelector(state => state.clkReducer.clk);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => connection.blockId === id);
        })
    );

    const connections = getConnections(id);


    useEffect(() => {
        if (clk === 1) {
            const qWire = wires.find(wire => wire.connections.find(connection => connection.id === `${id}.q`));
            if (qWire) {
                dispatch(updateWirePayload({
                    id: qWire.id,
                    payload: 1,
                }));
            }
        }
    }, [clk]);

    const slot = (
        <Fragment>
            <Text
                x={0}
                y={0}
                text={'1'}
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
            width={LOGIC_ONE_BLOCK_SIZE}
            height={LOGIC_ONE_BLOCK_SIZE}
            connections={connections}
            slot={slot}
            color={LOGIC_ONE_BLOCK_COLOR}
            name="1"
        />
    );
}
