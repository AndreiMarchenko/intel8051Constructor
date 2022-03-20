import registerConnections from '../components/field/logic-blocks/register/connections';
import incConnections from '../components/field/logic-blocks/inc/connections';
import logicOneConnections from '../components/field/logic-blocks/logic-one/connections';
import logicZeroConnections from '../components/field/logic-blocks/logic-zero/connections';

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
    }
}