import {createSlice} from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

/*
    wire: {id, connections, path, payload, prevPayload}
                   ||
                   \/
               connection: {id, name, blockId, connectedTo(wire), input(true, false), position}
 */

export const wireSlice = createSlice({
    name: 'wires',
    initialState: {
        wires: [],
        activeConnection: null,
        activePath: null
    },
    reducers: {
        startWire: (state, action) => {
            const connection =  action.payload.connection;
            const block = action.payload.block;

            state.activeConnection = connection;
            state.activePath = [connection.position.x + block.position.x, connection.position.y + block.position.y];
        },
        resetWire: (state) => {
            state.activeConnection = null;
            state.activePath = null;
        },
        setWireToStorage: (state, action) => {
            state.activeConnection = null;
            const wirePath = cloneDeep(state.activePath);
            state.activePath = null;
            const {
                firstConnection,
                secondConnection,
                secondBlock
            } = action.payload

            state.wires.push({
                id: state.wires.length,
                connections: [firstConnection, secondConnection],
                payload: 'z',
                path: [
                    ...wirePath,
                    secondBlock.position.x + secondConnection.position.x,
                    secondBlock.position.y + secondConnection.position.y
                ],
            });
        },
        updateWirePayload: (state, action) => {
            let wireIndex = state.wires.findIndex(wire => wire.id === action.payload.id);
            state.wires[wireIndex].payload = action.payload.payload;
        },
        updateActiveWirePath: (state, action) => {
            state.activePath = [...state.activePath, action.payload.x, action.payload.y];
        },
        setWiresPrevValue: (state, action) => {
            state.wires.forEach(wire => {
                wire.prevPayload = wire.payload;
                return wire;
            })
        },
    }
})

// Action creators are generated for each case reducer function
export const {startWire, resetWire, setWireToStorage, updateWirePayload, updateActiveWirePath, setWiresPrevValue} = wireSlice.actions

export default wireSlice.reducer