import {Group, Rect, Text} from "react-konva";
import {INSTRUCTION_REGISTER_BLOCK_SIZE} from "../../../../globals/globals";

export default function StateDisplayRectangle({ state }) {
    const height = 50;
    const width = 100;

  return (
    <Group x={INSTRUCTION_REGISTER_BLOCK_SIZE / 2 - width / 2} y={INSTRUCTION_REGISTER_BLOCK_SIZE / 2 - height / 2}>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={'white'}
        shadowBlur={5}
      />
      <Text
        x={0}
        y={20}
        text={state}
        fontSize={14}
        fontFamily='Calibri'
        fill='black'
      />
    </Group>
  );
}
