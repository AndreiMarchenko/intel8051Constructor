import {useState, useEffect, Fragment} from 'react';
import {Stage, Layer} from 'react-konva';
import { ReactReduxContext, Provider, useDispatch, useSelector } from "react-redux";
import { resetWire, updateActiveWirePath, deleteWire, setActivePathNodesCount } from "../../store/slices/wireSlice";
import {
    changeBlockConnection,
    changeBlockPosition,
    deleteBlock,
    setBlockToStorage, setSelectedBlockId,
} from '../../store/slices/blockSlice';
import { last } from 'lodash';
import { STATES } from '../../globals/globalStates';
import { changeState } from "../../store/slices/globalStateSlice";
import {BLOCK_SIZES, TOP_PANEL_HEIGHT} from "../../globals/globals";

import Wire from './Wire';
import ClkPanel from "./clk/ClkPanel";
import WireConnection from "./WireConnection";
import Register from "./logic-blocks/register/Register";
import Inc from "./logic-blocks/inc/Inc";
import LogicOne from "./logic-blocks/logic-one/LogicOne";
import LogicZero from "./logic-blocks/logic-zero/LogicZero";
import Rom from './logic-blocks/rom/Rom';
import InstructionRegister from './logic-blocks/instruction-register/InstructionRegister';
import getConnections from '../../utils/getConnections';
import './field.css'
import GlobalSig from "./logic-blocks/global-sig/GlobalSig";
import BlockTypeNameMap from '../../utils/blockTypeNameMap';


export default function Field({ clkPanelDimensions, fieldDimensions }) {
    const blocks = useSelector(state => state.blockReducer.blocks);
    const wires = useSelector(state => state.wireReducer.wires);
    const activeConnection = useSelector(state => state.wireReducer.activeConnection);
    const activePath = useSelector(state => state.wireReducer.activePath);
    const globalState = useSelector(state => state.globalStateReducer.globalState);
    const globalStatePayload = useSelector(state => state.globalStateReducer.statePayload);
    const wireConnections = useSelector(state => state.wireReducer.wireConnections);
    const activePathNodesCount = useSelector(state => state.wireReducer.activePathNodesCount);

    const dispatch = useDispatch();

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

        const wireToBlock = blocks.find(block => (block.id).toString() === newWire.connections[1].split('.')[0]);


        dispatch(changeBlockConnection({
            blockId: wireToBlock.id,
            connectionId: newWire.connections[1],
            connectedTo: newWire.id,
        }));


        dispatch(resetWire());
    }, [wires.length]);

    const handleClickOnField = event => {
        if (globalState === STATES.ADDING_BLOCKS) {
            dispatch(changeBlockPosition({
                blockId: last(blocks).id,
                position: {
                    x: event.evt.clientX - 170,
                    y: event.evt.clientY - TOP_PANEL_HEIGHT,
                }
            }));
            dispatch(changeState(STATES.GENERAL));
        } else if (globalState === STATES.DELETING) {

            const deleteX = event.evt.clientX - 170;
            const deleteY = event.evt.clientY - TOP_PANEL_HEIGHT;

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
                return  (deleteX >= block.position.x && deleteX <= block.position.x + BLOCK_SIZES[block.name])
                    && (deleteY >= block.position.y && deleteY <= block.position.y + BLOCK_SIZES[block.name])
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
                x: event.evt.clientX - 170,
                y: event.evt.clientY - 80,
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
                name: BlockTypeNameMap[globalStatePayload.blockType],
                position: {x: 100, y: 100},
                connections: getConnections(globalStatePayload.blockType, lastBlockId)
            }));
        }
    }, [globalState, globalStatePayload]);

    const handleMouseMove = event => { //useThrottle

        if (globalState === STATES.ADDING_BLOCKS) {
            const lastBlockId = last(blocks)?.id || 0;

            dispatch(changeBlockPosition({
                blockId: lastBlockId,
                position: {
                    x: event.evt.clientX - 170,
                    y: event.evt.clientY - 80
                }
            }));
        } else if (activeConnection !== null) {
            dispatch(updateActiveWirePath({
                x: event.evt.clientX - 170 - 3,
                y: event.evt.clientY - 80 - 3,
            }));
        }
    };

    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Fragment>
                    <Stage
                        className={'field'}
                        width={fieldDimensions.width}
                        height={fieldDimensions.height}
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
                            <Layer>
                                <Fragment>
                                    {blocks.map((block, i) => {
                                        switch (block.type) {
                                            case 'register':
                                                return <Register
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case 'inc':
                                                return <Inc
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case 'logic-one':
                                                return <LogicOne
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case 'logic-zero':
                                                return <LogicZero
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case 'rom':
                                                return <Rom
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case 'global-sig':
                                                return <GlobalSig
                                                    id={block.id}
                                                    key={block.id}
                                                    x={block.position.x}
                                                    y={block.position.y}
                                                    name={block.name}
                                                />;
                                            case 'instruction-register':
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
                                            id={'lalalal'}
                                            key={'lalalal'}
                                            points={[...activePath]}
                                        />
                                    }
                                </Fragment>
                            </Layer>
                        </Provider>
                    </Stage>
                    <Stage
                        width={clkPanelDimensions.width}
                        height={clkPanelDimensions.height}
                    >
                        <Provider store={store}>
                            <Layer>
                                <ClkPanel/>
                            </Layer>
                        </Provider>
                    </Stage>
                </Fragment>
            )}
        </ReactReduxContext.Consumer>
    );
}