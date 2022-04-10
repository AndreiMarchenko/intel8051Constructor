import registerConnections from '../components/field/logic-blocks/register/connections';
import incConnections from '../components/field/logic-blocks/inc/connections';
import logicOneConnections from '../components/field/logic-blocks/logic-one/connections';
import logicZeroConnections from '../components/field/logic-blocks/logic-zero/connections';
import RomConnections from '../components/field/logic-blocks/rom/connections';
import RamConnections from '../components/field/logic-blocks/ram/connections';
import SumConnections from '../components/field/logic-blocks/sum/connections';
import globalSigConnections from '../components/field/logic-blocks/global-sig/connections';
import instructionRegisterConnections from '../components/field/logic-blocks/instruction-register/connections';

import {
    REGISTER_BLOCK_TYPE,
    INC_BLOCK_TYPE,
    LOGIC_ONE_BLOCK_TYPE,
    LOGIC_ZERO_BLOCK_TYPE,
    ROM_BLOCK_TYPE,
    RAM_BLOCK_TYPE,
    SUM_BLOCK_TYPE,
    GLOBAL_SIG_BLOCK_TYPE,
    INSTRUCTION_REGISTER_BLOCK_TYPE,
} from "../globals/globals";


export default function(type, id) {
    switch(type.toLowerCase()) {
        case REGISTER_BLOCK_TYPE:
            return registerConnections(id);
        case INC_BLOCK_TYPE:
            return incConnections(id);
        case LOGIC_ONE_BLOCK_TYPE:
            return logicOneConnections(id);
        case LOGIC_ZERO_BLOCK_TYPE:
            return logicZeroConnections(id);
        case ROM_BLOCK_TYPE:
            return RomConnections(id);
        case RAM_BLOCK_TYPE:
            return RamConnections(id);
        case SUM_BLOCK_TYPE:
            return SumConnections(id);
        case GLOBAL_SIG_BLOCK_TYPE:
            return globalSigConnections(id);
        case INSTRUCTION_REGISTER_BLOCK_TYPE:
            return instructionRegisterConnections(id);
    }
}