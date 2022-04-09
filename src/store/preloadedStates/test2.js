export default {
    wireReducer: {
        wires: [
            {
                id: '0',
                connections: [
                    '2.out',
                    '0.inc'
                ],
                payload: 'z',
                path: [
                    633,
                    125,
                    788,
                    110
                ],
                prevPayload: 0
            },
            {
                id: '1',
                connections: [
                    '3.out',
                    '0.en'
                ],
                payload: 'z',
                path: [
                    651,
                    228,
                    788,
                    210
                ],
                prevPayload: 0
            },
            {
                id: '2',
                connections: [
                    '0.out',
                    '1.in'
                ],
                payload: 'z',
                path: [
                    978,
                    160,
                    1058,
                    162,
                    1034,
                    362,
                    491,
                    330,
                    447,
                    134,
                    100,
                    151,
                    125,
                    253,
                    258,
                    251
                ],
                prevPayload: 'test123'
            },
            {
                id: '3',
                connections: [
                    '4.out',
                    '1.en'
                ],
                payload: 'z',
                path: [
                    130,
                    308,
                    258,
                    301
                ],
                prevPayload: 0
            },
            {
                id: '4',
                connections: [
                    'wire.2.0',
                    '5.data'
                ],
                payload: 'z',
                path: [
                    927,
                    356,
                    929,
                    507,
                    1628,
                    520,
                    1617,
                    203,
                    1485,
                    203
                ]
            },
            {
                id: '5',
                connections: [
                    'wire.2.wire.2.01',
                    '5.addr'
                ],
                payload: 'z',
                path: [
                    1051,
                    210,
                    1099,
                    211,
                    1109,
                    121,
                    1295,
                    113
                ]
            },
            {
                id: '6',
                connections: [
                    '6.out',
                    '5.readAddr'
                ],
                payload: 'z',
                path: [
                    1131,
                    50,
                    1184,
                    54,
                    1198,
                    175,
                    1295,
                    173
                ]
            },
            {
                id: '7',
                connections: [
                    '7.out',
                    '5.en'
                ],
                payload: 'z',
                path: [
                    1145,
                    275,
                    1176,
                    274,
                    1179,
                    237,
                    1295,
                    233
                ]
            },
            {
                id: '8',
                connections: [
                    '8.out',
                    '5.r/!w'
                ],
                payload: 'z',
                path: [
                    1145,
                    401,
                    1207,
                    401,
                    1211,
                    300,
                    1295,
                    293
                ]
            }
        ],
            wireConnections: [
            {
                position: {
                    x: 927,
                    y: 356
                },
                id: 'wire.2.0',
                wireId: '2',
                connectionIndex: 4,
                firstPartToLengthRatio: 0.19702114203469398
            },
            {
                position: {
                    x: 1051,
                    y: 210
                },
                id: 'wire.2.wire.2.01',
                wireId: '2',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.24081101468776855
            }
        ],
            activeConnection: null,
            activePath: null,
            activePathNodesCount: 1
    },
    blockReducer: {
        blocks: [
            {
                id: '0',
                type: 'rom',
                name: 'Rom',
                position: {
                    x: 788,
                    y: 15
                },
                connections: [
                    {
                        id: '0.inc',
                        name: 'inc',
                        connectedTo: '0',
                        type: 'in',
                        blockId: 0,
                        position: {
                            x: 0,
                            y: 95
                        }
                    },
                    {
                        id: '0.en',
                        name: 'en',
                        connectedTo: '1',
                        type: 'in',
                        blockId: 0,
                        position: {
                            x: 0,
                            y: 195
                        }
                    },
                    {
                        id: '0.out',
                        name: 'out',
                        connectedTo: '2',
                        type: 'out',
                        blockId: 0,
                        position: {
                            x: 190,
                            y: 145
                        }
                    }
                ]
            },
            {
                id: '1',
                type: 'instruction-register',
                name: 'Instr. Reg.',
                position: {
                    x: 258,
                    y: 206
                },
                connections: [
                    {
                        id: '1.in',
                        name: 'in',
                        connectedTo: '2',
                        type: 'in',
                        blockId: 1,
                        position: {
                            x: 0,
                            y: 45
                        }
                    },
                    {
                        id: '1.en',
                        name: 'en',
                        connectedTo: '3',
                        type: 'in',
                        blockId: 1,
                        position: {
                            x: 0,
                            y: 95
                        }
                    }
                ]
            },
            {
                id: '2',
                type: 'global-sig',
                name: 'romInc',
                position: {
                    x: 573,
                    y: 95
                },
                connections: [
                    {
                        id: '2.out',
                        name: 'out',
                        connectedTo: '0',
                        type: 'out',
                        blockId: 2,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ]
            },
            {
                id: '3',
                type: 'global-sig',
                name: 'romEn',
                position: {
                    x: 591,
                    y: 198
                },
                connections: [
                    {
                        id: '3.out',
                        name: 'out',
                        connectedTo: '1',
                        type: 'out',
                        blockId: 3,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ]
            },
            {
                id: '4',
                type: 'global-sig',
                name: 'instRegEn',
                position: {
                    x: 70,
                    y: 278
                },
                connections: [
                    {
                        id: '4.out',
                        name: 'out',
                        connectedTo: '3',
                        type: 'out',
                        blockId: 4,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ]
            },
            {
                id: '5',
                type: 'ram',
                name: 'Ram',
                position: {
                    x: 1295,
                    y: 58
                },
                connections: [
                    {
                        id: '5.addr',
                        name: 'addr',
                        connectedTo: '5',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 55
                        }
                    },
                    {
                        id: '5.readAddr',
                        name: 'readAddr',
                        connectedTo: '6',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 115
                        }
                    },
                    {
                        id: '5.en',
                        name: 'en',
                        connectedTo: '7',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 175
                        }
                    },
                    {
                        id: '5.r/!w',
                        name: 'r/!w',
                        connectedTo: '8',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 235
                        }
                    },
                    {
                        id: '5.data',
                        name: 'data',
                        connectedTo: '4',
                        type: 'inout',
                        blockId: 5,
                        position: {
                            x: 190,
                            y: 145
                        }
                    }
                ]
            },
            {
                id: '6',
                type: 'global-sig',
                name: 'ramRdAddr',
                position: {
                    x: 1071,
                    y: 20
                },
                connections: [
                    {
                        id: '6.out',
                        name: 'out',
                        connectedTo: '6',
                        type: 'out',
                        blockId: 6,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ]
            },
            {
                id: '7',
                type: 'global-sig',
                name: 'ramEn',
                position: {
                    x: 1085,
                    y: 245
                },
                connections: [
                    {
                        id: '7.out',
                        name: 'out',
                        connectedTo: '7',
                        type: 'out',
                        blockId: 7,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ]
            },
            {
                id: '8',
                type: 'global-sig',
                name: 'ramRnW',
                position: {
                    x: 1085,
                    y: 371
                },
                connections: [
                    {
                        id: '8.out',
                        name: 'out',
                        connectedTo: '8',
                        type: 'out',
                        blockId: 8,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ]
            }
        ],
            selectedBlockId: '8',
            globalSignals: [
            {
                name: 'romInc',
                value: 0
            },
            {
                name: 'romEn',
                value: 1
            },
            {
                name: 'instRegEn',
                value: 0
            },
            {
                name: 'ramEn',
                value: 0,
            },
            {
                name: 'ramRdAddr',
                value: 0,
            },
            {
                name: 'ramRnW',
                value: 0,
            },
        ]
    },
    clkReducer: {
        clk: 0,
            clkState: 0,
            clkPosition: 1
    },
    globalStateReducer: {
        globalState: 1,
            statePayload: {
            blockType: 'global-sig',
                alreadyMoving: false
        }
    },
    topPanelReducer: {
        activeBlockType: null
    },
    commandReducer: {
        currentCommand: '0000000'
    }
};