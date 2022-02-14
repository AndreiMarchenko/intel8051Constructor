import Register from "../components/field/logic-blocks/register/Register";
import Inc from "../components/field/logic-blocks/inc/Inc";
import LogicOne from "../components/field/logic-blocks/logic-one/LogicOne";
import LogicZero from "../components/field/logic-blocks/logic-zero/LogicZero";

export default function BlockFactory(type, blockId, x = 0, y = 0) {
    switch(type.toLowerCase()) {
        case 'register':
            return <Register id={blockId} key={blockId} x={x} y={y} />;
        case 'inc':
            return <Inc id={blockId} key={blockId} x={x} y={y} />;
        case 'logic-one':
            return <LogicOne id={blockId} key={blockId} x={x} y={y} />;
        case 'logic-zero':
            return <LogicZero id={blockId} key={blockId} x={x} y={y} />;
    }
}