import { configureStore } from '@reduxjs/toolkit';
import wireReducer from './slices/wireSlice';
import blockReducer from './slices/blockSlice';
import clkReducer from './slices/clkSlice';

export default configureStore({
    reducer: {
        wireReducer,
        blockReducer,
        clkReducer,
    }
})