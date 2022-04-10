import './globalSig.css'
import Block from "../Block";
import { GLOBAL_SIG_BLOCK_TYPE } from "../../../../../globals/globals";

export default function GlobalSig() {
    return (
        <Block type={GLOBAL_SIG_BLOCK_TYPE} />
    );
}