export const TOP_PANEL_WIDTH = window.innerWidth;
export const TOP_PANEL_HEIGHT = 80;

export const SIDEBAR_WIDTH = 170;

export const CLK_PANEL_WIDTH = window.innerWidth ;
export const CLK_PANEL_HEIGHT = 70;

export const FIELD_WIDTH = window.innerWidth - SIDEBAR_WIDTH;
export const FIELD_HEIGHT = window.innerHeight - TOP_PANEL_HEIGHT - CLK_PANEL_HEIGHT;

export const BLOCK_CONNECTION_SIZE = 10;
export const WIRE_CONNECTION_SIZE = 10;

export const REGISTER_BLOCK_TYPE = 'register';
export const REGISTER_BLOCK_WIDTH = 100;
export const REGISTER_BLOCK_HEIGHT = 100;
export const REGISTER_BLOCK_COLOR = 'red';

export const INC_BLOCK_TYPE = 'inc';
export const INC_BLOCK_WIDTH = 70;
export const INC_BLOCK_HEIGHT = 70;
export const INC_BLOCK_COLOR = 'blue';

export const LOGIC_ONE_BLOCK_TYPE = 'logic-one';
export const LOGIC_ONE_BLOCK_WIDTH = 30;
export const LOGIC_ONE_BLOCK_HEIGHT = 30;
export const LOGIC_ONE_BLOCK_COLOR = 'yellow';

export const LOGIC_ZERO_BLOCK_TYPE = 'logic-zero';
export const LOGIC_ZERO_BLOCK_WIDTH = 30;
export const LOGIC_ZERO_BLOCK_HEIGHT = 30;
export const LOGIC_ZERO_BLOCK_COLOR = 'green';

export const ROM_BLOCK_TYPE = 'rom';
export const ROM_BLOCK_WIDTH = 200;
export const ROM_BLOCK_HEIGHT = 300;
export const ROM_BLOCK_COLOR = 'orange';

export const RAM_BLOCK_TYPE = 'ram';
export const RAM_BLOCK_WIDTH = 200;
export const RAM_BLOCK_HEIGHT = 300;
export const RAM_BLOCK_COLOR = 'teal';

export const SUM_BLOCK_TYPE = 'sum';
export const SUM_BLOCK_WIDTH = 90;
export const SUM_BLOCK_HEIGHT = 90;
export const SUM_BLOCK_COLOR = 'wheat';

export const GLOBAL_SIG_BLOCK_TYPE = 'global-sig';
export const GLOBAL_SIG_BLOCK_WIDTH = 70;
export const GLOBAL_SIG_BLOCK_HEIGHT = 70;
export const GLOBAL_SIG_BLOCK_COLOR = 'purple';

export const CONTROL_UNIT_BLOCK_TYPE = 'control-unit';
export const CONTROL_UNIT_BLOCK_WIDTH = 150;
export const CONTROL_UNIT_BLOCK_HEIGHT = 200;
export const CONTROL_UNIT_BLOCK_COLOR = 'slateGray';

export const INSTRUCTION_REGISTER_BLOCK_TYPE = 'instruction-register';
export const INSTRUCTION_REGISTER_BLOCK_WIDTH = 150;
export const INSTRUCTION_REGISTER_BLOCK_HEIGHT = 150;
export const INSTRUCTION_REGISTER_BLOCK_COLOR = 'coral';


export const BLOCK_SIZES = {
    [REGISTER_BLOCK_TYPE]: {
        height: REGISTER_BLOCK_HEIGHT,
        width: REGISTER_BLOCK_WIDTH,
    },
    [INC_BLOCK_TYPE]: {
        height: INC_BLOCK_HEIGHT,
        width: INC_BLOCK_WIDTH,
    },
    [LOGIC_ONE_BLOCK_TYPE]: {
        height: LOGIC_ONE_BLOCK_HEIGHT,
        width: LOGIC_ONE_BLOCK_WIDTH,
    },
    [LOGIC_ZERO_BLOCK_TYPE]: {
        height: LOGIC_ZERO_BLOCK_HEIGHT,
        width: LOGIC_ZERO_BLOCK_WIDTH,
    },
    [ROM_BLOCK_TYPE]: {
        height: ROM_BLOCK_HEIGHT,
        width: ROM_BLOCK_WIDTH,
    },
    [RAM_BLOCK_TYPE]: {
        height: RAM_BLOCK_HEIGHT,
        width: RAM_BLOCK_WIDTH,
    },
    [SUM_BLOCK_TYPE]: {
        height: SUM_BLOCK_HEIGHT,
        width: SUM_BLOCK_WIDTH,
    },
    [GLOBAL_SIG_BLOCK_TYPE]: {
        height: GLOBAL_SIG_BLOCK_HEIGHT,
        width: GLOBAL_SIG_BLOCK_WIDTH,
    },
    [CONTROL_UNIT_BLOCK_TYPE]: {
        height: CONTROL_UNIT_BLOCK_HEIGHT,
        width: CONTROL_UNIT_BLOCK_WIDTH,
    },
    [INSTRUCTION_REGISTER_BLOCK_TYPE]: {
        height: INSTRUCTION_REGISTER_BLOCK_HEIGHT,
        width: INSTRUCTION_REGISTER_BLOCK_WIDTH,
    },
};

export const BLOCK_TYPE_NAME_MAP = {
    [REGISTER_BLOCK_TYPE]: 'Register',
    [INC_BLOCK_TYPE]: 'inc',
    [LOGIC_ONE_BLOCK_TYPE]: '1',
    [LOGIC_ZERO_BLOCK_TYPE]: '0',
    [ROM_BLOCK_TYPE]: 'Rom',
    [RAM_BLOCK_TYPE]: 'Ram',
    [SUM_BLOCK_TYPE]: 'Sum',
    [GLOBAL_SIG_BLOCK_TYPE]: 'Sig',
    [CONTROL_UNIT_BLOCK_TYPE]: 'Control unit',
    [INSTRUCTION_REGISTER_BLOCK_TYPE]: 'Instr. Reg.',
};

