import './sidebar.css';
import {useDispatch, useSelector} from 'react-redux';
import { changeBlockName, changeBlockPayload } from '../../store/slices/blockSlice';
import { setClkState } from "../../store/slices/clkSlice";
import { STOP_CLK_STATE, START_CLK_STATE} from "../../globals/clkStates";
import { REGISTER_BLOCK_TYPE } from "../../globals/globals";

export default function Sidebar() {
    const selectedBlockId = useSelector(state => state.blockReducer.selectedBlockId);
    const selectedBlock = useSelector(state => state.blockReducer.blocks.find(block => block.id === selectedBlockId));
    const clkState = useSelector(state => state.clkReducer.clkState);
    const dispatch = useDispatch();

    const handleTextChange = event => {
        dispatch(changeBlockName({blockId: selectedBlockId, name: event.target.value}));
    };

    const handlePayloadChange = event => {
        dispatch(changeBlockPayload({blockId: selectedBlockId, payload: event.target.value}));
    };

    const toggleClk = () => {
        dispatch(setClkState(clkState === STOP_CLK_STATE ? START_CLK_STATE : STOP_CLK_STATE));
    };

    let blockInfo = null;

    if (selectedBlock) {
        let registerStateInput = null;
        if (selectedBlock.type === REGISTER_BLOCK_TYPE) {
            registerStateInput = (
                <>
                    <div className="register-state__title">
                        Set register payload
                    </div>
                    <input className={'register-state__input'} type="text" value={selectedBlock.payload} onChange={handlePayloadChange}/>
                </>
            );
        }

        blockInfo = (
            <>
                <div className={'block-name'}>
                    <div className="block-name__title">
                        Set block name
                    </div>
                    <input className={'block-name__input'} type="text" value={selectedBlock.name} onChange={handleTextChange}/>
                </div>
                {registerStateInput}
            </>
        );
    }

    let clkButtons = (
        <div className={'clk-buttons'}>
            <button className="clk-button" onClick={toggleClk}>
                {clkState === START_CLK_STATE ? 'Stop clk' : 'Start clk'}
            </button>
        </div>
    );

    let content = (
        <div className="content">
            {blockInfo}
            {clkButtons}
        </div>
    );


    return (
        <div className={'sidebar'}>
            {content}
        </div>
    );
}