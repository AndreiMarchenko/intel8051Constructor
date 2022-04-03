import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {updateWirePayload} from "../store/slices/wireSlice";
import {updateGlobalSignal} from "../store/slices/blockSlice";

export default function ControlUnit() {
    const dispatch = useDispatch();

    const clk = useSelector(state => state.clkReducer.clk);
    const clkPosition = useSelector(state => state.clkReducer.clkPosition);

    useEffect(() => {
        console.log('test');
        dispatch(updateGlobalSignal({
            signalName: 'romInc',
            value: 1,
        }));
    }, []);


    useEffect(() => {
        if (clkPosition === 7) {
            console.log('test2');
            dispatch(updateGlobalSignal({
                signalName: 'romInc',
                value: 0,
            }));
        }
    }, [clkPosition]);

    return null;
}