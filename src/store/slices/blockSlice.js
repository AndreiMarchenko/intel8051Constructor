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
            changedConnection.connectedToType = action.payload.connectedToType;
        },
        setBlockToStorage: (state, action) => {
            state.blocks.push(action.payload);
        },
        deleteBlock: (state, action) => {
            let blockIndex = state.blocks.findIndex(block => block.id === action.payload.blockId);
            state.blocks.splice(blockIndex, 1);
        },
        resetConnection: (state, action) => {
            let block = state.blocks.find(block => block.id === action.payload.blockId);
            let connection = block.connections.find(connection => {
                return connection.id === action.payload.connection
            });
            connection.connectedTo = null;
        },
        resetLastMovedBlock: (state, action) => {
            state.lastMovedBlockId = null;
        },
        resetBlockConnectionsAttachedToWire: (state, action) => {
            state.blocks.forEach(block => {
                block.connections.forEach(connection => {
                    if (connection.connectedTo === action.payload.wireId) {
                        connection.connectedTo = null;
                    }
                });
            });
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    changeBlockPosition,
    setBlockToStorage,
    changeBlockConnection,
    deleteBlock,
    resetConnection,
    resetLastMovedBlock,
    updateBlockConnections,
    resetBlockConnectionsAttachedToWire,
} = blockSlice.actions

export default blockSlice.reducer