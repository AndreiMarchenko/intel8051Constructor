import Block from "../../Block";

import {INSTRUCTION_REGISTER_BLOCK_WIDTH, INSTRUCTION_REGISTER_BLOCK_HEIGHT, INSTRUCTION_REGISTER_BLOCK_COLOR} from "../../../../globals/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect, useRef, useState} from "react";
import {Text} from "react-konva";
import StateDisplayRectangle from "./StateDisplayRectangle";
import { changeCurrentCommand } from '../../../../store/slices/commandSlice';
import { setClkPosition } from '../../../../store/slices/clkSlice';
import {changeBlockPayload, resetSignalTouch} from '../../../../store/slices/blockSlice';
import toHex from "../../../../utils/toHex";
import {resetUpdatedOnCurrentEdgeCount} from "../../../../store/slices/wireSlice";

export default function InstructionRegister({id, x, y, name}) {
    const dispatch = useDispatch();

    let [shouldChangeCommandOnNextStep, setShouldChangeCommandOnNextStep] = useState(false);
    let [isInitialRender, setIsInitialRender] = useState(true);

    const block = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));
    const clk = useSelector(state => state.clkReducer.clk);
    const clkPosition = useSelector(state => state.clkReducer.clkPosition);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => connection.split('.')[0] === id);
        })
    );
    const wiresRef = useRef([]);

    const connections = getConnections(id);

    useEffect(() => {
        wiresRef.current = wires;
    }, [wires]);

    useEffect(() => {
        if (clk === 1) {
            setTimeout(() => {
                const inWire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.in`));
                const enWire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.en`));

                if (!inWire || !enWire) {
                    return;
                }

                if (shouldChangeCommandOnNextStep) {
                    dispatch(changeCurrentCommand(block.payload));
                    dispatch(resetSignalTouch());
                    dispatch(resetUpdatedOnCurrentEdgeCount());
                    dispatch(setClkPosition((clkPosition - 1) % 4 + 2)); // (clkPosition - 1) % 4 + 1
                    setShouldChangeCommandOnNextStep(false);
                }

                const isEnWireStable = enWire.payload === 1 && enWire.prevPayload === 1;

                if (isEnWireStable) {
                    setTimeout(() => {
                        dispatch(changeBlockPayload({
                            payload: inWire.payload,
                            blockId: id,
                        }));
                    }, 0);
                }
            }, 0);
        }
    }, [clk]);

    useEffect(() => {
        if (!isInitialRender) {
            setShouldChangeCommandOnNextStep(true);
        } else {
            dispatch(changeCurrentCommand(block.payload));
        }
        setIsInitialRender(false);
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
