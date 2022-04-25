export default {
    "wireReducer": {
        "wires": [{
            "id": "0",
            "globalId": "0",
            "connections": ["5.out", "0.inc"],
            "payload": 0,
            "path": [138.00013287827076, 201, 319.00057155858934, 200],
            "prevPayload": 0
        }, {
            "id": "1",
            "globalId": "1",
            "connections": ["6.out", "0.en"],
            "payload": 0,
            "path": [140.00013651877134, 305, 319.00057155858934, 300],
            "prevPayload": 0
        }, {
            "id": "2",
            "globalId": "2",
            "connections": ["7.out", "1.readAddr"],
            "payload": 0,
            "path": [796.001330602958, 246, 951.0017219567692, 228],
            "prevPayload": 0
        }, {
            "id": "3",
            "globalId": "3",
            "connections": ["8.out", "1.en"],
            "payload": 0,
            "path": [797.0013324232082, 331, 951.0017219567692, 288],
            "prevPayload": 0
        }, {
            "id": "4",
            "globalId": "4",
            "connections": ["9.out", "1.r/!w"],
            "payload": 0,
            "path": [800.0013378839591, 417, 951.0017219567692, 348],
            "prevPayload": 0
        }, {
            "id": "5",
            "globalId": "5",
            "connections": ["0.out", "1.addr"],
            "payload": 8,
            "path": [509.00057155858934, 250, 608.0011121729239, 249, 608.0011121729239, 170, 951.0017219567692, 168],
            "prevPayload": 8
        }, {
            "id": "6",
            "globalId": "6",
            "connections": ["11.out", "2.en"],
            "payload": 0,
            "path": [321.00046598407283, 692, 704.0012723549488, 681],
            "prevPayload": 0
        }, {
            "id": "7",
            "globalId": "7",
            "connections": ["12.out", "2.oEn"],
            "payload": 0,
            "path": [323.0004696245734, 786, 405.00074266211607, 784, 403.0007390216155, 718, 704.0012723549488, 706],
            "prevPayload": 0
        }, {
            "id": "8",
            "globalId": "8",
            "connections": ["13.out", "10.en"],
            "payload": 0,
            "path": [323.0004696245734, 873, 709.0012814562001, 814],
            "prevPayload": 0
        }, {
            "id": "9",
            "globalId": "9",
            "connections": ["14.out", "10.oEn"],
            "payload": 0,
            "path": [327.00047690557454, 961, 540.0009883959044, 950, 563.001030261661, 863, 709.0012814562001, 839],
            "prevPayload": 0
        }, {
            "id": "10",
            "globalId": "5",
            "connections": ["wire.5.0", "10.d"],
            "payload": 8,
            "path": [593.022351382684, 254.20180456254343, 607.0011103526735, 793, 709.0012814562001, 789],
            "prevPayload": 8
        }, {
            "id": "11",
            "globalId": "5",
            "connections": ["wire.10.2", "2.d"],
            "payload": 8,
            "path": [608.4278720167747, 660.2728690448481, 704.0012723549488, 656],
            "prevPayload": 8
        }, {
            "id": "12",
            "globalId": "5",
            "connections": ["wire.10.3", "3.in"],
            "payload": 8,
            "path": [606.3828741677465, 581.45033886922, 1502.0027249146758, 578],
            "prevPayload": 8
        }, {
            "id": "13",
            "globalId": "5",
            "connections": ["2.q", "wire.12.4"],
            "payload": 8,
            "path": [794.0012723549488, 681, 847.0015472127418, 679, 849.0153607903428, 585.5348694270235],
            "prevPayload": 8
        }, {
            "id": "14",
            "globalId": "5",
            "connections": ["10.q", "wire.12.5"],
            "payload": 8,
            "path": [799.0012814562001, 814, 932.001701934016, 812, 935.8810143432049, 585.2002230470849],
            "prevPayload": 8
        }, {
            "id": "15",
            "globalId": "15",
            "connections": ["15.out", "3.en"],
            "payload": 0,
            "path": [1356.0023499431172, 801, 1433.0026138794085, 802, 1425.0025993174063, 635, 1502.0027249146758, 628],
            "prevPayload": 0
        }, {
            "id": "16",
            "globalId": "5",
            "connections": ["1.data", "wire.12.6"],
            "payload": 8,
            "path": [1141.0017219567692, 258, 1284.002342662116, 257, 1288.007219677449, 583.8436712331402],
            "prevPayload": 8
        }],
        "wireConnections": [{
            "position": {"x": 588.022351382684, "y": 249.20180456254343},
            "id": "wire.5.0",
            "wireId": "5",
            "connectionIndex": 0,
            "firstPartToLengthRatio": 0.7981954374565596
        }, {
            "position": {"x": 603.4278720167747, "y": 655.2728690448481},
            "id": "wire.10.2",
            "wireId": "10",
            "connectionIndex": 0,
            "firstPartToLengthRatio": 0.7443808607351967
        }, {
            "position": {"x": 601.3828741677465, "y": 576.45033886922},
            "id": "wire.10.3",
            "wireId": "10",
            "connectionIndex": 0,
            "firstPartToLengthRatio": 0.5980876273073618
        }, {
            "position": {"x": 844.0153607903428, "y": 580.5348694270235},
            "id": "wire.12.4",
            "wireId": "12",
            "connectionIndex": 0,
            "firstPartToLengthRatio": 0.26532740026297486
        }, {
            "position": {"x": 930.8810143432049, "y": 580.2002230470849},
            "id": "wire.12.5",
            "wireId": "12",
            "connectionIndex": 0,
            "firstPartToLengthRatio": 0.3623168243812744
        }, {
            "position": {"x": 1283.007219677449, "y": 578.8436712331402},
            "id": "wire.12.6",
            "wireId": "12",
            "connectionIndex": 0,
            "firstPartToLengthRatio": 0.7554816309011141
        }],
        "activeConnection": null,
        "activePath": null,
        "activePathNodesCount": 1
    },
    "blockReducer": {
        "blocks": [{
            "id": "0",
            "type": "rom",
            "name": "Rom",
            "position": {"x": 314.00057155858934, "y": 100},
            "connections": [{
                "id": "0.inc",
                "name": "inc",
                "connectedTo": "0",
                "type": "in",
                "blockId": 0,
                "position": {"x": 0, "y": 95}
            }, {
                "id": "0.en",
                "name": "en",
                "connectedTo": "1",
                "type": "in",
                "blockId": 0,
                "position": {"x": 0, "y": 195}
            }, {
                "id": "0.out",
                "name": "out",
                "connectedTo": "5",
                "type": "out",
                "blockId": 0,
                "position": {"x": 190, "y": 145}
            }],
            "payload": {"address": 3, "value": 2, "activeAddress": 0}
        }, {
            "id": "1",
            "type": "ram",
            "name": "Ram",
            "position": {"x": 946.0017219567692, "y": 108},
            "connections": [{
                "id": "1.addr",
                "name": "addr",
                "connectedTo": "5",
                "type": "in",
                "blockId": 1,
                "position": {"x": 0, "y": 55}
            }, {
                "id": "1.readAddr",
                "name": "readAddr",
                "connectedTo": "2",
                "type": "in",
                "blockId": 1,
                "position": {"x": 0, "y": 115}
            }, {
                "id": "1.en",
                "name": "en",
                "connectedTo": "3",
                "type": "in",
                "blockId": 1,
                "position": {"x": 0, "y": 175}
            }, {
                "id": "1.r/!w",
                "name": "r/!w",
                "connectedTo": "4",
                "type": "in",
                "blockId": 1,
                "position": {"x": 0, "y": 235}
            }, {
                "id": "1.data",
                "name": "data",
                "connectedTo": "16",
                "type": "inout",
                "blockId": 1,
                "position": {"x": 190, "y": 145}
            }],
            "payload": {"address": 2, "value": 8, "activeAddress": 0}
        }, {
            "id": "2",
            "type": "register",
            "name": "rvh",
            "position": {"x": 699.0012723549488, "y": 631},
            "connections": [{
                "id": "2.d",
                "name": "d",
                "connectedTo": "11",
                "type": "in",
                "blockId": 2,
                "position": {"x": 0, "y": 20}
            }, {
                "id": "2.en",
                "name": "en",
                "connectedTo": "6",
                "type": "in",
                "blockId": 2,
                "position": {"x": 0, "y": 45}
            }, {
                "id": "2.oEn",
                "name": "oEn",
                "connectedTo": "7",
                "type": "in",
                "blockId": 2,
                "position": {"x": 0, "y": 70}
            }, {
                "id": "2.q",
                "name": "q",
                "connectedTo": "13",
                "type": "out",
                "blockId": 2,
                "position": {"x": 90, "y": 45}
            }],
            "payload": 0
        }, {
            "id": "3",
            "type": "instruction-register",
            "name": "Instr. Reg.",
            "position": {"x": 1497.0027249146758, "y": 528},
            "connections": [{
                "id": "3.in",
                "name": "in",
                "connectedTo": "12",
                "type": "in",
                "blockId": 3,
                "position": {"x": 0, "y": 45}
            }, {
                "id": "3.en",
                "name": "en",
                "connectedTo": "15",
                "type": "in",
                "blockId": 3,
                "position": {"x": 0, "y": 95}
            }],
            "payload": 0
        }, {
            "id": "4",
            "type": "control-unit",
            "name": "Control unit",
            "position": {"x": 1588.0028905574518, "y": 171},
            "connections": [],
            "payload": 0
        }, {
            "id": "5",
            "type": "global-sig",
            "name": "romInc",
            "position": {"x": 73.00013287827076, "y": 166},
            "connections": [{
                "id": "5.out",
                "name": "out",
                "connectedTo": "0",
                "type": "out",
                "blockId": 5,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "6",
            "type": "global-sig",
            "name": "romEn",
            "position": {"x": 75.00013651877133, "y": 270},
            "connections": [{
                "id": "6.out",
                "name": "out",
                "connectedTo": "1",
                "type": "out",
                "blockId": 6,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "7",
            "type": "global-sig",
            "name": "ramRd",
            "position": {"x": 731.001330602958, "y": 211},
            "connections": [{
                "id": "7.out",
                "name": "out",
                "connectedTo": "2",
                "type": "out",
                "blockId": 7,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "8",
            "type": "global-sig",
            "name": "ramEn",
            "position": {"x": 732.0013324232082, "y": 296},
            "connections": [{
                "id": "8.out",
                "name": "out",
                "connectedTo": "3",
                "type": "out",
                "blockId": 8,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "9",
            "type": "global-sig",
            "name": "ramRnW",
            "position": {"x": 735.0013378839591, "y": 382},
            "connections": [{
                "id": "9.out",
                "name": "out",
                "connectedTo": "4",
                "type": "out",
                "blockId": 9,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "10",
            "type": "register",
            "name": "regAcc",
            "position": {"x": 704.0012814562001, "y": 764},
            "connections": [{
                "id": "10.d",
                "name": "d",
                "connectedTo": "10",
                "type": "in",
                "blockId": 10,
                "position": {"x": 0, "y": 20}
            }, {
                "id": "10.en",
                "name": "en",
                "connectedTo": "8",
                "type": "in",
                "blockId": 10,
                "position": {"x": 0, "y": 45}
            }, {
                "id": "10.oEn",
                "name": "oEn",
                "connectedTo": "9",
                "type": "in",
                "blockId": 10,
                "position": {"x": 0, "y": 70}
            }, {
                "id": "10.q",
                "name": "q",
                "connectedTo": "14",
                "type": "out",
                "blockId": 10,
                "position": {"x": 90, "y": 45}
            }],
            "payload": 0
        }, {
            "id": "11",
            "type": "global-sig",
            "name": "rvhEn",
            "position": {"x": 256.00046598407283, "y": 657},
            "connections": [{
                "id": "11.out",
                "name": "out",
                "connectedTo": "6",
                "type": "out",
                "blockId": 11,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "12",
            "type": "global-sig",
            "name": "rvhOEn",
            "position": {"x": 258.0004696245734, "y": 751},
            "connections": [{
                "id": "12.out",
                "name": "out",
                "connectedTo": "7",
                "type": "out",
                "blockId": 12,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "13",
            "type": "global-sig",
            "name": "regAccEn",
            "position": {"x": 258.0004696245734, "y": 838},
            "connections": [{
                "id": "13.out",
                "name": "out",
                "connectedTo": "8",
                "type": "out",
                "blockId": 13,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "14",
            "type": "global-sig",
            "name": "regAccOEn",
            "position": {"x": 262.00047690557454, "y": 926},
            "connections": [{
                "id": "14.out",
                "name": "out",
                "connectedTo": "9",
                "type": "out",
                "blockId": 14,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }, {
            "id": "15",
            "type": "global-sig",
            "name": "instrRegEn",
            "position": {"x": 1291.0023499431172, "y": 766},
            "connections": [{
                "id": "15.out",
                "name": "out",
                "connectedTo": "15",
                "type": "out",
                "blockId": 15,
                "position": {"x": 60, "y": 30}
            }],
            "payload": 0
        }],
        "selectedBlockId": "3",
        "globalSignals": [{
            "name": "romInc",
            "blockId": "5",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": [1]}, {"commandCode": 170, "ones": [1, 4]}]
        }, {
            "name": "romEn",
            "blockId": "6",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": [2]}, {"commandCode": 170, "ones": [2, 5]}]
        }, {
            "name": "ramRd",
            "blockId": "7",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": []}, {"commandCode": 170, "ones": [6, 10]}]
        }, {
            "name": "ramEn",
            "blockId": "8",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": []}, {"commandCode": 170, "ones": [7, 12]}]
        }, {
            "name": "ramRnW",
            "blockId": "9",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": []}, {"commandCode": 170, "ones": [7]}]
        }, {
            "name": "rvhEn",
            "blockId": "11",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": []}, {"commandCode": 170, "ones": [3]}]
        }, {
            "name": "rvhOEn",
            "blockId": "12",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": []}, {"commandCode": 170, "ones": [9]}]
        }, {
            "name": "regAccEn",
            "blockId": "13",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": []}, {"commandCode": 170, "ones": [8]}]
        }, {
            "name": "regAccOEn",
            "blockId": "14",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": []}, {"commandCode": 170, "ones": [11]}]
        }, {
            "name": "instrRegEn",
            "blockId": "15",
            "value": 0,
            "commands": [{"commandCode": 0, "ones": [3]}, {"commandCode": 170, "ones": []}]
        }],
        "commands": [{"name": "", "commandCode": 0, "length": 10}, {"name": "", "commandCode": 170, "length": 15}],
        "commandsAmount": "2"
    },
    "clkReducer": {"clk": 0, "clkState": 0, "clkPosition": 2},
    "globalStateReducer": {"globalState": 1, "statePayload": {"blockType": "global-sig", "alreadyMoving": false}},
    "topPanelReducer": {"activeBlockType": null},
    "commandReducer": {"currentCommand": 0, "isCommandModalOpened": false, "commandLength": 0, "commandCode": 11111111}
}