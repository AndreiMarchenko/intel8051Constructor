import { createSlice } from '@reduxjs/toolkit'

export const connectionsSlice = createSlice({
    name: 'connections',
    initialState: {
        positions: [],
    },
    reducers: {
        addConnectionPosition: (state, action) => {
            const connectionPosition = state.positions.find(position => position.id === action.payload.id);
            if (connectionPosition) {
                connectionPosition.x = action.payload.x;
                connectionPosition.y = action.payload.y;
                return;
            }

            state.positions.push(action.payload);
        },
        addBlockConnectionsPositions: (state, action) => {
            state.positions = state.positions.map(position => {
                if (position.id.includes(action.payload.blockId)) {
                    return {
                        x: position.x + action.payload.diffX,
                        y: position.y + action.payload.diffY,
                        id: position.id
                    };
                }
                return position;
            })
        },
    }
})

// Action creators are generated for each case reducer function
export const { addConnectionPosition, addBlockConnectionsPositions } = connectionsSlice.actions

export default connectionsSlice.reducer