import { configureStore } from '@reduxjs/toolkit';
import wireReducer from './slices/wireSlice';
import blockReducer from './slices/blockSlice';
import clkReducer from './slices/clkSlice';
import globalStateReducer from "./slices/globalStateSlice";
import topPanelReducer from "./slices/topPanelSlice";

export default configureStore({
    reducer: {
        wireReducer,
        blockReducer,
        clkReducer,
        globalStateReducer,
        topPanelReducer
    }
})