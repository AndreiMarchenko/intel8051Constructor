import Block from "../../Block";
import {RAM_BLOCK_COLOR, RAM_BLOCK_WIDTH, RAM_BLOCK_HEIGHT} from "../../../../globals/globals";
import getConnections from "./connections";
import {Fragment, useEffect, useState} from "react";
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
    const ramSize = 100;
    const ramData = fill(Array(ramSize), '0');

    let [lines, setLines] = useState(ramData);
    let [currentLineNumber, setCurrentLineNumber] = useState(1);

    let [raoAddr, setRaoAddr] = useState(0);

    const dispatch = useDispatch();
    const clk = useSelector(state => state.clkReducer.clk);
    const block = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => {
                return connection.split('.')[0] === id
            });
        })
    );

    useEffect(() => {
        dispatch(changeBlockPayload({
            blockId: id,
            payload: {
                address: raoAddr,
                value: lines[raoAddr],
                activeAddress: raoAddr,
            },
        }));
    }, []);

    useEffect(() => {
        if (block.payload) {
            setLines(lines => {
                lines[block.payload.address] = block.payload.value;
                return lines;
            });
            setRaoAddr(+block.payload.activeAddress);
        }
    }, [block]);

    useEffect(() => {
        if (clk === 1) {
            const addr = wires.find(wire => wire.connections.find(connection => connection === `${id}.addr`));
            const readAddr = wires.find(wire => wire.connections.find(connection => connection === `${id}.readAddr`));
            const en = wires.find(wire => wire.connections.find(connection => connection === `${id}.en`));
            const rNw = wires.find(wire => wire.connections.find(connection => connection === `${id}.r/!w`));
            const data = wires.find(wire => wire.connections.find(connection => connection === `${id}.data`));

            if (!addr || !readAddr || !en || !rNw || !data) {
                return;
            }

            if (readAddr.payload === 1) {
                setRaoAddr(addr.payload);
            }

            if (en.payload === 1) {
                if (rNw.payload === 1) {
                    dispatch(updateWirePayload({
                        id: data.id,
                        payload: lines[raoAddr],
                    }));
                } else if (rNw.payload === 0) {
                    setLines(prev => {
                        let prevCopy = cloneDeep(prev);
                        prevCopy[raoAddr] = data.payload;
                        return prevCopy;
                    });
                }
            }

        }

    }, [clk]);

    const handleLineNumberInput = event => {
        if (isNaN(fromHex(event.target.value))) {
            setCurrentLineNumber('0x01');
        } else {
            setCurrentLineNumber(fromHex(event.target.value));
        }
    };

    const slot = (
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
                text={`${toHex(currentLineNumber - 1)}: ${toHex(lines[currentLineNumber - 1])}` }
                fontSize={22}
                fontFamily='Calibri'
                fill={raoAddr ===  currentLineNumber - 1 ? 'red' : 'black'}
            />
            <Text
                x={50}
                y={90}
                text={`${toHex(currentLineNumber)}: ${toHex(lines[currentLineNumber])}`}
                fontSize={22}
                fontFamily='Calibri'
                fill={raoAddr ===  currentLineNumber ? 'red' : 'black'}
            />
            <Text
                x={50}
                y={110}
                text={`${toHex(currentLineNumber + 1)}: ${toHex(lines[currentLineNumber + 1])}`}
                fontSize={22}
                fontFamily='Calibri'
                fill={raoAddr ===  currentLineNumber + 1 ? 'red' : 'black'}
            />
        </Fragment>
    );

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