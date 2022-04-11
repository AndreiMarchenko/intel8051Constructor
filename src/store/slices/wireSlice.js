import {createSlice} from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { BLOCK_CONNECTION_SIZE } from '../../globals/globals';

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
                state.activePath = [
                    connectionObject.position.x + BLOCK_CONNECTION_SIZE / 2 + block.position.x,
                    connectionObject.position.y + BLOCK_CONNECTION_SIZE / 2 + block.position.y,
                ];
            } else {
                state.activeConnection = action.payload.connection.id;
                state.activePath = [
                    action.payload.connection.position.x + BLOCK_CONNECTION_SIZE / 2,
                    action.payload.connection.position.y + BLOCK_CONNECTION_SIZE / 2,
                ];
            }
        },
        resetWire: (state) => {
            const index = state.wireConnections.findIndex(connection =>  {
                return connection.id === state.activeConnection;
            });
            if (index !== -1) {
                state.wireConnections.splice(index, 1);
            }
            state.activeConnection = null;
            state.activePath = null;
        },
        setWireToStorage: (state, action) => {
            state.activeConnection = null;
            const wirePath = cloneDeep(state.activePath);
            state.activePath = null;
            state.activePathNodesCount = 1;
            let {
                firstConnection,
                secondConnection,
                secondBlock
            } = action.payload

            let secondBlockConnectionObj = null;
            if (secondBlock) {
                secondBlockConnectionObj = secondBlock.connections.find(connection => connection.id === secondConnection);
            }

            const wireFrom = state.wires.find(wire => wire.id === firstConnection.split('.')[1]);
            const wireTo = state.wires.find(wire => wire.id === secondConnection.id?.split('.')[1]);
            let globalId = firstConnection.includes('wire') ? wireFrom.globalId : state.wires.length.toString();

            if (wireTo) {
                globalId = secondConnection.id.includes('wire') ? wireTo.globalId : globalId;
            }

            let destinationPoint = null;
            if (secondBlock) {
                destinationPoint = [
                    secondBlock.position.x + secondBlockConnectionObj.position.x + BLOCK_CONNECTION_SIZE / 2,
                    secondBlock.position.y + secondBlockConnectionObj.position.y + BLOCK_CONNECTION_SIZE / 2
                ];
            } else {
                destinationPoint = [
                    secondConnection.position.x + BLOCK_CONNECTION_SIZE / 2,
                    secondConnection.position.y + BLOCK_CONNECTION_SIZE / 2,
                ];
                secondConnection = secondConnection.id;
            }

            state.wires.push({
                id: state.wires.length.toString(),
                globalId: globalId,
                connections: [firstConnection, secondConnection],
                payload: 'z',
                path: [
                    ...wirePath.slice(0, -2),
                    ...destinationPoint
                ],
            });
        },
        updateWirePayload: (state, action) => {
            const wireIndex = state.wires.findIndex(wire => wire.id === action.payload.id);
            const updatedWire =  state.wires[wireIndex];
            updatedWire.payload = action.payload.payload;

            state.wires.forEach(wire => {
                if (wire.globalId === updatedWire.globalId) {
                    wire.payload = action.payload.payload;
                }
            });


            // const wiresFromWire = state.wires.filter(wire => {
            //     return wire.connections[0].includes('wire') &&
            //         wire.connections[0].split('.')[1] === updateWire.id;
            // });
            //
            // const wiresToWire = state.wires.filter(wire => {
            //     return updateWire.connections[0].includes('wire') &&
            //         updateWire.connections[0].split('.')[1] === wire.id;
            // });
            //
            // [...wiresFromWire, ...wiresToWire].forEach(wire => {
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
            const wiresToStay = state.wires.filter(wire => wire.globalId !== action.payload.wireId);
            state.wires = wiresToStay;
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