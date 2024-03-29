import {Group, Rect, Text} from "react-konva";
import {INSTRUCTION_REGISTER_BLOCK_WIDTH, INSTRUCTION_REGISTER_BLOCK_HEIGHT} from "../../../../globals/globals";

export default function StateDisplayRectangle({ state }) {
    const height = 50;
    const width = 100;

  return (
    <Group x={INSTRUCTION_REGISTER_BLOCK_WIDTH / 2 - width / 2} y={INSTRUCTION_REGISTER_BLOCK_HEIGHT / 2 - height / 2}>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={'white'}
        shadowBlur={5}
      />
      <Text
        x={28}
        y={15}
        text={state}
        fontSize={22}
        fontFamily='Calibri'
        fill='black'
      />
    </Group>
  );
}
