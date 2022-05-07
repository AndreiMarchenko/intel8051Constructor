import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import {updateGlobalSignal} from "../../../../store/slices/blockSlice";
import {openCommandModal, setCommandLength, setCommandCode} from "../../../../store/slices/commandSlice";
import {Text} from "react-konva";
import Block from "../../Block";
import {CONTROL_UNIT_BLOCK_COLOR, CONTROL_UNIT_BLOCK_HEIGHT, CONTROL_UNIT_BLOCK_WIDTH} from "../../../../globals/globals";
import getConnections from "../control-unit/connections";
import {Html} from "react-konva-utils";

export default function ControlUnit({id, x, y, name}) {
    const dispatch = useDispatch();

    const globalSignals = useSelector(state => state.blockReducer.globalSignals);
    const commands = useSelector(state => state.blockReducer.commands);
    const clk = useSelector(state => state.clkReducer.clk);
    const clkPosition = useSelector(state => state.clkReducer.clkPosition);
    const currentCommand = useSelector(state => state.commandReducer.currentCommand);
    const commandLength = useSelector(state => state.commandReducer.commandLength);
    const connections = getConnections(id);

    useEffect(() => {
        const isRisingEdge = (clkPosition + 1) % 4 === 0;

        if (!isRisingEdge) {
            return;
        }

        if (!commands.find(command => command.commandCode === currentCommand)) {
            return;
        }

        globalSignals.forEach(signal => {
            if (signal.commands.find(command => command.commandCode === currentCommand).ones.map(one => one * 4 - 1).includes(clkPosition)) {
                dispatch(updateGlobalSignal({
                    blockId: signal.blockId,
                    value: 1,
                    touched: true,
                }));
            } else if (!signal.commands.find(command => +command.commandCode === +currentCommand).ones.map(one => one * 4 - 1).includes(clkPosition)) {
                dispatch(updateGlobalSignal({
                    blockId: signal.blockId,
                    value: 0,
                    touched: true,
                }));
            }
        });

    }, [clkPosition]);

    const handleBtnClick = () => {
        dispatch(openCommandModal());
    };

    const slot = (
        <Fragment>
            <Text
                x={0}
                y={0}
                text={name}
                fontSize={22}
                fontFamily='Calibri'
                fill='black'
            />
            <Html divProps={{
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '35px',
                    marginLeft: '2px',
                },
            }}>
                <button onClick={handleBtnClick} style={{width: '140px'}}>Command editor</button>
            </Html>
        </Fragment>
    );

    return (
        <Block
            id={id}
            x={x}
            y={y}
            width={CONTROL_UNIT_BLOCK_WIDTH}
            height={CONTROL_UNIT_BLOCK_HEIGHT}
            connections={connections}
            slot={slot}
            color={CONTROL_UNIT_BLOCK_COLOR}
        />
    );
}