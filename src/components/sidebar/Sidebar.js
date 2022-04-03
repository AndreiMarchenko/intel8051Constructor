import './sidebar.css';
import {useDispatch, useSelector} from 'react-redux';
import { changeBlockName } from '../../store/slices/blockSlice';
import { setClkState } from "../../store/slices/clkSlice";
import { STOP_CLK_STATE, START_CLK_STATE} from "../../globals/clkStates";

export default function Sidebar() {
    const selectedBlockId = useSelector(state => state.blockReducer.selectedBlockId);
    const selectedBlock = useSelector(state => state.blockReducer.blocks.find(block => block.id === selectedBlockId));
    const dispatch = useDispatch();

    const handleTextChange = event => {
        dispatch(changeBlockName({blockId: selectedBlockId, name: event.target.value}));
    };

    const startClk = () => {
        dispatch(setClkState(START_CLK_STATE));
    };

    const stopClk = () => {
        dispatch(setClkState(STOP_CLK_STATE));
    };

    let blockInfo = null;

    if (selectedBlock) {
        blockInfo = (
            <div className={'block-name'}>
                <div className="block-name__title">
                    Set block name
                </div>
                <input className={'block-name__input'} type="text" value={selectedBlock.name} onChange={handleTextChange}/>
            </div>
        );
    }

    let clkButtons = (
        <div className={'clk-buttons'}>
            <button className="clk-stop" onClick={stopClk}>Stop clk</button>
            <button className="clk-start" onClick={startClk}>Start clk</button>
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