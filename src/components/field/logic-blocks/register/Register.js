import Block from "../../Block";
import StateDisplayRectangle from "./StateDisplayRectangle";

import {REGISTER_BLOCK_SIZE, REGISTER_BLOCK_COLOR} from "../../../../utils/globals";
import getConnections from './connections';
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import {updateWirePayload} from "../../../../store/slices/wireSlice";
import {Text} from "react-konva";

export default function Register({id, x, y}) {
    const dispatch = useDispatch();

    const clk = useSelector(state => state.clkReducer.clk);
    const wires = useSelector(state => state.wireReducer.wires.filter(wire => {
            return wire.connections.find(connection => connection.blockId === id);
        })
    );

    const connections = getConnections(id);

    const [state, setState] = useState(2);

    useEffect(() => {
        if (clk === 1) {
            const dWire = wires.find(wire => wire.connections.find(connection => connection.id === `${id}.d`));
            const qWire = wires.find(wire => wire.connections.find(connection => connection.id === `${id}.q`));
            if (qWire) {
                dispatch(updateWirePayload({
                    id: qWire.id,
                    payload: state,
                }));
            }
            if (dWire) {
                if (dWire.payload !== 'z') {
                    setState(dWire.payload);
                }
            }
        }
    }, [clk]);

    const slot = (
      <Fragment>
          <StateDisplayRectangle state={state} />
          <Text
              x={0}
              y={0}
              text={'Register'}
              fontSize='22'
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
            width={REGISTER_BLOCK_SIZE}
            height={REGISTER_BLOCK_SIZE}
            connections={connections}
            slot={slot}
            color={REGISTER_BLOCK_COLOR}
        />
    );
}
