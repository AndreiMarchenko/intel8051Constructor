import Block from "../../Block";

import {INSTRUCTION_REGISTER_BLOCK_WIDTH, INSTRUCTION_REGISTER_BLOCK_HEIGHT, INSTRUCTION_REGISTER_BLOCK_COLOR} from "../../../../globals/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import {Text} from "react-konva";
import StateDisplayRectangle from "./StateDisplayRectangle";
import { changeCurrentCommand } from '../../../../store/slices/commandSlice';
import { setClkPosition } from '../../../../store/slices/clkSlice';
import { changeBlockPayload } from '../../../../store/slices/blockSlice';
import toHex from "../../../../utils/toHex";

export default function InstructionRegister({id, x, y, name}) {
    const dispatch = useDispatch();

    const block = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));
    const clk = useSelector(state => state.clkReducer.clk);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => connection.split('.')[0] === id);
        })
    );

    const connections = getConnections(id);

    useEffect(() => {
        if (clk === 1) {
            const inWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.in`));
            const enWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.en`));

            if (!inWire || !enWire) {
                return;
            }

            if (enWire.payload === 1) {
                dispatch(changeBlockPayload({
                    payload: inWire.payload,
                    blockId: id,
                }));
            }
        }
    }, [clk]);

    useEffect(() => {
        dispatch(setClkPosition(1));
        dispatch(changeCurrentCommand(block.payload));
    }, [block.payload]);


    const slot = (
        <Fragment>
            <StateDisplayRectangle state={toHex(block.payload)} />
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
            width={INSTRUCTION_REGISTER_BLOCK_WIDTH}
            height={INSTRUCTION_REGISTER_BLOCK_HEIGHT}
            connections={connections}
            slot={slot}
            color={INSTRUCTION_REGISTER_BLOCK_COLOR}
        />
    );
}
