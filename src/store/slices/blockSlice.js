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
        selectedBlockId: null,
        globalSignals: [
            {
                name: 'romInc',
                value: 0,
            }
        ],
    },
    reducers: {
        changeBlockPosition: (state, action) => {
            const block = state.blocks.find(block => block.id === action.payload.blockId);
            block.position = action.payload.position;
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
        resetBlockConnectionsAttachedToWire: (state, action) => {
            state.blocks.forEach(block => {
                block.connections.forEach(connection => {
                    if (connection.connectedTo === action.payload.wireId) {
                        connection.connectedTo = null;
                    }
                });
            });
        },
        setSelectedBlockId: (state, action) => {
            state.selectedBlockId = action.payload.blockId;
        },
        changeBlockName: (state, action) => {
            const block = state.blocks.find(block => block.id === action.payload.blockId);
            block.name = action.payload.name;
        },
        updateGlobalSignal: (state, action) => {
            const signal = state.globalSignals.find(signal => signal.name === action.payload.signalName);
            signal.value = action.payload.value;
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    changeBlockPosition,
    setBlockToStorage,
    changeBlockConnection,
    deleteBlock,
    setSelectedBlockId,
    changeBlockName,
    updateGlobalSignal
} = blockSlice.actions

export default blockSlice.reducer