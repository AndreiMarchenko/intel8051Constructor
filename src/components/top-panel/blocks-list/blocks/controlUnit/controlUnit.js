import './controlUnit.css'
import Block from "../Block";
import { CONTROL_UNIT_BLOCK_TYPE } from "../../../../../globals/globals";

export default function ControlUnit() {
    return (
       <Block type={CONTROL_UNIT_BLOCK_TYPE} />
    );
}