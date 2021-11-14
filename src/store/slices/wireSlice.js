import { createSlice } from '@reduxjs/toolkit'

/*
    wire: {id, connections}
                   ||
                   \/
               connection: {id, name, blockId, connectedTo(wire), type(in, out), position}
 */

export const wireSlice = createSlice({
    name: 'wires',
    initialState: {
        wires: [],
        activeConnection: null,
    },
    reducers: {
        startWire: (state, action) => {
            state.activeConnection = action.payload;
        },
        resetWire: (state) => {
            state.activeConnection = null;
        },
        setWireToStorage: (state, action) => {
            state.wires.push({
                id: state.wires.length,
                connections: action.payload,
            });
        },
    }
})

// Action creators are generated for each case reducer function
export const { startWire, resetWire, setWireToStorage } = wireSlice.actions

export default wireSlice.reducer