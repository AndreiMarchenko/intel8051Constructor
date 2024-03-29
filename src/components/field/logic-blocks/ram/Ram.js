import Block from "../../Block";
import {RAM_BLOCK_COLOR, RAM_BLOCK_WIDTH, RAM_BLOCK_HEIGHT} from "../../../../globals/globals";
import getConnections from "./connections";
import {Fragment, useEffect, useRef} from "react";
import { Html } from 'react-konva-utils';
import {Text} from "react-konva";
import { fill } from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import { cloneDeep } from 'lodash';
import {changeBlockPayload} from "../../../../store/slices/blockSlice";
import toHex from "../../../../utils/toHex";
import fromHex from "../../../../utils/fromHex";

export default function Ram({id, x, y, name}) {
    const initialRamData = fill(Array(100), '0');

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
    let ramData = block.payload.data;

    useEffect(() => {
        wiresRef.current = wires;
    }, [wires]);

    useEffect(() => {
        if (!block.payload) {
            dispatch(changeBlockPayload({
                blockId: id,
                payload: {
                    executingAddress: 0,
                    activeAddress: 1,
                    data: initialRamData,
                },
            }));
        }
    }, []);

    useEffect(() => {
        if (clk === 1) {
            setTimeout(() => {
                const addr = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.addr`));
                const readAddr = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.readAddr`));
                const en = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.en`));
                const rNw = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.r/!w`));
                const data = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.data`));

                if (!addr || !readAddr || !en || !rNw || !data) {
                    return;
                }

                const isReadAddrStable = readAddr.payload === 1 && readAddr.prevPayload === 1;

                if (isReadAddrStable) {
                    dispatch(changeBlockPayload({
                        blockId: id,
                        payload: {
                            executingAddress: addr.payload,
                        },
                    }));
                }

                const isEnStable = en.payload === 1 && en.prevPayload === 1;
                const isRnwStable = (rNw.payload === 1 && rNw.prevPayload === 1) || (rNw.payload === 0 && rNw.prevPayload === 0);

                if (isEnStable) {
                    if (isRnwStable && rNw.payload === 1) {
                        dispatch(updateWirePayload({
                            id: data.id,
                            payload: ramData[executingAddress],
                        }));
                    } else if (isRnwStable && rNw.payload === 0) {
                        let dataCopy = cloneDeep(ramData);
                        dataCopy[executingAddress] = data.payload;

                        dispatch(changeBlockPayload({
                            blockId: id,
                            payload: {
                                data: dataCopy,
                            },
                        }));
                    }
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
                    <input type={'text'} onInput={handleLineNumberInput}/>
                </Html>
                <Text
                    x={50}
                    y={70}
                    text={`${toHex(activeAddress - 1)}: ${toHex(ramData[activeAddress - 1])}` }
                    fontSize={22}
                    fontFamily='Calibri'
                    fill={executingAddress ===  activeAddress - 1 ? 'red' : 'black'}
                />
                <Text
                    x={50}
                    y={90}
                    text={`${toHex(activeAddress)}: ${toHex(ramData[activeAddress])}`}
                    fontSize={22}
                    fontFamily='Calibri'
                    fill={executingAddress ===  activeAddress ? 'red' : 'black'}
                />
                <Text
                    x={50}
                    y={110}
                    text={`${toHex(activeAddress + 1)}: ${toHex(ramData[activeAddress + 1])}`}
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
            width={RAM_BLOCK_WIDTH}
            height={RAM_BLOCK_HEIGHT}
            connections={getConnections(id)}
            slot={slot}
            color={RAM_BLOCK_COLOR}
        />
    );
}