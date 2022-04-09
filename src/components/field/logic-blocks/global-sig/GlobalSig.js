import Block from "../../Block";

import {GLOBAL_SIG_BLOCK_SIZE, GLOBAL_SIG_BLOCK_COLOR} from "../../../../globals/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import {Text} from "react-konva";

export default function GlobalSig({id, x, y, name}) {
    const dispatch = useDispatch();

    const clk = useSelector(state => state.clkReducer.clk);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => connection.split('.')[0] === id);
        })
    );
    const globalSignals = useSelector(state => state.blockReducer.globalSignals);

    let [signal, setSignal] = useState(null);

    const connections = getConnections(id);

    useEffect(() => {
        setSignal(globalSignals.find(signal => signal.name === name));
    }, [name, globalSignals]);

    useEffect(() => {
        // if (clk === 1) {
            const outWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.out`));

            if (!outWire || !signal) {
                return;
            }

            dispatch(updateWirePayload({
                id: outWire.id,
                payload: signal.value,
            }));
        // }
    }, [signal]);


    const slot = (
        <Text
            x={0}
            y={0}
            text={name ?? 'GlobalSig'}
            fontSize={22}
            fontFamily='Calibri'
            fill='black'
        />
    );

    return (
        <Block
            id={id}
            x={x}
            y={y}
            width={GLOBAL_SIG_BLOCK_SIZE}
            height={GLOBAL_SIG_BLOCK_SIZE}
            connections={connections}
            slot={slot}
            color={GLOBAL_SIG_BLOCK_COLOR}
            name="Inc"
        />
    );
}
