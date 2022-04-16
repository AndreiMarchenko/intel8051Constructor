import Block from "../../Block";
import StateDisplayRectangle from "./StateDisplayRectangle";

import {REGISTER_BLOCK_WIDTH, REGISTER_BLOCK_HEIGHT, REGISTER_BLOCK_COLOR} from "../../../../globals/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import { changeBlockPayload } from "../../../../store/slices/blockSlice";
import {Text} from "react-konva";
import toHex from '../../../../utils/toHex';

export default function Register({id, x, y, name}) {
    const dispatch = useDispatch();
    const clk = useSelector(state => state.clkReducer.clk);
    const block = useSelector(state => state.blockReducer.blocks.find(block => block.id === id));
    const connections = getConnections(id);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => {
                return connection.split('.')[0] === id
            });
        })
    );

    const [state, setState] = useState(0);

    useEffect(() => {
        changeBlockPayload({
            blockId: id,
            payload: state,
        });
    }, [state]);

    useEffect(() => {
        setState(block.payload);
    }, [block]);

    useEffect(() => {
        if (clk === 1) {
            const dWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.d`));
            const qWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.q`));
            const enWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.en`));
            const oEnWire = wires.find(wire => wire.connections.find(connection => connection === `${id}.oEn`));

            if (qWire) {
                if (!oEnWire) {
                    dispatch(updateWirePayload({
                        id: qWire.id,
                        payload: state,
                    }));
                } else if (oEnWire.payload === 1) {
                    dispatch(updateWirePayload({
                        id: qWire.id,
                        payload: state,
                    }));
                }
            }

            if (enWire && enWire.payload === 1 && dWire) {
                if (dWire.payload !== 'z') {
                    setState(dWire.payload);
                }
            }
        }
    }, [clk]);

    const slot = (
      <Fragment>
          <StateDisplayRectangle state={toHex(state)} />
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
            width={REGISTER_BLOCK_WIDTH}
            height={REGISTER_BLOCK_HEIGHT}
            connections={connections}
            slot={slot}
            color={REGISTER_BLOCK_COLOR}
        />
    );
}
