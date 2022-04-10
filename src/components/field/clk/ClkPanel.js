import {Line, Group, Text, Rect, Layer, Stage} from 'react-konva';
import { useEffect, useState } from "react";
import { setClk as setClkToStorage } from "../../../store/slices/clkSlice";
import {Provider, useDispatch, useSelector, ReactReduxContext} from "react-redux";
import BeforeRisingEdge  from './BeforeRisingEdge';
import { STOP_CLK_STATE } from "../../../globals/clkStates";
import { incrementClkPosition } from '../../../store/slices/clkSlice';
import { CLK_PANEL_WIDTH, CLK_PANEL_HEIGHT} from "../../../globals/globals";

const CLK_PERIOD = 1000;

export default function ClkPanel() {
    const dispatch = useDispatch();
    const clkState = useSelector(state => state.clkReducer.clkState);
    const [linePoints, setLinePoints] = useState([50, 50]);
    const [drawCounter, setDrawCounter] = useState(1);
    const [clk, setClk] = useState(0);

    useEffect(() => {
        const clkDrawInterval = setInterval(() => {
            if (clkState === STOP_CLK_STATE) {
                return;
            }

            setLinePoints(linePoints => {
                const lastPointX = linePoints[linePoints.length - 2];
                const lastPointY = linePoints[linePoints.length - 1];

                const horizontalLinePoint = [lastPointX + 20, lastPointY];
                const risingLinePoint = [lastPointX, lastPointY - 20];
                const fallingLinePoint = [lastPointX, lastPointY + 20];

                if ([2, 3].includes(drawCounter)) {
                    setClk(1);
                }
                if ([1, 4].includes(drawCounter)) {
                    setClk(0);
                }

                const counterPointMap = {
                    1: horizontalLinePoint,
                    2: risingLinePoint,
                    3: horizontalLinePoint,
                    4: fallingLinePoint,
                }

                if (linePoints[linePoints.length - 2] > window.innerWidth) {
                    setDrawCounter(1);
                    dispatch(incrementClkPosition());
                    return [50, 50];
                }

                return [...linePoints, ...counterPointMap[drawCounter]];
            });

            setDrawCounter(counter => counter === 4 ? 1 : counter + 1);
            dispatch(incrementClkPosition());
        }, CLK_PERIOD / 4)

        return () => {
            clearInterval(clkDrawInterval);
        };
    }, [clkState, drawCounter]);

    useEffect(() => {
        dispatch(setClkToStorage(clk));
    }, [clk]);

    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Stage
                    width={CLK_PANEL_WIDTH}
                    height={CLK_PANEL_HEIGHT}
                >
                    <Provider store={store}>
                        <Layer>
                            <Group
                                strokeWidth={1} // border width
                                stroke="red" // border color
                            >
                                <Rect
                                    x={0}
                                    y={0}
                                    width={window.innerWidth}
                                    height={70}
                                    stroke='black'
                                    strokeWidth={3}
                                    fill={'transparent'}
                                />
                                <Line
                                    points={linePoints}
                                    stroke='black'
                                    strokeWidth={3}
                                    lineCap='round'
                                    lineJoin='round'
                                    id='clk'
                                />
                                <Text
                                    x={15}
                                    y={35}
                                    text='Clk'
                                    fontSize={16}
                                    fontFamily='Calibri'
                                    fill='black'
                                />
                                <BeforeRisingEdge clk={clk}/>
                            </Group>
                        </Layer>
                    </Provider>
                </Stage>
            )}
        </ReactReduxContext.Consumer>
    );
}