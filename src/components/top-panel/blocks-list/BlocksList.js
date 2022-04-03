import './blocks-list.css';

import Register from "./blocks/register/Register";
import Inc from "./blocks/inc/Inc";
import LogicOne from "./blocks/logicOne/logicOne";
import LogicZero from "./blocks/logicZero/logicZero";
import Rom from "./blocks/rom/Rom";
import Ram from "./blocks/ram/Ram";
import Sum from "./blocks/sum/Sum";
import GlobalSig from "./blocks/globalSig/globalSig";
import InstructionRegister from "./blocks/instructionRegister/instructionRegister";

export default function BlocksList() {
    const blocks = [
        <Register key={1} />,
        <Inc key={2} />,
        <LogicOne key={3} />,
        <LogicZero key={4} />,
        <Rom key={5} />,
        <Ram key={6} />,
        <Sum key={7} />,
        <GlobalSig key={8} />,
        <InstructionRegister key={9} />,
    ];


    return (
        <div className='blocks-list'>
            { blocks }
        </div>
    );
}