import './ram.css'
import Block from "../Block";
import { RAM_BLOCK_TYPE } from "../../../../../globals/globals";

export default function Ram() {
    return (
        <Block type={RAM_BLOCK_TYPE} />
    );
}