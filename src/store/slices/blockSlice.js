import { createSlice } from '@reduxjs/toolkit';

/*
    block: {id, name, connections, position}
                           ||
                           \/
                       connection: {id, name, blockId, connectedTo(wire), type(in, out), position}
 */

export const blockSlice = createSlice({
    name: 'blocks',
    initialState: {
        blocks: [],
        lastMovedBlockId: null,
    },
    reducers: {
        changeBlock: (state, action) => {
            state.lastMovedBlockId = action.payload.id;

            let blockIndex = state.blocks.findIndex(block => block.id === action.payload.id);
            state.blocks.splice(blockIndex, 1, action.payload);
        },
        changeBlockConnection: (state, action) => {
            let blockIndex = state.blocks.findIndex(block => block.id === action.payload.blockId);
            const changedConnection = state.blocks[blockIndex].connections.find(connection => {
                return connection.id === action.payload.connectionId;
            });
            changedConnection.connectedTo = action.payload.connectedTo;
        },
        setBlockToStorage: (state, action) => {
            state.blocks.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const { changeBlock, setBlockToStorage, changeBlockConnection } = blockSlice.actions

export default blockSlice.reducer