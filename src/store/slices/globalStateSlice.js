import { createSlice } from "@reduxjs/toolkit";
import { STATES } from '../../globals/globalStates';

export const globalStateSlice = createSlice({
    name: 'globalState',
    initialState: {
        globalState: STATES.GENERAL,
        statePayload: null,
    },
    reducers: {
        changeState: (state, action) => {
            if (!action.payload.statePayload) {
                state.globalState = action.payload;
                return;
            }
            state.globalState = action.payload.state;
            state.statePayload = action.payload.statePayload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { changeState } = globalStateSlice.actions

export default globalStateSlice.reducer