import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {updateWirePayload} from "../store/slices/wireSlice";
import {updateGlobalSignal} from "../store/slices/blockSlice";

export default function ControlUnit() {
    const dispatch = useDispatch();

    const clk = useSelector(state => state.clkReducer.clk);
    const clkPosition = useSelector(state => state.clkReducer.clkPosition);

    useEffect(() => {
        dispatch(updateGlobalSignal({
            signalName: 'romInc',
            value: 1,
        }));
    }, []);


    useEffect(() => {
        if (clkPosition === 7) {
            dispatch(updateGlobalSignal({
                signalName: 'romInc',
                value: 0,
            }));
        }
    }, [clkPosition]);

    return null;
}