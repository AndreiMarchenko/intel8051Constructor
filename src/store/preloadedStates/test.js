export default {
    wireReducer: {
        wires: [
            {
                id: '0',
                connections: [
                    '1.q',
                    '0.en'
                ],
                payload: 1,
                path: [
                    382,
                    181,
                    470,
                    180,
                    473,
                    97,
                    544,
                    96,
                    713,
                    95
                ],
                prevPayload: 1
            },
            {
                id: '1',
                connections: [
                    '2.out',
                    '0.d'
                ],
                payload: 0,
                path: [
                    323,
                    87,
                    605,
                    71,
                    713,
                    70
                ],
                prevPayload: 0
            }
        ],
            wireConnections: [],
            activeConnection: null,
            activePath: null,
            activePathNodesCount: 1
    },
    blockReducer: {
        blocks: [
            {
                id: '0',
                type: 'register',
                name: 'Register',
                position: {
                    x: 713,
                    y: 50
                },
                connections: [
                    {
                        id: '0.d',
                        name: 'd',
                        connectedTo: '1',
                        type: 'in',
                        blockId: 0,
                        position: {
                            x: 0,
                            y: 20
                        }
                    },
                    {
                        id: '0.en',
                        name: 'en',
                        connectedTo: '0',
                        type: 'in',
                        blockId: 0,
                        position: {
                            x: 0,
                            y: 45
                        }
                    },
                    {
                        id: '0.oEn',
                        name: 'oEn',
                        connectedTo: null,
                        connectedToType: null,
                        type: 'in',
                        blockId: 0,
                        position: {
                            x: 0,
                            y: 70
                        }
                    },
                    {
                        id: '0.q',
                        name: 'q',
                        connectedTo: null,
                        connectedToType: null,
                        type: 'out',
                        blockId: 0,
                        position: {
                            x: 90,
                            y: 45
                        }
                    }
                ]
            },
            {
                id: '1',
                type: 'logic-one',
                name: '1',
                position: {
                    x: 362,
                    y: 171
                },
                connections: [
                    {
                        id: '1.q',
                        name: 'q',
                        connectedTo: '0',
                        type: 'out',
                        blockId: 1,
                        position: {
                            x: 20,
                            y: 10
                        }
                    }
                ]
            },
            {
                id: '2',
                type: 'global-sig',
                name: 'romInc',
                position: {
                    x: 263,
                    y: 57
                },
                connections: [
                    {
                        id: '2.out',
                        name: 'out',
                        connectedTo: '1',
                        type: 'out',
                        blockId: 2,
                        position: {
                            x: 60,
                            y: 30
                        }
                    }
                ]
            }
        ],
            selectedBlockId: '0',
            globalSignals: [
            {
                name: 'romInc',
                value: 0
            }
        ]
    },
    clkReducer: {
        clk: 1,
            clkState: 0,
            clkPosition: 64
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
    }
}