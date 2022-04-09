import { createSlice } from "@reduxjs/toolkit";

export const commandSlice = createSlice({
    name: 'command',
    initialState: {
        currentCommand: null,
    },
    reducers: {
        changeCurrentCommand: (state, action) => {
           state.currentCommand = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { changeCurrentCommand } = commandSlice.actions

export default commandSlice.reducer