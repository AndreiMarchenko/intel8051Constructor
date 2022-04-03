import Block from "../../Block";

import {INSTRUCTION_REGISTER_BLOCK_SIZE, INSTRUCTION_REGISTER_BLOCK_COLOR} from "../../../../globals/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import {Text} from "react-konva";
import StateDisplayRectangle from "./StateDisplayRectangle";

export default function InstructionRegister({id, x, y, name}) {
    const dispatch = useDispatch();

    const clk = useSelector(state => state.clkReducer.clk);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => connection.split('.')[0] === id);
        })
    );
    const [state, setState] = useState(2);

    const connections = getConnections(id);

    useEffect(() => {
        if (clk === 1) {

        }
    }, [clk]);


    const slot = (
        <Fragment>
            <StateDisplayRectangle state={state} />
            <Text
                x={0}
                y={0}
                text={name ?? 'InstructionRegister'}
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
            width={INSTRUCTION_REGISTER_BLOCK_SIZE}
            height={INSTRUCTION_REGISTER_BLOCK_SIZE}
            connections={connections}
            slot={slot}
            color={INSTRUCTION_REGISTER_BLOCK_COLOR}
            name="InstructionRegister"
        />
    );
}
