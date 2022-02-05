import './Block.css'
import './register/register.css'
import './inc/inc.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { STATES } from '../../../../globals/globalStates';
import { changeState } from "../../../../store/slices/globalStateSlice";
import { setActiveBlockType } from "../../../../store/slices/topPanelSlice";

export default function Block({ type }) {
    const dispatch = useDispatch();
    const [blockBodyStyle, setBlockBodyStyle] = useState(`${type}-body`);
    const globalState = useSelector(state => state.globalStateReducer.globalState);
    const activeBlockType = useSelector(state => state.topPanelReducer.activeBlockType);

    useEffect(() => {
        if (activeBlockType === type) {
            setBlockBodyStyle(blockBodyStyle + ' active');
        } else {
            setBlockBodyStyle(blockBodyStyle.replace(' active', ''));
        }

        if (activeBlockType) {
            let alreadyMoving = globalState === STATES.ADDING_BLOCKS;
            dispatch(changeState({
                state: STATES.ADDING_BLOCKS,
                statePayload: {
                    blockType: activeBlockType,
                    alreadyMoving: alreadyMoving
                },
            }));
        } else if (globalState !== STATES.GENERAL) {
            dispatch(changeState(STATES.CANCEL_ADDING_BLOCKS));
        }
    }, [activeBlockType]);


    useEffect(() => {
        if (globalState === STATES.GENERAL) {
            dispatch(setActiveBlockType(null))
        }
    }, [globalState]);


    const handleClick = () => {
        dispatch(setActiveBlockType(type))
    };

    return (
        <div onClick={handleClick} className={`${type} blocks-list__item`}>
            <div className={blockBodyStyle}>

            </div>
            <div className={`${type}-label`}>
                { type }
            </div>
        </div>
    );
}