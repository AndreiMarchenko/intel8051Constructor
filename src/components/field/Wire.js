import { Group, Line, Text } from 'react-konva';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function Wire({points, id}) {
    const payload = useSelector(state => state.wireReducer.wires.find(wire => wire.id === id)?.payload);

    let [text, setText] = useState({
        x: null,
        y: null,
        content: null,
    });

    useEffect(() => {
        setText({
            x: points[0] + (points[2] - points[0]) / 2,
            y: points[1] + (points[3] - points[1]) / 2,
            content: payload
        });
    }, [points, payload]);

    return (
        <Group>
            <Line
                points={points}
                stroke='black'
                strokeWidth={3}
                lineCap='round'
                lineJoin='round'
            />
            <Text
                x={text.x}
                y={text.y}
                text={text.content}
                fontSize={22}
                fontFamily='Calibri'
                fill='red'
            />
        </Group>
    );
}