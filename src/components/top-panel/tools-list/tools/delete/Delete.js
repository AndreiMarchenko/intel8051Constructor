import './Delete.css';
import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { changeState } from "../../../../../store/slices/globalStateSlice";
import { STATES } from '../../../../../globals/globalStates';

export default function Delete() {
    let dispatch = useDispatch();
    let [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            dispatch(changeState(STATES.DELETING));
        } else {
            dispatch(changeState(STATES.GENERAL));
        }
    }, [isActive])


    function toggleActive() {
        setIsActive(!isActive);
    }

    return (
        <div className={`delete-cross ${isActive ? 'delete-cross_active': ''}`} onClick={toggleActive}>

        </div>
    );
}