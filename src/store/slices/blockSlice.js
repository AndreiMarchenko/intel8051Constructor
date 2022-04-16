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
        globalSignals: [],
        commands: [],
        commandsAmount: 0,
    },
    reducers: {
        changeBlockPosition: (state, action) => {
            const block = state.blocks.find(block => block.id === action.payload.blockId);
            block.position = action.payload.position;
        },
        changeBlockPayload: (state, action) => {
            const block = state.blocks.find(block => block.id === action.payload.blockId);
            block.payload = action.payload.payload;
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
        addGlobalSignal: (state, action) => {
            const existingSignal = state.globalSignals.find(signal => signal.blockId === action.payload.blockId);

            if (!existingSignal) {
                const commands = state.commands.map(command => {
                    return {
                        commandCode: command.commandCode,
                        ones: [],
                    };
                });

                state.globalSignals.push({
                    name: action.payload.name,
                    blockId: action.payload.blockId,
                    value: 'z',
                    commands: commands,
                });
            } else {
                existingSignal.name = action.payload.name;
            }
        },
        setGlobalSignalOnes: (state, action) => {
            const signal = state.globalSignals.find(signal => signal.blockId === action.payload.blockId);
            const command = signal.commands.find(command => command.commandCode === action.payload.commandCode);
            command.ones = action.payload.ones;
        },
        updateGlobalSignal: (state, action) => {
            const signal = state.globalSignals.find(signal => signal.blockId === action.payload.blockId);
            signal.value = action.payload.value;
        },
        changeCommandCode: (state, action) => {
            state.commands[action.payload.commandIndex].commandCode = action.payload.commandCode;
            state.globalSignals.forEach(signal => {
                signal.commands[action.payload.commandIndex].commandCode = action.payload.commandCode;
            });
        },
        setCommands: (state, action) => {
            state.commands = action.payload;
            state.commands.forEach(command => {
               state.globalSignals.forEach(signal => {
                   if (!signal.commands.find(signalCommand => signalCommand.commandCode === command.commandCode)) {
                       signal.commands.push({
                           commandCode: command.commandCode,
                           ones: [],
                       });
                   }
                   signal.commands = signal.commands.filter(signalCommand => {
                       return state.commands.map(command => command.commandCode).includes(signalCommand.commandCode);
                   });
               });
            });
        },
        setCommandsAmount: (state, action) => {
            state.commandsAmount = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    changeBlockPosition,
    changeBlockPayload,
    setBlockToStorage,
    changeBlockConnection,
    deleteBlock,
    setSelectedBlockId,
    changeBlockName,
    setGlobalSignalOnes,
    addGlobalSignal,
    updateGlobalSignal,
    setCommands,
    setCommandsAmount,
    changeCommandCode,
} = blockSlice.actions

export default blockSlice.reducer