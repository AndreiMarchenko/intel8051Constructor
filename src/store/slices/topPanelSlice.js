import { createSlice } from '@reduxjs/toolkit';

export const topPanelSlice = createSlice({
    name: 'topPanel',
    initialState: {
        activeBlockType: null,
    },
    reducers: {
        setActiveBlockType: (state, action) => {
            if (state.activeBlockType === action.payload) {
                state.activeBlockType = null;
            } else {
                state.activeBlockType = action.payload;
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { setActiveBlockType } = topPanelSlice.actions

export default topPanelSlice.reducer