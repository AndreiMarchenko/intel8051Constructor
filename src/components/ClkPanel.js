import {Line, Group, Text} from 'react-konva';
import { useEffect, useState } from "react";
import { setClk } from "../store/slices/clkSlice";
import { useDispatch } from "react-redux";

const CLK_PERIOD = 4000;

export default function ClkPanel() {
    const dispatch = useDispatch();
    const [linePoints, setLinePoints] = useState([50, 50]);

    let clk = 0;
    useEffect(() => {
        let drawCounter = 1;
        const clkDrawInterval = setInterval(() => {
            if (!linePoints) {
                return;
            }

            setLinePoints(linePoints => {
                const lastPointX = linePoints[linePoints.length - 2];
                const lastPointY = linePoints[linePoints.length - 1];

                const horizontalLinePoint = [lastPointX + 20, lastPointY];
                const risingLinePoint = [lastPointX, lastPointY - 20];
                const fallingLinePoint = [lastPointX, lastPointY + 20];

                if ([2, 3].includes(drawCounter)) {
                    clk = 1;
                }
                if ([1, 4].includes(drawCounter)) {
                    clk = 0;
                }
                dispatch(setClk(clk));

                const counterPointMap = {
                    1: horizontalLinePoint,
                    2: risingLinePoint,
                    3: horizontalLinePoint,
                    4: fallingLinePoint,
                }

                return [...linePoints, ...counterPointMap[drawCounter]];
            });

            drawCounter++;
            if (drawCounter > 4) {
                drawCounter = 1;
            }
        }, CLK_PERIOD / 4)

        return () => {
            clearInterval(clkDrawInterval);
        };
    }, []);

    return (
        <Group>
            <Line
                points={linePoints}
                stroke='black'
                strokeWidth='4'
                lineCap='round'
                lineJoin='round'
                id='clk'
            />
            <Text
                x={15}
                y={35}
                text='Clk'
                fontSize='16'
                fontFamily='Calibri'
                fill='black'
            />
        </Group>
    );
}