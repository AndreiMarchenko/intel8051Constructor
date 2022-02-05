import {Group, Rect, Text} from "react-konva";
import {REGISTER_BLOCK_SIZE} from "../../../../globals/globals";

export default function StateDisplayRectangle({ state }) {
  const size = 50;

  return (
    <Group x={REGISTER_BLOCK_SIZE / 2 - size / 2} y={REGISTER_BLOCK_SIZE / 2 - size / 2}>
      <Rect
        x={0}
        y={0}
        width={size}
        height={size}
        fill={'white'}
        shadowBlur={5}
      />
      <Text
        x={0}
        y={0}
        text={state}
        fontSize={22}
        fontFamily='Calibri'
        fill='black'
      />
    </Group>
  );
}
