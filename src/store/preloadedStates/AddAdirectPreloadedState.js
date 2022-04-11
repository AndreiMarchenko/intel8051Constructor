export default {
    wireReducer: {
        wires: [
            {
                id: '0',
                globalId: '0',
                connections: [
                    '0.out',
                    '1.addr'
                ],
                payload: 'z',
                path: [
                    354.00028941979525,
                    195,
                    499.0009137656428,
                    200,
                    498.0009119453925,
                    108,
                    963.0017437997725,
                    110
                ]
            },
            {
                id: '1',
                globalId: '0',
                connections: [
                    'wire.0.0',
                    '2.in'
                ],
                payload: 'z',
                path: [
                    464.7450610288844,
                    203.64635573419577,
                    457.00083731513087,
                    520,
                    1503.0027267349262,
                    527
                ]
            },
            {
                id: '2',
                globalId: '0',
                connections: [
                    'wire.1.2',
                    '3.d'
                ],
                payload: 'z',
                path: [
                    463.00082220429516,
                    525.0066920473997,
                    462.0008464163823,
                    604,
                    548.0009883959044,
                    606
                ]
            },
            {
                id: '3',
                globalId: '0',
                connections: [
                    'wire.2.3',
                    '4.d'
                ],
                payload: 'z',
                path: [
                    468.41468285553304,
                    609.0328798629074,
                    465.00085187713313,
                    772,
                    546.0009847554039,
                    770
                ]
            },
            {
                id: '4',
                globalId: '4',
                connections: [
                    '3.q',
                    '5.in1'
                ],
                payload: 'z',
                path: [
                    638.0009883959044,
                    631,
                    708.0012941979522,
                    629,
                    708.0012941979522,
                    687,
                    797.0014416382254,
                    689.5
                ]
            },
            {
                id: '5',
                globalId: '5',
                connections: [
                    '4.q',
                    '5.in2'
                ],
                payload: 'z',
                path: [
                    636.0009847554039,
                    795,
                    692.0012650739477,
                    795,
                    692.0012650739477,
                    710,
                    797.0014416382254,
                    712
                ]
            },
            {
                id: '6',
                globalId: '0',
                connections: [
                    '5.out',
                    'wire.1.4'
                ],
                payload: 'z',
                path: [
                    877.0014416382254,
                    712,
                    917.0016746302617,
                    712,
                    923.0011094581788,
                    528.0850822906174
                ]
            },
            {
                id: '7',
                globalId: '0',
                connections: [
                    'wire.1.5',
                    '6.d'
                ],
                payload: 'z',
                path: [
                    1012.0122438022798,
                    528.6807580219054,
                    1015.0018530147896,
                    682,
                    1091.0019767918088,
                    683
                ]
            },
            {
                id: '8',
                globalId: '0',
                connections: [
                    '6.q',
                    'wire.1.6'
                ],
                payload: 'z',
                path: [
                    1181.0019767918088,
                    708,
                    1252.002284414107,
                    705,
                    1247.0006062749799,
                    530.2533350448983
                ]
            },
            {
                id: '9',
                globalId: '0',
                connections: [
                    '1.data',
                    'wire.1.7'
                ],
                payload: 'z',
                path: [
                    1153.0017437997726,
                    200,
                    1304.0023790671219,
                    200,
                    1329.9973762771072,
                    530.8087617567346
                ]
            },
            {
                id: '10',
                globalId: '10',
                connections: [
                    '7.out',
                    '0.inc'
                ],
                payload: 0,
                path: [
                    75.00001820250284,
                    48,
                    117.00021843003414,
                    47,
                    115.00021478953357,
                    144,
                    164.00028941979525,
                    145
                ]
            },
            {
                id: '11',
                globalId: '11',
                connections: [
                    '8.out',
                    '0.en'
                ],
                payload: 1,
                path: [
                    73.00001456200228,
                    248,
                    164.00028941979525,
                    245
                ]
            },
            {
                id: '12',
                globalId: '12',
                connections: [
                    '9.out',
                    '1.readAddr'
                ],
                payload: 0,
                path: [
                    728.0012068259385,
                    161,
                    963.0017437997725,
                    170
                ]
            },
            {
                id: '13',
                globalId: '13',
                connections: [
                    '10.out',
                    '1.en'
                ],
                payload: 0,
                path: [
                    731.0012122866895,
                    247,
                    963.0017437997725,
                    230
                ]
            },
            {
                id: '14',
                globalId: '14',
                connections: [
                    '11.out',
                    '1.r/!w'
                ],
                payload: 0,
                path: [
                    736.0012213879409,
                    347,
                    963.0017437997725,
                    290
                ]
            },
            {
                id: '15',
                globalId: '15',
                connections: [
                    '12.out',
                    '3.en'
                ],
                payload: 0,
                path: [
                    277.0003858930603,
                    633,
                    548.0009883959044,
                    631
                ]
            },
            {
                id: '16',
                globalId: '16',
                connections: [
                    '13.out',
                    '4.en'
                ],
                payload: 0,
                path: [
                    280.00039135381115,
                    795,
                    546.0009847554039,
                    795
                ]
            },
            {
                id: '17',
                globalId: '17',
                connections: [
                    '14.out',
                    '6.en'
                ],
                payload: 0,
                path: [
                    927.0015690557452,
                    822,
                    985.0017984072811,
                    823,
                    984.0017965870308,
                    710,
                    1091.0019767918088,
                    708
                ]
            },
            {
                id: '18',
                globalId: '18',
                connections: [
                    '15.out',
                    '6.oEn'
                ],
                payload: 0,
                path: [
                    930.001574516496,
                    913,
                    1028.0018766780433,
                    912,
                    1028.0018766780433,
                    737,
                    1091.0019767918088,
                    733
                ]
            },
            {
                id: '19',
                globalId: '19',
                connections: [
                    '16.out',
                    '2.en'
                ],
                payload: 0,
                path: [
                    1355.002348122867,
                    668,
                    1415.0025811149033,
                    665,
                    1409.0025701934017,
                    577,
                    1503.0027267349262,
                    577
                ]
            },
            {
                id: '20',
                globalId: '20',
                connections: [
                    '17.out',
                    '5.oEn'
                ],
                payload: 'z',
                path: [
                    631.001030261661,
                    923,
                    718.001312400455,
                    924,
                    722.0013196814563,
                    737,
                    797.0014416382254,
                    734.5
                ]
            }
        ],
            wireConnections: [
            {
                position: {
                    x: 459.7450610288844,
                    y: 198.64635573419577
                },
                id: 'wire.0.0',
                wireId: '0',
                connectionIndex: 0,
                firstPartToLengthRatio: 0.7292711468391508
            },
            {
                position: {
                    x: 458.00082220429516,
                    y: 520.0066920473997
                },
                id: 'wire.1.2',
                wireId: '1',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.0009560067713825812
            },
            {
                position: {
                    x: 463.41468285553304,
                    y: 604.0328798629074
                },
                id: 'wire.2.3',
                wireId: '2',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.016439931453687873
            },
            {
                position: {
                    x: 918.0011094581788,
                    y: 523.0850822906174
                },
                id: 'wire.1.4',
                wireId: '1',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.44072604151676936
            },
            {
                position: {
                    x: 1007.0122438022798,
                    y: 523.6807580219054
                },
                id: 'wire.1.5',
                wireId: '1',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.5258225745579042
            },
            {
                position: {
                    x: 1242.0006062749799,
                    y: 525.2533350448983
                },
                id: 'wire.1.6',
                wireId: '1',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.7504764349854846
            },
            {
                position: {
                    x: 1324.9973762771072,
                    y: 525.8087617567346
                },
                id: 'wire.1.7',
                wireId: '1',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.8298231081049419
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
                    x: 159.00028941979525,
                    y: 45
                },
                connections: [
                    {
                        id: '0.inc',
                        name: 'inc',
                        connectedTo: '10',
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
                        connectedTo: '11',
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
                        connectedTo: '0',
                        type: 'out',
                        blockId: 0,
                        position: {
                            x: 190,
                            y: 145
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '1',
                type: 'ram',
                name: 'Ram',
                position: {
                    x: 958.0017437997725,
                    y: 50
                },
                connections: [
                    {
                        id: '1.addr',
                        name: 'addr',
                        connectedTo: '0',
                        type: 'in',
                        blockId: 1,
                        position: {
                            x: 0,
                            y: 55
                        }
                    },
                    {
                        id: '1.readAddr',
                        name: 'readAddr',
                        connectedTo: '12',
                        type: 'in',
                        blockId: 1,
                        position: {
                            x: 0,
                            y: 115
                        }
                    },
                    {
                        id: '1.en',
                        name: 'en',
                        connectedTo: '13',
                        type: 'in',
                        blockId: 1,
                        position: {
                            x: 0,
                            y: 175
                        }
                    },
                    {
                        id: '1.r/!w',
                        name: 'r/!w',
                        connectedTo: '14',
                        type: 'in',
                        blockId: 1,
                        position: {
                            x: 0,
                            y: 235
                        }
                    },
                    {
                        id: '1.data',
                        name: 'data',
                        connectedTo: '9',
                        type: 'inout',
                        blockId: 1,
                        position: {
                            x: 190,
                            y: 145
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '2',
                type: 'instruction-register',
                name: 'Instr. Reg.',
                position: {
                    x: 1498.0027267349262,
                    y: 477
                },
                connections: [
                    {
                        id: '2.in',
                        name: 'in',
                        connectedTo: '1',
                        type: 'in',
                        blockId: 2,
                        position: {
                            x: 0,
                            y: 45
                        }
                    },
                    {
                        id: '2.en',
                        name: 'en',
                        connectedTo: '19',
                        type: 'in',
                        blockId: 2,
                        position: {
                            x: 0,
                            y: 95
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '3',
                type: 'register',
                name: 'rvh',
                position: {
                    x: 543.0009883959044,
                    y: 581
                },
                connections: [
                    {
                        id: '3.d',
                        name: 'd',
                        connectedTo: '2',
                        type: 'in',
                        blockId: 3,
                        position: {
                            x: 0,
                            y: 20
                        }
                    },
                    {
                        id: '3.en',
                        name: 'en',
                        connectedTo: '15',
                        type: 'in',
                        blockId: 3,
                        position: {
                            x: 0,
                            y: 45
                        }
                    },
                    {
                        id: '3.oEn',
                        name: 'oEn',
                        connectedTo: null,
                        connectedToType: null,
                        type: 'in',
                        blockId: 3,
                        position: {
                            x: 0,
                            y: 70
                        }
                    },
                    {
                        id: '3.q',
                        name: 'q',
                        connectedTo: '4',
                        type: 'out',
                        blockId: 3,
                        position: {
                            x: 90,
                            y: 45
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '4',
                type: 'register',
                name: 'regAcc',
                position: {
                    x: 541.0009847554039,
                    y: 745
                },
                connections: [
                    {
                        id: '4.d',
                        name: 'd',
                        connectedTo: '3',
                        type: 'in',
                        blockId: 4,
                        position: {
                            x: 0,
                            y: 20
                        }
                    },
                    {
                        id: '4.en',
                        name: 'en',
                        connectedTo: '16',
                        type: 'in',
                        blockId: 4,
                        position: {
                            x: 0,
                            y: 45
                        }
                    },
                    {
                        id: '4.oEn',
                        name: 'oEn',
                        connectedTo: null,
                        connectedToType: null,
                        type: 'in',
                        blockId: 4,
                        position: {
                            x: 0,
                            y: 70
                        }
                    },
                    {
                        id: '4.q',
                        name: 'q',
                        connectedTo: '5',
                        type: 'out',
                        blockId: 4,
                        position: {
                            x: 90,
                            y: 45
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '5',
                type: 'sum',
                name: 'Sum',
                position: {
                    x: 792.0014416382254,
                    y: 667
                },
                connections: [
                    {
                        id: '5.in1',
                        name: 'in1',
                        connectedTo: '4',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 17.5
                        }
                    },
                    {
                        id: '5.in2',
                        name: 'in2',
                        connectedTo: '5',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 40
                        }
                    },
                    {
                        id: '5.oEn',
                        name: 'oEn',
                        connectedTo: '20',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 62.5
                        }
                    },
                    {
                        id: '5.out',
                        name: 'out',
                        connectedTo: '6',
                        type: 'out',
                        blockId: 5,
                        position: {
                            x: 80,
                            y: 40
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '6',
                type: 'register',
                name: 'Accum',
                position: {
                    x: 1086.0019767918088,
                    y: 658
                },
                connections: [
                    {
                        id: '6.d',
                        name: 'd',
                        connectedTo: '7',
                        type: 'in',
                        blockId: 6,
                        position: {
                            x: 0,
                            y: 20
                        }
                    },
                    {
                        id: '6.en',
                        name: 'en',
                        connectedTo: '17',
                        type: 'in',
                        blockId: 6,
                        position: {
                            x: 0,
                            y: 45
                        }
                    },
                    {
                        id: '6.oEn',
                        name: 'oEn',
                        connectedTo: '18',
                        type: 'in',
                        blockId: 6,
                        position: {
                            x: 0,
                            y: 70
                        }
                    },
                    {
                        id: '6.q',
                        name: 'q',
                        connectedTo: '8',
                        type: 'out',
                        blockId: 6,
                        position: {
                            x: 90,
                            y: 45
                        }
                    }
                ],
                payload: '3'
            },
            {
                id: '7',
                type: 'global-sig',
                name: 'romInc',
                position: {
                    x: 10.000018202502844,
                    y: 13
                },
                connections: [
                    {
                        id: '7.out',
                        name: 'out',
                        connectedTo: '10',
                        type: 'out',
                        blockId: 7,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '8',
                type: 'global-sig',
                name: 'romEn',
                position: {
                    x: 8.000014562002276,
                    y: 213
                },
                connections: [
                    {
                        id: '8.out',
                        name: 'out',
                        connectedTo: '11',
                        type: 'out',
                        blockId: 8,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '9',
                type: 'global-sig',
                name: 'ramRdAddr',
                position: {
                    x: 663.0012068259385,
                    y: 126
                },
                connections: [
                    {
                        id: '9.out',
                        name: 'out',
                        connectedTo: '12',
                        type: 'out',
                        blockId: 9,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '10',
                type: 'global-sig',
                name: 'ramEn',
                position: {
                    x: 666.0012122866895,
                    y: 212
                },
                connections: [
                    {
                        id: '10.out',
                        name: 'out',
                        connectedTo: '13',
                        type: 'out',
                        blockId: 10,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '11',
                type: 'global-sig',
                name: 'ramRnW',
                position: {
                    x: 671.0012213879409,
                    y: 312
                },
                connections: [
                    {
                        id: '11.out',
                        name: 'out',
                        connectedTo: '14',
                        type: 'out',
                        blockId: 11,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '12',
                type: 'global-sig',
                name: 'rvhEn',
                position: {
                    x: 212.0003858930603,
                    y: 598
                },
                connections: [
                    {
                        id: '12.out',
                        name: 'out',
                        connectedTo: '15',
                        type: 'out',
                        blockId: 12,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '13',
                type: 'global-sig',
                name: 'regAccEn',
                position: {
                    x: 215.00039135381115,
                    y: 760
                },
                connections: [
                    {
                        id: '13.out',
                        name: 'out',
                        connectedTo: '16',
                        type: 'out',
                        blockId: 13,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '14',
                type: 'global-sig',
                name: 'accumEn',
                position: {
                    x: 862.0015690557452,
                    y: 787
                },
                connections: [
                    {
                        id: '14.out',
                        name: 'out',
                        connectedTo: '17',
                        type: 'out',
                        blockId: 14,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '15',
                type: 'global-sig',
                name: 'accumOEn',
                position: {
                    x: 865.001574516496,
                    y: 878
                },
                connections: [
                    {
                        id: '15.out',
                        name: 'out',
                        connectedTo: '18',
                        type: 'out',
                        blockId: 15,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '16',
                type: 'global-sig',
                name: 'instRegEn',
                position: {
                    x: 1290.002348122867,
                    y: 633
                },
                connections: [
                    {
                        id: '16.out',
                        name: 'out',
                        connectedTo: '19',
                        type: 'out',
                        blockId: 16,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '17',
                type: 'global-sig',
                name: 'sumEn',
                position: {
                    x: 566.001030261661,
                    y: 888
                },
                connections: [
                    {
                        id: '17.out',
                        name: 'out',
                        connectedTo: '20',
                        type: 'out',
                        blockId: 17,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ],
                payload: 0
            }
        ],
            selectedBlockId: null,
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
                value: 0
            },
            {
                name: 'ramRdAddr',
                value: 0
            },
            {
                name: 'ramRnW',
                value: 0
            },
            {
                name: 'regAccEn',
                value: 0
            },
            {
                name: 'regAccOEn',
                value: 0
            },
            {
                name: 'rvhEn',
                value: 0
            },
            {
                name: 'rvhOEn',
                value: 0
            },
            {
                name: 'sumEn',
                value: 0
            },
            {
                name: 'accumEn',
                value: 0
            },
            {
                name: 'accumOEn',
                value: 0
            }
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
}