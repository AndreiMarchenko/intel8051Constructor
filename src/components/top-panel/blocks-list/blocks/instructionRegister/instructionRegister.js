import './instructionRegister.css'
import Block from "../Block";
import { INSTRUCTION_REGISTER_BLOCK_TYPE } from "../../../../../globals/globals";

export default function InstructionRegister() {
    return (
        <Block type={INSTRUCTION_REGISTER_BLOCK_TYPE} />
    );
}