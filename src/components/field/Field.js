import {useRef, useEffect, Fragment} from 'react';
import {Stage, Layer} from 'react-konva';
import { ReactReduxContext, Provider, useDispatch, useSelector } from "react-redux";
import { resetWire, updateActiveWirePath, deleteWire, setActivePathNodesCount } from "../../store/slices/wireSlice";
import {
    changeBlockConnection,
    changeBlockPosition,
    deleteBlock,
    setBlockToStorage,
} from '../../store/slices/blockSlice';
import { last } from 'lodash';
import { STATES } from '../../globals/globalStates';
import { changeState } from "../../store/slices/globalStateSlice";
import Wire from './Wire';
import ClkPanel from "./clk/ClkPanel";
import WireConnection from "./WireConnection";
import Register from "./logic-blocks/register/Register";
import Inc from "./logic-blocks/inc/Inc";
import LogicOne from "./logic-blocks/logic-one/LogicOne";
import LogicZero from "./logic-blocks/logic-zero/LogicZero";
import Rom from './logic-blocks/rom/Rom';
import Ram from './logic-blocks/ram/Ram';
import Sum from './logic-blocks/sum/Sum';
import InstructionRegister from './logic-blocks/instruction-register/InstructionRegister';
import getConnections from '../../utils/getConnections';
import './field.css'
import GlobalSig from "./logic-blocks/global-sig/GlobalSig";

import {
    BLOCK_SIZES,
    TOP_PANEL_HEIGHT,
    FIELD_WIDTH,
    FIELD_HEIGHT,
    SIDEBAR_WIDTH,

    REGISTER_BLOCK_TYPE,
    INC_BLOCK_TYPE,
    LOGIC_ONE_BLOCK_TYPE,
    LOGIC_ZERO_BLOCK_TYPE,
    ROM_BLOCK_TYPE,
    RAM_BLOCK_TYPE,
    SUM_BLOCK_TYPE,
    GLOBAL_SIG_BLOCK_TYPE,
    CONTROL_UNIT_BLOCK_TYPE,
    INSTRUCTION_REGISTER_BLOCK_TYPE,

    BLOCK_TYPE_NAME_MAP
} from "../../globals/globals";
import ControlUnit from "./logic-blocks/control-unit/ControlUnit";


export default function Field() {
    const blocks = useSelector(state => state.blockReducer.blocks);
    const wires = useSelector(state => state.wireReducer.wires);
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const activePath = useSelector(state => state.wireReducer.activePath);
    const globalState = useSelector(state => state.globalStateReducer.globalState);
    const globalStatePayload = useSelector(state => state.globalStateReducer.statePayload);
    const wireConnections = useSelector(state => state.wireReducer.wireConnections);
    const activePathNodesCount = useSelector(state => state.wireReducer.activePathNodesCount);

    const layerRef = useRef();
    const dispatch = useDispatch();

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        const escKeyPressed = evt.keyCode === 27;
        if (escKeyPressed) {
            dispatch(resetWire());
        }
    };


    useEffect(() => {
        const newWire = last(wires);
        if (!newWire) {
            return;
        }
        const isFromWire = newWire.connections[0].includes('wire');

        if (!isFromWire) {
            const wireFromBlock = blocks.find(block => {
                return (block.id).toString() === newWire.connections[0].split('.')[0]
            });
            dispatch(changeBlockConnection({
                blockId: wireFromBlock.id,
                connectionId: newWire.connections[0],
                connectedTo: newWire.id,
            }));
        }

        const isToWire = newWire.connections[1].includes('wire');

        if (!isToWire) {
            const wireToBlock = blocks.find(block => (block.id).toString() === newWire.connections[1].split('.')[0]);
            dispatch(changeBlockConnection({
                blockId: wireToBlock.id,
                connectionId: newWire.connections[1],
                connectedTo: newWire.id,
            }));
        }

        dispatch(resetWire());
    }, [wires.length]);

    const handleClickOnField = event => {
        const position = layerRef.current.getRelativePointerPosition();

        if (globalState === STATES.ADDING_BLOCKS) {
            dispatch(changeBlockPosition({
                blockId: last(blocks).id,
                position: {
                    x: position.x,
                    y: position.y,
                }
            }));
            dispatch(changeState(STATES.GENERAL));
        } else if (globalState === STATES.DELETING) {

            const deleteX = position.x;
            const deleteY = position.y;

            const wire = wires.find(wire => {
                return wire.path.find((_, index) => {
                    if (index % 2 !== 0) {
                        return false;
                    }
                    if (!wire.path[index + 3]) {
                        return false;
                    }

                    const firstPoint = [wire.path[index], wire.path[index + 1]];
                    const secondPoint = [wire.path[index + 2], wire.path[index + 3]];

                    const A = firstPoint[1] - secondPoint[1];
                    const B = secondPoint[0] - firstPoint[0];
                    const C = firstPoint[0] * secondPoint[1] - secondPoint[0] * firstPoint[1];
                    const distanceToWire = Math.abs(A * deleteX + B * deleteY + C) / (Math.sqrt(A * A + B * B));

                    const clickedOnWire = distanceToWire < 5;
                    return clickedOnWire;
                });
            });

            if (wire) {
                dispatch(deleteWire({
                    wireId: wire.id
                }));
                return;
            }

            const block = blocks.find(block => {
                const blockWidth = BLOCK_SIZES[block.type].width;
                const blockHeight = BLOCK_SIZES[block.type].height;

                return  (deleteX >= block.position.x && deleteX <= block.position.x + blockWidth)
                    && (deleteY >= block.position.y && deleteY <= block.position.y + blockHeight)
            });

            if (!block) {
                return;
            }

            dispatch(deleteBlock({
                blockId: block.id
            }));

        } else if (activeConnection !== null) {
            dispatch(setActivePathNodesCount(activePathNodesCount + 1));
            dispatch(updateActiveWirePath({
                x: position.x,
                y: position.y,
            }));
        }
    }

    useEffect(() => {
        if (globalState === STATES.CANCEL_ADDING_BLOCKS) {

            dispatch(deleteBlock({
                blockId: last(blocks)?.id
            }));
            dispatch(changeState(STATES.GENERAL));
            return;
        }

        if (globalState === STATES.ADDING_BLOCKS) {
            const lastBlockId = +last(blocks)?.id + 1 || 0;
            dispatch(setBlockToStorage({
                id: lastBlockId.toString(),
                type: globalStatePayload.blockType,
                name: BLOCK_TYPE_NAME_MAP[globalStatePayload.blockType],
                position: {x: 100, y: 100},
                connections: getConnections(globalStatePayload.blockType, lastBlockId),
                payload: 0,
            }));
        }
    }, [globalState, globalStatePayload]);

    const handleMouseMove = event => { //useThrottle
        const position = layerRef.current.getRelativePointerPosition();

        if (globalState === STATES.ADDING_BLOCKS) {
            const lastBlockId = last(blocks)?.id || 0;

            dispatch(changeBlockPosition({
                blockId: lastBlockId,
                position: {
                    x: position.x,
                    y: position.y
                }
            }));
        } else if (activeConnection !== null) {
            dispatch(updateActiveWirePath({
                x: position.x - 3,
                y: position.y - 3,
            }));
        }
    };

    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Fragment>
                    <Stage
                        className={'field'}
                        width={FIELD_WIDTH}
                        height={FIELD_HEIGHT}
                        onClick={handleClickOnField}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={e => {
                            const container = e.target.getStage().container();
                            if (globalState === STATES.DELETING) {
                                container.style.cursor = "crosshair";
                            } else  {
                                container.style.cursor = "default";
                            }
                        }}
                    >
                        <Provider store={store}>
                            <Layer x={0} y={0} ref={layerRef}>
                                <Fragment>
                                    {blocks.map((block, i) => {
                                        switch (block.type) {
                                            case REGISTER_BLOCK_TYPE:
                                                return <Register
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case INC_BLOCK_TYPE:
                                                return <Inc
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case LOGIC_ONE_BLOCK_TYPE:
                                                return <LogicOne
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case LOGIC_ZERO_BLOCK_TYPE:
                                                return <LogicZero
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case ROM_BLOCK_TYPE:
                                                return <Rom
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case RAM_BLOCK_TYPE:
                                                return <Ram
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case SUM_BLOCK_TYPE:
                                                return <Sum
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case GLOBAL_SIG_BLOCK_TYPE:
                                                return <GlobalSig
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case CONTROL_UNIT_BLOCK_TYPE:
                                                return <ControlUnit
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case INSTRUCTION_REGISTER_BLOCK_TYPE:
                                                return <InstructionRegister
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                        }
                                    })}
                                    {wireConnections.map((connection, i) => {
                                        return <WireConnection
                                            id={connection.id}
                                            key={connection.id}
                                            x={connection.position.x}
                                            y={connection.position.y}
                                            wireId={connection.wireId}
                                        />
                                    })}
                                    {wires.map((wire, i) => {
                                        return <Wire
                                            id={wire.id}
                                            key={wire.id}
                                            points={wire.path}
                                        />;
                                    })}
                                    {activePath &&
                                        <Wire
                                            id={'activeWire'}
                                            key={'activeWire'}
                                            points={[...activePath]}
                                        />
                                    }
                                </Fragment>
                            </Layer>
                        </Provider>
                    </Stage>
                    <ClkPanel/>
                </Fragment>
            )}
        </ReactReduxContext.Consumer>
    );
}