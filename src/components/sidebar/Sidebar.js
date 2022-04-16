import './sidebar.css';
import {useDispatch, useSelector} from 'react-redux';
import { changeBlockName, changeBlockPayload } from '../../store/slices/blockSlice';
import { setClkState, resetClk } from "../../store/slices/clkSlice";
import { STOP_CLK_STATE, START_CLK_STATE} from "../../globals/clkStates";
import {
    REGISTER_BLOCK_TYPE,
    ROM_BLOCK_TYPE,
    RAM_BLOCK_TYPE,
    INSTRUCTION_REGISTER_BLOCK_TYPE
} from "../../globals/globals";
import {useEffect, useState} from "react";
import {cloneDeep} from 'lodash';
import toHex from "../../utils/toHex";
import fromHex from "../../utils/fromHex";

export default function Sidebar() {
    const selectedBlockId = useSelector(state => state.blockReducer.selectedBlockId);
    const selectedBlock = useSelector(state => state.blockReducer.blocks.find(block => block.id === selectedBlockId));
    const clkState = useSelector(state => state.clkReducer.clkState);
    const dispatch = useDispatch();
    const [selectedBlockState, setSelectedBlockState] = useState(0);


    const handleRegisterStateChange = event => {
        if (isNaN(fromHex(event.target.value))) {
            setSelectedBlockState('0x00');
            return;
        }

        setSelectedBlockState(event.target.value)
        handlePayloadChange(event.target.value);
    };

    useEffect(() => {
        if (!selectedBlock) {
            return;
        }

        let clonedPayload = cloneDeep(selectedBlock.payload);

        if (selectedBlock.type === REGISTER_BLOCK_TYPE) {
            clonedPayload = toHex(clonedPayload);
        } else if ([RAM_BLOCK_TYPE, ROM_BLOCK_TYPE].includes(selectedBlock.type)) {
            clonedPayload.address = toHex(clonedPayload.address);
            clonedPayload.value = toHex(clonedPayload.value);
            clonedPayload.activeAddress = toHex(clonedPayload.activeAddress);
        }

        setSelectedBlockState(clonedPayload);
    }, [selectedBlock]);

    const handleTextChange = event => {
        dispatch(changeBlockName({blockId: selectedBlockId, name: event.target.value}));
    };

    const handlePayloadChange = payload => {
        let clonedPayload = cloneDeep(payload);

        if ([REGISTER_BLOCK_TYPE, INSTRUCTION_REGISTER_BLOCK_TYPE].includes(selectedBlock.type)) {
            clonedPayload = fromHex(payload);
        } else {
            clonedPayload.address = fromHex(payload.address);
            console.log(payload.value);
            console.log(fromHex(payload.value));
            clonedPayload.value = fromHex(payload.value);
            clonedPayload.activeAddress = fromHex(payload.activeAddress);
        }

        dispatch(changeBlockPayload({blockId: selectedBlockId, payload: clonedPayload}));
    };

    const toggleClk = () => {
        dispatch(setClkState(clkState === STOP_CLK_STATE ? START_CLK_STATE : STOP_CLK_STATE));
    };

    const handleResetClk = () => {
        dispatch(resetClk());
    };

    let blockInfo = null;

    if (selectedBlock) {
        let stateInput = null;
        if ([REGISTER_BLOCK_TYPE, INSTRUCTION_REGISTER_BLOCK_TYPE].includes(selectedBlock.type)) {
            stateInput = (
                <>
                    <div className="register-state__title">
                        Set register payload
                    </div>
                    <input
                        className={'register-state__input'}
                        type="text"
                        onChange={event => handleRegisterStateChange(event)}
                    />
                </>
            );
        }

        if ([ROM_BLOCK_TYPE, RAM_BLOCK_TYPE].includes(selectedBlock.type)) {
            stateInput = (
                <>
                    <div className="register-state__title">
                        Set ROM payload
                    </div>
                    <div className="address-group">
                        Address
                        <input
                            className={'memory__input'}
                            type="text"
                            onChange={event => setSelectedBlockState({
                                ...selectedBlockState,
                                address: event.target.value,
                            })}
                        />
                    </div>
                    <div className="value-group">
                        Value
                        <input
                            className={'memory__input'}
                            type="text"
                            onChange={event => setSelectedBlockState({
                                ...selectedBlockState,
                                value: event.target.value,
                            })}
                        />
                    </div>
                    <div className="active-address-group">
                        Active address
                        <input
                            className={'memory__input'}
                            type="text"
                            onChange={event => setSelectedBlockState({
                                ...selectedBlockState,
                                activeAddress: event.target.value,
                            })}
                        />
                    </div>
                    <button className="memory-btn" onClick={() => handlePayloadChange(selectedBlockState)}>Save</button>
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
                {stateInput}
            </>
        );
    }

    let clkButtons = (
        <div className={'clk-buttons'}>
            <button className="clk-button" onClick={toggleClk}>
                {clkState === START_CLK_STATE ? 'Stop clk' : 'Start clk'}
            </button>
            <button className="reset-clk-button" onClick={handleResetClk}>
                Reset clk
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