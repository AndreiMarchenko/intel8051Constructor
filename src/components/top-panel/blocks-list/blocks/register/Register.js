import './register.css'
import Block from "../Block";
import { REGISTER_BLOCK_TYPE } from "../../../../../globals/globals";

export default function Register() {
    return (
       <Block type={REGISTER_BLOCK_TYPE} />
    );
}