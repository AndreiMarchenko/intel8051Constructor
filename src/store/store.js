import { configureStore } from '@reduxjs/toolkit';
import wireReducer from './slices/wireSlice';
import blockReducer from './slices/blockSlice';
import clkReducer from './slices/clkSlice';
import globalStateReducer from "./slices/globalStateSlice";
import topPanelReducer from "./slices/topPanelSlice";
import commandReducer from "./slices/commandSlice";
import loadState from "./localstorageApi/loadState";
import AddAdirectPreloadedState from './preloadedStates/AddAdirectPreloadedState';

const preloadedState = loadState();

export default configureStore({
    reducer: {
        wireReducer,
        blockReducer,
        clkReducer,
        globalStateReducer,
        topPanelReducer,
        commandReducer,
    },
    preloadedState: preloadedState,
})