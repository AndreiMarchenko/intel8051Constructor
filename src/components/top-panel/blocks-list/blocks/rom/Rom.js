import './rom.css'
import Block from "../Block";
import { ROM_BLOCK_TYPE } from "../../../../../globals/globals";

export default function Rom() {
    return (
        <Block type={ROM_BLOCK_TYPE} />
    );
}