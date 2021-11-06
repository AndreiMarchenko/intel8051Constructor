import { configureStore } from '@reduxjs/toolkit';
import wireReducer from './slices/wiresSlice';
import blocksReducer from './slices/blocksSlice';

export default configureStore({
    reducer: {
        wireReducer,
        blocksReducer,
    }
})