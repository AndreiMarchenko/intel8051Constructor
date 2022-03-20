import { Group, Rect } from 'react-konva';
import { useSelector } from "react-redux";

import { STATES } from "../../globals/globalStates";
import { WIRE_CONNECTION_SIZE } from '../../globals/globals';

export default function WireConnection({x, y}) {
    const globalState = useSelector(state => state.globalStateReducer.globalState);

    return (
        <Group
            onMouseEnter={e => {
                const container = e.target.getStage().container();
                container.style.cursor = "pointer";
            }}
            onMouseLeave={e => {
                const container = e.target.getStage().container();

                if (globalState === STATES.DELETING) {
                    container.style.cursor = "crosshair";
                } else {
                    container.style.cursor = "default";
                }
            }}
        >
            <Rect
                x={x}
                y={y}
                width={WIRE_CONNECTION_SIZE}
                height={WIRE_CONNECTION_SIZE}
                fill={'yellow'}
                shadowBlur={5}
            />
        </Group>
    );
}