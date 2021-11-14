import { configureStore } from '@reduxjs/toolkit';
import wireReducer from './slices/wireSlice';
import blockReducer from './slices/blockSlice';

export default configureStore({
    reducer: {
        wireReducer,
        blockReducer,
    }
})