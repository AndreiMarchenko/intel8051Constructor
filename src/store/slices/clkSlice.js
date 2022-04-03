import { createSlice } from '@reduxjs/toolkit';
import { STOP_CLK_STATE } from "../../globals/clkStates";

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
        incrementClkPosition: (state, action) => {
            state.clkPosition = state.clkPosition + 1;
        }
    }
})

// Action creators are generated for each case reducer function
export const { setClk, setClkState, incrementClkPosition } = clkSlice.actions

export default clkSlice.reducer