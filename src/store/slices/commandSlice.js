import { createSlice } from "@reduxjs/toolkit";

export const commandSlice = createSlice({
    name: 'command',
    initialState: {
        currentCommand: 0,
        isCommandModalOpened: false,
        commandLength: 0,
        commandCode: 11111111,
    },
    reducers: {
        changeCurrentCommand: (state, action) => {
           state.currentCommand = action.payload;
        },
        openCommandModal: (state) => {
            state.isCommandModalOpened = true;
        },
        closeCommandModal: (state) => {
            state.isCommandModalOpened = false;
        },
        setCommandLength: (state, action) => {
            state.commandLength = action.payload;
        },
        setCommandCode: (state, action) => {
            state.commandCode = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const { changeCurrentCommand, openCommandModal, closeCommandModal, setCommandLength, setCommandCode } = commandSlice.actions

export default commandSlice.reducer