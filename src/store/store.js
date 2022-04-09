import { configureStore } from '@reduxjs/toolkit';
import wireReducer from './slices/wireSlice';
import blockReducer from './slices/blockSlice';
import clkReducer from './slices/clkSlice';
import globalStateReducer from "./slices/globalStateSlice";
import topPanelReducer from "./slices/topPanelSlice";
import commandReducer from "./slices/commandSlice";
import AddAdirectPreloadedState from './preloadedStates/AddAdirectPreloadedState';

export default configureStore({
    reducer: {
        wireReducer,
        blockReducer,
        clkReducer,
        globalStateReducer,
        topPanelReducer,
        commandReducer,
    },
    // preloadedState: AddAdirectPreloadedState,
})