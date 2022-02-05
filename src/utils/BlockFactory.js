import Register from "../components/field/logic-blocks/register/Register";
import Inc from "../components/field/logic-blocks/inc/Inc";

export default function BlockFactory(type, blockId, x = 0, y = 0) {
    switch(type.toLowerCase()) {
        case 'register':
            return <Register id={blockId} key={blockId} x={x} y={y} />;
        case 'inc':
            return <Inc id={blockId} key={blockId} x={x} y={y} />;
    }
}