import Block from "../../Block";
import {ROM_BLOCK_COLOR, ROM_BLOCK_WIDTH, ROM_BLOCK_HEIGHT} from "../../../../globals/globals";
import getConnections from "./connections";
import {Fragment, useEffect, useRef} from "react";
import { Html } from 'react-konva-utils';
import {Text} from "react-konva";
import { fill } from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import {changeBlockPayload} from "../../../../store/slices/blockSlice";
import toHex from "../../../../utils/toHex";
import fromHex from "../../../../utils/fromHex";

export default function Rom({id, x, y, name}) {
    const initialRomData = fill(Array(100), '0');

    const dispatch = useDispatch();
    const clk = useSelector(state => state.clkReducer.clk);
    const block = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => {
                return connection.split('.')[0] === id
            });
        })
    );
    const wiresRef = useRef([]);

    let executingAddress = block.payload.executingAddress;
    let activeAddress = block.payload.activeAddress;
    let romData = block.payload.data;

    useEffect(() => {
        if (!block.payload) {
            dispatch(changeBlockPayload({
                blockId: id,
                payload: {
                    executingAddress: 0,
                    activeAddress: 1,
                    data: initialRomData,
                },
            }));
        }
    }, []);

    useEffect(() => {
        wiresRef.current = wires;
    }, [wires]);

    useEffect(() => {
        if (clk === 1) {
            setTimeout(() => {
                const incWire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.inc`));
                const enWire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.en`));
                const outWire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.out`));

                if (!incWire || !enWire || !outWire) {
                    return;
                }


                const isEnWireStable = enWire.payload === 1 && enWire.prevPayload === 1;

                if (enWire && isEnWireStable) {
                    dispatch(updateWirePayload({
                        id: outWire.id,
                        payload: block.payload.data[executingAddress],
                    }));
                }

                const isIncWireStable = incWire.payload === 1 && incWire.prevPayload === 1;

                if (incWire && isIncWireStable) {
                    dispatch(changeBlockPayload({
                        blockId: id,
                        payload: {
                            executingAddress: executingAddress + 1,
                        },
                    }));
                }
            }, 0);
        }

    }, [clk]);

    const handleLineNumberInput = event => {
        if (isNaN(fromHex(event.target.value))) {
            dispatch(changeBlockPayload({
                blockId: id,
                payload: {
                    activeAddress: 1,
                },
            }));
        } else {
            dispatch(changeBlockPayload({
                blockId: id,
                payload: {
                    activeAddress: fromHex(event.target.value),
                },
            }));
        }
    };

    let slot;

    if (typeof block.payload === 'object') {
        slot = (
            <Fragment>
                <Text
                    x={70}
                    y={10}
                    text={name}
                    fontSize={22}
                    fontFamily='Calibri'
                    fill='black'
                />
                <Html divProps={{
                    style: {
                        marginTop: '35px',
                        marginLeft: '20px',
                    },
                }}>
                    <input type={'text'} onInput={handleLineNumberInput} />
                </Html>
                <Text
                    x={50}
                    y={70}
                    text={`${toHex(activeAddress - 1)}: ${toHex(romData[activeAddress - 1])}` }
                    fontSize={22}
                    fontFamily='Calibri'
                    fill={executingAddress ===  activeAddress - 1 ? 'red' : 'black'}
                />
                <Text
                    x={50}
                    y={90}
                    text={`${toHex(activeAddress)}: ${toHex(romData[activeAddress])}`}
                    fontSize={22}
                    fontFamily='Calibri'
                    fill={executingAddress ===  activeAddress ? 'red' : 'black'}
                />
                <Text
                    x={50}
                    y={110}
                    text={`${toHex(activeAddress + 1)}: ${toHex(romData[activeAddress + 1])}`}
                    fontSize={22}
                    fontFamily='Calibri'
                    fill={executingAddress ===  activeAddress + 1 ? 'red' : 'black'}
                />
            </Fragment>
        );
    }

    return (
        <Block
            id={id}
            x={x}
            y={y}
            width={ROM_BLOCK_WIDTH}
            height={ROM_BLOCK_HEIGHT}
            connections={getConnections(id)}
            slot={slot}
            color={ROM_BLOCK_COLOR}
        />
    );
}