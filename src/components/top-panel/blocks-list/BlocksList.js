import './blocks-list.css';

import Register from "./blocks/register/Register";
import Inc from "./blocks/inc/Inc";
import LogicOne from "./blocks/logicOne/logicOne";
import LogicZero from "./blocks/logicZero/logicZero";

export default function BlocksList() {
    const blocks = [
        <Register key={1} />,
        <Inc key={2} />,
        <LogicOne key={3} />,
        <LogicZero key={4} />
    ];


    return (
        <div className='blocks-list'>
            { blocks }
        </div>
    );
}