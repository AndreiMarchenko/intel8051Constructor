import Block from "../../Block";

import {SUM_BLOCK_WIDTH, SUM_BLOCK_HEIGHT, SUM_BLOCK_COLOR} from "../../../../globals/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import {Text} from "react-konva";

export default function Sum({id, x, y, name}) {
    const dispatch = useDispatch();

    const clk = useSelector(state => state.clkReducer.clk);
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
            const in1Wire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.in1`));
            const in2Wire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.in2`));
            const oEnWire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.oEn`));
            const outWire = wiresRef.current.find(wire => wire.connections.find(connection => connection === `${id}.out`));

            if (!in1Wire || !in2Wire || !outWire || !oEnWire) {
                return;
            }

            if (in1Wire.payload === 'z' || in2Wire.payload === 'z') {
                return;
            }

            const isOenStable = oEnWire.payload === 1 && oEnWire.prevPayload === 1;

            if (isOenStable) {
                dispatch(updateWirePayload({
                    id: outWire.id,
                    payload: +in1Wire.payload + +in2Wire.payload,
                }));
            }

        }
    }, [clk]);


    const slot = (
        <Text
            x={0}
            y={0}
            text={name}
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
            width={SUM_BLOCK_WIDTH}
            height={SUM_BLOCK_HEIGHT}
            connections={connections}
            slot={slot}
            color={SUM_BLOCK_COLOR}
        />
    );
}
