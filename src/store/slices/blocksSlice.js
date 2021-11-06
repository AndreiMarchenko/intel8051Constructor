import { createSlice } from '@reduxjs/toolkit'

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: {
        positions: [],
        lastMovedBlockId: null,
    },
    reducers: {
        addBlockPosition: (state, action) => {
            state.lastMovedBlockId = action.payload.id;

            const blockPosition = state.positions.find(position => position.id === action.payload.id);
            if (blockPosition) {
                blockPosition.x = action.payload.x;
                blockPosition.y = action.payload.y;
                return;
            }

            state.positions.push(action.payload);
        },
    }
})

// Action creators are generated for each case reducer function
export const { addBlockPosition } = blocksSlice.actions

export default blocksSlice.reducer