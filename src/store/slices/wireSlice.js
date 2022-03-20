import {createSlice} from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

/*
    wire: {id, connections, path, payload, prevPayload}
                   ||
                   \/
               connection: {id, name, blockId|wireId, connectedTo(wire), input(true, false), position}
 */

export const wireSlice = createSlice({
    name: 'wires',
    initialState: {
        wires: [],
        wireConnections: [],
        activeConnection: null,
        activePath: null,
        activePathNodesCount: 1,
    },
    reducers: {
        setActivePathNodesCount: (state, action) => {
            state.activePathNodesCount = action.payload;
        },
        startWire: (state, action) => {
            const isWireConnection = typeof action.payload.connection === 'object';
            if (!isWireConnection) {
                const connection = action.payload.connection;
                const block = action.payload.block;
                const connectionObject = block.connections.find(obj => obj.id === connection);

                state.activeConnection = connection;
                state.activePath = [connectionObject.position.x + block.position.x, connectionObject.position.y + block.position.y];
            } else {
                state.activeConnection = action.payload.connection.id;
                state.activePath = [action.payload.connection.position.x, action.payload.connection.position.y];
            }
        },
        resetWire: (state) => {
            state.activeConnection = null;
            state.activePath = null;
        },
        setWireToStorage: (state, action) => {
            state.activeConnection = null;
            const wirePath = cloneDeep(state.activePath);
            state.activePath = null;
            state.activePathNodesCount = 1;
            const {
                firstConnection,
                secondConnection,
                secondBlock
            } = action.payload

            const secondBlockConnectionObj = secondBlock.connections.find(connection => connection.id === secondConnection);

            state.wires.push({
                id: state.wires.length.toString(),
                connections: [firstConnection, secondConnection],
                payload: 'z',
                path: [
                    ...wirePath.slice(0, -2),
                    secondBlock.position.x + secondBlockConnectionObj.position.x,
                    secondBlock.position.y + secondBlockConnectionObj.position.y
                ],
            });
        },
        updateWirePayload: (state, action) => {
            const wireIndex = state.wires.findIndex(wire => wire.id === action.payload.id);
            const updateWire =  state.wires[wireIndex];
            updateWire.payload = action.payload.payload;

            // const wiresFromWire = state.wires.filter(wire => {
            //     return wire.connections[0].includes('wire') &&
            //         wire.connections[0].split('.')[1] === updateWire.id;
            // });
            // wiresFromWire.forEach(wire => {
            //     wire.payload = action.payload.payload;
            // });
        },
        updateActiveWirePath: (state, action) => {
            state.activePath = state.activePath ? state.activePath.slice(0, state.activePathNodesCount * 2) : [];
            state.activePath = [...state.activePath, action.payload.x, action.payload.y];
        },
        updateWirePath: (state, action) => {
            const wire = state.wires.find(wire => wire.id === action.payload.wireId);
            wire.path = action.payload.path;
        },
        updateWiresPaths: (state, action) => {
            action.payload.forEach(wire => {
                const wireFromStorage = state.wires.find(storageWire => storageWire.id === wire.wireId);
                wireFromStorage.path = wire.path;
            });
        },
        setWiresPrevValue: (state, action) => {
            for (let i = 0; i < state.wires.length; i++) {
                state.wires[i].prevPayload = state.wires[i].payload
            }
        },
        deleteWire: (state, action) => {
            const wireIndex = state.wires.findIndex(wire => wire.id === action.payload.wireId);
            const newWires = cloneDeep(state.wires);
            newWires.splice(wireIndex, 1);
            state.wires = [];
        },
        createWireConnection: (state, action) => {
            state.wireConnections.push(action.payload);
        },
        changeWireConnectionPosition: (state, action) => {
            const wireConnection = state.wireConnections.find(connection => connection.id === action.payload.id);
            wireConnection.position.x = action.payload.x;
            wireConnection.position.y = action.payload.y;
        },
        deleteWireConnections: (state, action) => {
            state.wireConnections = state.wireConnections.filter(connection => {
                return connection.wireId !== action.payload.wireId;
            });
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    startWire,
    resetWire,
    setWireToStorage,
    updateWirePayload,
    updateActiveWirePath,
    updateWirePath,
    setWiresPrevValue,
    deleteWire,
    createWireConnection,
    changeWireConnectionPosition,
    updateWiresPaths,
    setActivePathNodesCount,
    deleteWireConnections
} = wireSlice.actions

export default wireSlice.reducer