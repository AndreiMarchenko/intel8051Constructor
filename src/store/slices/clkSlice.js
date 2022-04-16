import { createSlice } from '@reduxjs/toolkit';
import { STOP_CLK_STATE, RESET_CLK_STATE } from "../../globals/clkStates";

export const clkSlice = createSlice({
    name: 'clk',
    initialState: {
        clk: 0,
        clkState: STOP_CLK_STATE,
        clkPosition: 1,
    },
    reducers: {
        setClk: (state, action) => {
            state.clk = action.payload;
        },
        setClkState: (state, action) => {
            state.clkState = action.payload;
        },
        incrementClkPosition: (state) => {
            state.clkPosition = state.clkPosition + 1;
        },
        setClkPosition: (state, action) => {
            state.clkPosition = action.payload;
        },
        resetClk: (state) => {
            state.clkState = RESET_CLK_STATE;
            state.clkPosition = 1;
        },
    }
})

// Action creators are generated for each case reducer function
export const { setClk, setClkState, incrementClkPosition, resetClk, setClkPosition } = clkSlice.actions

export default clkSlice.reducer