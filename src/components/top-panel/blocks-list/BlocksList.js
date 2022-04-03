import './blocks-list.css';

import Register from "./blocks/register/Register";
import Inc from "./blocks/inc/Inc";
import LogicOne from "./blocks/logicOne/logicOne";
import LogicZero from "./blocks/logicZero/logicZero";
import Rom from "./blocks/rom/Rom";
import GlobalSig from "./blocks/globalSig/globalSig";
import InstructionRegister from "./blocks/instructionRegister/instructionRegister";

export default function BlocksList() {
    const blocks = [
        <Register key={1} />,
        <Inc key={2} />,
        <LogicOne key={3} />,
        <LogicZero key={4} />,
        <Rom key={5} />,
        <GlobalSig key={6} />,
        <InstructionRegister key={7} />,
    ];


    return (
        <div className='blocks-list'>
            { blocks }
        </div>
    );
}