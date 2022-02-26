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
        changeBlockPosition: (state, action) => {
            const block = state.blocks.find(block => block.id === action.payload.blockId);
            block.position = action.payload.position;
            state.lastMovedBlockId = block.id;
        },
        changeBlockConnection: (state, action) => {
            let blockIndex = state.blocks.findIndex(block => block.id === action.payload.blockId);
            const changedConnection = state.blocks[blockIndex].connections.find(connection => {
                return connection.id === action.payload.connectionId;
            });
            changedConnection.connectedTo = action.payload.connectedTo;
        },
        setBlockToStorage: (state, action) => {
            console.log(action.payload);
            state.blocks.push(action.payload);
        },
        deleteBlock: (state, action) => {
            let blockIndex = state.blocks.findIndex(block => block.id === action.payload.blockId);
            state.blocks.splice(blockIndex, 1);
        },
        resetConnection: (state, action) => {
            let block = state.blocks.find(block => block.id === action.payload.blockId);
            let connection = block.connections.find(connection => connection.name === action.payload.name);
            connection.connectedTo = null;
        },
        resetLastMovedBlock: (state, action) => {
            state.lastMovedBlockId = null;
        }
    }
})

// Action creators are generated for each case reducer function
export const { changeBlockPosition, setBlockToStorage, changeBlockConnection, deleteBlock, resetConnection, resetLastMovedBlock } = blockSlice.actions

export default blockSlice.reducer