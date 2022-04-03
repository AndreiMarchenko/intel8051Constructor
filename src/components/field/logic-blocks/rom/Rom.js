import Block from "../../Block";
import {ROM_BLOCK_COLOR, ROM_BLOCK_WIDTH, ROM_BLOCK_HEIGHT} from "../../../../globals/globals";
import getConnections from "./connections";
import {Fragment, useEffect, useState} from "react";
import { Html } from 'react-konva-utils';
import {Text} from "react-konva";
import { fill } from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import {updateWirePayload} from "../../../../store/slices/wireSlice";

export default function Rom({id, x, y, name}) {
    let [lines, setLines] = useState(fill(Array(100), 'test123'));

    let [currentLineNumber, setCurrentLineNumber] = useState(1);
    let [executingLineNumber, setExecutingLineNumber] = useState(0);

    const dispatch = useDispatch();
    const clk = useSelector(state => state.clkReducer.clk);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => {
                return connection.split('.')[0] === id
            });
        })
    );

    useEffect(() => {
        if (clk === 1) {
            const incWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.inc`));
            const enWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.en`));
            const outWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.out`));

            if (!incWire || !enWire || !outWire) {
                return;
            }

            if (enWire && enWire.payload === 1) {
                dispatch(updateWirePayload({
                    id: outWire.id,
                    payload: lines[executingLineNumber],
                }));
            }
            if (incWire && incWire.payload === 1) {
                setExecutingLineNumber(old => old + 1);
            }
        }

    }, [clk]);

    const handleLineNumberInput = event => {
        setCurrentLineNumber(+event.target.value);
    };

    const slot = (
        <Fragment>
            <Text
                x={70}
                y={10}
                text={name ?? 'Rom'}
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
                text={`${currentLineNumber - 1}: ${lines[currentLineNumber - 1]}` }
                fontSize={22}
                fontFamily='Calibri'
                fill={executingLineNumber ===  currentLineNumber - 1 ? 'red' : 'black'}
            />
            <Text
                x={50}
                y={90}
                text={`${currentLineNumber}: ${lines[currentLineNumber]}`}
                fontSize={22}
                fontFamily='Calibri'
                fill={executingLineNumber ===  currentLineNumber ? 'red' : 'black'}
            />
            <Text
                x={50}
                y={110}
                text={`${currentLineNumber + 1}: ${lines[currentLineNumber + 1]}`}
                fontSize={22}
                fontFamily='Calibri'
                fill={executingLineNumber ===  currentLineNumber + 1 ? 'red' : 'black'}
            />
        </Fragment>
    );

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
            name="Rom"
        />
    );
}