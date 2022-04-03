import registerConnections from '../components/field/logic-blocks/register/connections';
import incConnections from '../components/field/logic-blocks/inc/connections';
import logicOneConnections from '../components/field/logic-blocks/logic-one/connections';
import logicZeroConnections from '../components/field/logic-blocks/logic-zero/connections';
import RomConnections from '../components/field/logic-blocks/rom/connections';
import RamConnections from '../components/field/logic-blocks/ram/connections';
import globalSigConnections from '../components/field/logic-blocks/global-sig/connections';
import instructionRegisterConnections from '../components/field/logic-blocks/instruction-register/connections';

export default function(type, id) {
    switch(type.toLowerCase()) {
        case 'register':
            return registerConnections(id);
        case 'inc':
            return incConnections(id);
        case 'logic-one':
            return logicOneConnections(id);
        case 'logic-zero':
            return logicZeroConnections(id);
        case 'rom':
            return RomConnections(id);
        case 'ram':
            return RamConnections(id);
        case 'global-sig':
            return globalSigConnections(id);
        case 'instruction-register':
            return instructionRegisterConnections(id);
    }
}