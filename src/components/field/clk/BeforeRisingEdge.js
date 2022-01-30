import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { setWiresPrevValue } from "../../../store/slices/wireSlice";

export default function BeforeRisingEdge({ clk }) {
    const clkFromStorage = useSelector(state => state.clkReducer.clk);
    const dispatch = useDispatch();

    useEffect(() => {
        if (clk === 1 && clkFromStorage === 0) {
            dispatch(setWiresPrevValue());
        }
    }, [clk])

    return null;
}