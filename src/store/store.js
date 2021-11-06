import { configureStore } from '@reduxjs/toolkit';
import wireReducer from './slices/wiresSlice';
import blocksReducer from './slices/blocksSlice';
import connectionsReducer from './slices/connectionsSlice';

export default configureStore({
    reducer: {
        wireReducer,
        blocksReducer,
        connectionsReducer,
    }
})