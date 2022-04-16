export default {
    wireReducer: {
        wires: [
            {
                id: '0',
                globalId: '0',
                connections: [
                    '4.q',
                    '3.in1'
                ],
                payload: 5,
                path: [
                    617.0009501706486,
                    601,
                    647.0011831626849,
                    600,
                    650.0011886234357,
                    677,
                    856.0015490329919,
                    683.5
                ],
                prevPayload: 5
            },
            {
                id: '1',
                globalId: '1',
                connections: [
                    '5.q',
                    '3.in2'
                ],
                payload: 5,
                path: [
                    602.0009228668943,
                    800,
                    633.0011576791809,
                    797,
                    629.0011503981798,
                    704,
                    856.0015490329919,
                    706
                ],
                prevPayload: 5
            },
            {
                id: '2',
                globalId: '2',
                connections: [
                    '0.out',
                    '1.addr'
                ],
                payload: 10,
                path: [
                    412.0003949943117,
                    222,
                    562.0010284414108,
                    220,
                    558.0010211604096,
                    120,
                    1102.0019968145618,
                    130
                ],
                prevPayload: 10
            },
            {
                id: '3',
                globalId: '2',
                connections: [
                    'wire.2.0',
                    '2.in'
                ],
                payload: 10,
                path: [
                    519.9917831229976,
                    225.62678729066823,
                    522.0009556313994,
                    467,
                    1374.0025064846418,
                    482,
                    1378.0025137656428,
                    612,
                    1713.0031089874858,
                    600
                ],
                prevPayload: 10
            },
            {
                id: '4',
                globalId: '2',
                connections: [
                    'wire.3.2',
                    '4.d'
                ],
                payload: 10,
                path: [
                    526.716344255056,
                    437.8080319164404,
                    398.00072992036405,
                    444,
                    405.00074266211607,
                    572,
                    527.0009501706486,
                    576
                ],
                prevPayload: 10
            },
            {
                id: '5',
                globalId: '2',
                connections: [
                    'wire.4.3',
                    '5.d'
                ],
                payload: 10,
                path: [
                    410.0007481199342,
                    577.0000001789446,
                    410.0007517633675,
                    775,
                    512.0009228668943,
                    775
                ],
                prevPayload: 10
            },
            {
                id: '6',
                globalId: '2',
                connections: [
                    '3.out',
                    'wire.3.4'
                ],
                payload: 10,
                path: [
                    936.0015490329919,
                    706,
                    988.0018038680319,
                    704,
                    988.0017893060297,
                    480
                ],
                prevPayload: 10
            },
            {
                id: '7',
                globalId: '2',
                connections: [
                    'wire.3.5',
                    '6.d'
                ],
                payload: 10,
                path: [
                    1083.0019622298066,
                    483,
                    1099.0020059158135,
                    702,
                    1168.0021169510808,
                    703
                ],
                prevPayload: 10
            },
            {
                id: '8',
                globalId: '2',
                connections: [
                    '6.q',
                    'wire.3.6'
                ],
                payload: 10,
                path: [
                    1258.0021169510808,
                    728,
                    1488.0027139931742,
                    730,
                    1485.015667883568,
                    613.3458039571409
                ],
                prevPayload: 10
            },
            {
                id: '9',
                globalId: '2',
                connections: [
                    '1.data',
                    'wire.3.7'
                ],
                payload: 10,
                path: [
                    1292.0019968145618,
                    220,
                    1374.0025064846418,
                    219,
                    1377.0024973833902,
                    487
                ],
                prevPayload: 10
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
                    76.00002002275313,
                    71,
                    138.00025665529012,
                    70,
                    144.00026757679183,
                    173,
                    222.0003949943117,
                    172
                ],
                prevPayload: 0
            },
            {
                id: '11',
                globalId: '11',
                connections: [
                    '8.out',
                    '0.en'
                ],
                payload: 0,
                path: [
                    80.00002730375427,
                    286,
                    222.0003949943117,
                    272
                ],
                prevPayload: 0
            },
            {
                id: '12',
                globalId: '12',
                connections: [
                    '9.out',
                    '4.en'
                ],
                payload: 0,
                path: [
                    226.0002930602958,
                    611,
                    527.0009501706486,
                    601
                ],
                prevPayload: 0
            },
            {
                id: '13',
                globalId: '13',
                connections: [
                    '10.out',
                    '5.en'
                ],
                payload: 0,
                path: [
                    231.0003021615472,
                    812,
                    512.0009228668943,
                    800
                ],
                prevPayload: 0
            },
            {
                id: '14',
                globalId: '14',
                connections: [
                    '11.out',
                    '3.oEn'
                ],
                payload: 0,
                path: [
                    752.0012505119454,
                    867,
                    802.001465301479,
                    865,
                    790.0014434584756,
                    729,
                    856.0015490329919,
                    728.5
                ],
                prevPayload: 0
            },
            {
                id: '15',
                globalId: '15',
                connections: [
                    '12.out',
                    '6.en'
                ],
                payload: 0,
                path: [
                    998.0016982935153,
                    816,
                    1049.0019149032992,
                    817,
                    1057.0019294653016,
                    730,
                    1168.0021169510808,
                    728
                ],
                prevPayload: 0
            },
            {
                id: '16',
                globalId: '16',
                connections: [
                    '13.out',
                    '6.oEn'
                ],
                payload: 0,
                path: [
                    998.0016982935153,
                    911,
                    1115.002035039818,
                    905,
                    1110.0020259385667,
                    759,
                    1168.0021169510808,
                    753
                ],
                prevPayload: 0
            },
            {
                id: '17',
                globalId: '17',
                connections: [
                    '14.out',
                    '2.en'
                ],
                payload: 0,
                path: [
                    1561.0027230944256,
                    833,
                    1644.0029979522185,
                    828,
                    1642.0029943117179,
                    650,
                    1713.0031089874858,
                    650
                ],
                prevPayload: 0
            },
            {
                id: '18',
                globalId: '18',
                connections: [
                    '15.out',
                    '1.readAddr'
                ],
                payload: 0,
                path: [
                    818.0013706484643,
                    186,
                    1102.0019968145618,
                    190
                ],
                prevPayload: 0
            },
            {
                id: '19',
                globalId: '19',
                connections: [
                    '16.out',
                    '1.en'
                ],
                payload: 0,
                path: [
                    822.0013779294653,
                    267,
                    1102.0019968145618,
                    250
                ],
                prevPayload: 0
            },
            {
                id: '20',
                globalId: '20',
                connections: [
                    '17.out',
                    '1.r/!w'
                ],
                payload: 0,
                path: [
                    822.0013779294653,
                    367,
                    1102.0019968145618,
                    310
                ],
                prevPayload: 0
            }
        ],
            wireConnections: [
            {
                position: {
                    x: 514.9917831229976,
                    y: 220.62678729066823
                },
                id: 'wire.2.0',
                wireId: '2',
                connectionIndex: 0,
                firstPartToLengthRatio: 0.6866063546658824
            },
            {
                position: {
                    x: 521.716344255056,
                    y: 432.8080319164404
                },
                id: 'wire.3.2',
                wireId: '3',
                connectionIndex: 0,
                firstPartToLengthRatio: 0.8583439823343839
            },
            {
                position: {
                    x: 405.0007481199342,
                    y: 572.0000001789446
                },
                id: 'wire.4.3',
                wireId: '4',
                connectionIndex: 4,
                firstPartToLengthRatio: 4.4736138102399694e-8
            },
            {
                position: {
                    x: 983.0017893060297,
                    y: 475
                },
                id: 'wire.3.4',
                wireId: '3',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.5410774226433859
            },
            {
                position: {
                    x: 1078.0019622298066,
                    y: 478
                },
                id: 'wire.3.5',
                wireId: '3',
                connectionIndex: 2,
                firstPartToLengthRatio: 0.6526087224318734
            },
            {
                position: {
                    x: 1480.015667883568,
                    y: 608.3458039571409
                },
                id: 'wire.3.6',
                wireId: '3',
                connectionIndex: 6,
                firstPartToLengthRatio: 0.3045163369049254
            },
            {
                position: {
                    x: 1372.0024973833902,
                    y: 482
                },
                id: 'wire.3.7',
                wireId: '3',
                connectionIndex: 4,
                firstPartToLengthRatio: 0.015377407843522742
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
                    x: 217.0003949943117,
                    y: 72
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
                        connectedTo: '2',
                        type: 'out',
                        blockId: 0,
                        position: {
                            x: 190,
                            y: 145
                        }
                    }
                ],
                payload: {
                    address: 1,
                    value: 2,
                    activeAddress: 0
                }
            },
            {
                id: '1',
                type: 'ram',
                name: 'Ram',
                position: {
                    x: 1097.0019968145618,
                    y: 70
                },
                connections: [
                    {
                        id: '1.addr',
                        name: 'addr',
                        connectedTo: '2',
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
                        connectedTo: '18',
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
                        connectedTo: '19',
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
                        connectedTo: '20',
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
                payload: {
                    address: 2,
                    value: 5,
                    activeAddress: 0
                }
            },
            {
                id: '2',
                type: 'instruction-register',
                name: 'Instr. Reg.',
                position: {
                    x: 1708.0031089874858,
                    y: 550
                },
                connections: [
                    {
                        id: '2.in',
                        name: 'in',
                        connectedTo: '3',
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
                        connectedTo: '17',
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
                type: 'sum',
                name: 'Sum',
                position: {
                    x: 851.0015490329919,
                    y: 661
                },
                connections: [
                    {
                        id: '3.in1',
                        name: 'in1',
                        connectedTo: '0',
                        type: 'in',
                        blockId: 3,
                        position: {
                            x: 0,
                            y: 17.5
                        }
                    },
                    {
                        id: '3.in2',
                        name: 'in2',
                        connectedTo: '1',
                        type: 'in',
                        blockId: 3,
                        position: {
                            x: 0,
                            y: 40
                        }
                    },
                    {
                        id: '3.oEn',
                        name: 'oEn',
                        connectedTo: '14',
                        type: 'in',
                        blockId: 3,
                        position: {
                            x: 0,
                            y: 62.5
                        }
                    },
                    {
                        id: '3.out',
                        name: 'out',
                        connectedTo: '6',
                        type: 'out',
                        blockId: 3,
                        position: {
                            x: 80,
                            y: 40
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '4',
                type: 'register',
                name: 'rvh',
                position: {
                    x: 522.0009501706486,
                    y: 551
                },
                connections: [
                    {
                        id: '4.d',
                        name: 'd',
                        connectedTo: '4',
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
                        connectedTo: '12',
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
                        connectedTo: '0',
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
                type: 'register',
                name: 'regAcc',
                position: {
                    x: 507.00092286689426,
                    y: 750
                },
                connections: [
                    {
                        id: '5.d',
                        name: 'd',
                        connectedTo: '5',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 20
                        }
                    },
                    {
                        id: '5.en',
                        name: 'en',
                        connectedTo: '13',
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 45
                        }
                    },
                    {
                        id: '5.oEn',
                        name: 'oEn',
                        connectedTo: null,
                        connectedToType: null,
                        type: 'in',
                        blockId: 5,
                        position: {
                            x: 0,
                            y: 70
                        }
                    },
                    {
                        id: '5.q',
                        name: 'q',
                        connectedTo: '1',
                        type: 'out',
                        blockId: 5,
                        position: {
                            x: 90,
                            y: 45
                        }
                    }
                ],
                payload: 0
            },
            {
                id: '6',
                type: 'register',
                name: 'accum',
                position: {
                    x: 1163.0021169510808,
                    y: 678
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
                        connectedTo: '15',
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
                        connectedTo: '16',
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
                payload: 7
            },
            {
                id: '7',
                type: 'global-sig',
                name: 'romInc',
                position: {
                    x: 11.000020022753128,
                    y: 36
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
                    x: 15.000027303754267,
                    y: 251
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
                name: 'rvhEn',
                position: {
                    x: 161.0002930602958,
                    y: 576
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
                name: 'regAccEn',
                position: {
                    x: 166.0003021615472,
                    y: 777
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
                name: 'sumEn',
                position: {
                    x: 687.0012505119454,
                    y: 832
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
                name: 'accumEn',
                position: {
                    x: 933.0016982935153,
                    y: 781
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
                name: 'accumOEn',
                position: {
                    x: 933.0016982935153,
                    y: 876
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
                name: 'instrRegEn',
                position: {
                    x: 1496.0027230944256,
                    y: 798
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
                name: 'ramReadAddr',
                position: {
                    x: 753.0013706484643,
                    y: 151
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
                name: 'ramEn',
                position: {
                    x: 757.0013779294653,
                    y: 232
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
                name: 'ramRnW',
                position: {
                    x: 757.0013779294653,
                    y: 332
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
            },
            {
                id: '18',
                type: 'control-unit',
                name: 'Control unit',
                position: {
                    x: 1647.0029979522185,
                    y: 171
                },
                connections: [],
                payload: 0
            }
        ],
            selectedBlockId: '2',
            globalSignals: [
            {
                name: 'romInc',
                blockId: '7',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            1, 11
                        ]
                    }
                ]
            },
            {
                name: 'romEn',
                blockId: '8',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: [
                            1
                        ]
                    },
                    {
                        commandCode: 1,
                        ones: [
                            2
                        ]
                    }
                ]
            },
            {
                name: 'rvhEn',
                blockId: '9',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            5
                        ]
                    }
                ]
            },
            {
                name: 'regAccEn',
                blockId: '10',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            7
                        ]
                    }
                ]
            },
            {
                name: 'sumEn',
                blockId: '11',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            9
                        ]
                    }
                ]
            },
            {
                name: 'accumEn',
                blockId: '12',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            10
                        ]
                    }
                ]
            },
            {
                name: 'accumOEn',
                blockId: '13',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            6
                        ]
                    }
                ]
            },
            {
                name: 'instrRegEn',
                blockId: '14',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: [
                            2
                        ]
                    },
                    {
                        commandCode: 1,
                        ones: []
                    }
                ]
            },
            {
                name: 'ramReadAddr',
                blockId: '15',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            3
                        ]
                    }
                ]
            },
            {
                name: 'ramEn',
                blockId: '16',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            4
                        ]
                    }
                ]
            },
            {
                name: 'ramRnW',
                blockId: '17',
                value: 0,
                commands: [
                    {
                        commandCode: 0,
                        ones: []
                    },
                    {
                        commandCode: 1,
                        ones: [
                            4
                        ]
                    }
                ]
            }
        ],
            commands: [
            {
                name: 'nope',
                commandCode: 0,
                length: 10
            },
            {
                name: 'Add A <direct>',
                commandCode: 1,
                length: 20
            }
        ],
            commandsAmount: '2'
    },
    clkReducer: {
        clk: 0,
            clkState: 0,
            clkPosition: 1
    },
    globalStateReducer: {
        globalState: 1,
            statePayload: {
            blockType: 'control-unit',
                alreadyMoving: false
        }
    },
    topPanelReducer: {
        activeBlockType: null
    },
    commandReducer: {
        currentCommand: 1,
            isCommandModalOpened: false,
            commandLength: 0,
            commandCode: 11111111
    }
}