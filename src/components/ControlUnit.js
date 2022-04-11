import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {updateGlobalSignal} from "../store/slices/blockSlice";
import { ADD_A_DIRECT } from "../globals/commands";

export default function ControlUnit() {
    const dispatch = useDispatch();

    const clk = useSelector(state => state.clkReducer.clk);
    const clkPosition = useSelector(state => state.clkReducer.clkPosition);
    const currentCommand = useSelector(state => state.commandReducer.currentCommand);

    useEffect(() => {
        // dispatch(updateGlobalSignal({
        //     signalName: 'romInc',
        //     value: 1,
        // }));
        dispatch(updateGlobalSignal({
            signalName: 'romEn',
            value: 1,
        }));
    }, []);

    // useEffect(() => {
    //     if (clk === 1) {
    //         dispatch(updateGlobalSignal({
    //             signalName: 'romEn',
    //             value: 0,
    //         }));
    //     }
    // }, [clk]);

    useEffect(() => {
        if (clkPosition === 7) {
            dispatch(updateGlobalSignal({
                signalName: 'instRegEn',
                value: 1,
            }));
            dispatch(updateGlobalSignal({
                signalName: 'romEn',
                value: 0,
            }));
        }
        if (clkPosition === 11) {
            dispatch(updateGlobalSignal({
                signalName: 'instRegEn',
                value: 0,
            }));
        }

        if (currentCommand === ADD_A_DIRECT) {
            if (clkPosition === 15) {
                dispatch(updateGlobalSignal({
                    signalName: 'romInc',
                    value: 1,
                }));
            }
            if (clkPosition === 19) {
                dispatch(updateGlobalSignal({
                    signalName: 'romInc',
                    value: 0,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'romEn',
                    value: 1,
                }));
            }

            if (clkPosition === 23) {
                dispatch(updateGlobalSignal({
                    signalName: 'ramRdAddr',
                    value: 1,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'romEn',
                    value: 0,
                }));
            }

            if (clkPosition === 27) {
                dispatch(updateGlobalSignal({
                    signalName: 'ramRdAddr',
                    value: 0,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'ramEn',
                    value: 1,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'ramRnW',
                    value: 1,
                }));
            }

            if (clkPosition === 31) {
                dispatch(updateGlobalSignal({
                    signalName: 'rvhEn',
                    value: 1,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'ramEn',
                    value: 0,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'ramRnW',
                    value: 0,
                }));
            }

            if (clkPosition === 35) {
                dispatch(updateGlobalSignal({
                    signalName: 'accumOEn',
                    value: 1,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'rvhEn',
                    value: 0,
                }));
            }

            if (clkPosition === 39) {
                dispatch(updateGlobalSignal({
                    signalName: 'regAccEn',
                    value: 1,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'accumOEn',
                    value: 0,
                }));
            }

            if (clkPosition === 43) {
                dispatch(updateGlobalSignal({
                    signalName: 'sumEn',
                    value: 1,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'regAccEn',
                    value: 0,
                }));
            }

            if (clkPosition === 47) {
            }

            if (clkPosition === 51) {
                dispatch(updateGlobalSignal({
                    signalName: 'accumEn',
                    value: 1,
                }));
                dispatch(updateGlobalSignal({
                    signalName: 'sumEn',
                    value: 0,
                }));
            }

            if (clkPosition === 55) {
                dispatch(updateGlobalSignal({
                    signalName: 'accumEn',
                    value: 0,
                }));
            }

        }



    }, [clkPosition]);

    return null;
}