import { createSlice } from '@reduxjs/toolkit'

export const wiresSlice = createSlice({
    name: 'wires',
    initialState: {
        startPosition: null,
        endPosition: null,
        wiresPositions: [],
        lastChangedWireId: null,
    },
    reducers: {
        startWire: (state, action) => {
            state.startPosition = action.payload;
        },
        endWire: (state, action) => {
            state.endPosition = action.payload;
        },
        resetWire: (state) => {
            state.startPosition = null;
            state.endPosition = null;
        },
        addWirePosition: (state, action) => {
            state.lastChangedWireId = action.payload.id;

            const wireIndex = state.wiresPositions.findIndex(position => position.id === action.payload.id);
            if (wireIndex !== -1) {
                state.wiresPositions[wireIndex] = {
                    id: state.wiresPositions[wireIndex].id,
                    sequence: action.payload.sequence,
                    fromConnection: state.wiresPositions[wireIndex].fromConnection,
                    toConnection: state.wiresPositions[wireIndex].toConnection,
                }
            } else {
                state.wiresPositions.push(action.payload);
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { startWire, endWire, resetWire, addWirePosition } = wiresSlice.actions

export default wiresSlice.reducer