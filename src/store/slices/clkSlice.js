import { createSlice } from '@reduxjs/toolkit';

export const clkSlice = createSlice({
    name: 'clk',
    initialState: {
        clk: 0,
    },
    reducers: {
        setClk: (state, action) => {
            state.clk = action;
        },
    }
})

// Action creators are generated for each case reducer function
export const { setClk } = clkSlice.actions

export default clkSlice.reducer