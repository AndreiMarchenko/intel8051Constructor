import { BLOCK_CONNECTION_SIZE, SUM_BLOCK_SIZE } from '../../../../globals/globals';

export default function (id) {
    let inputConnections = [
        {
            id: id + '.in1',
            name: 'in1',
            connectedTo: null,
            connectedToType: null,
            type: 'in',
            blockId: id,
        },
        {
            id: id + '.in2',
            name: 'in2',
            connectedTo: null,
            connectedToType: null,
            type: 'in',
            blockId: id,
        },
    ];
    let outputConnections = [
        {
            id: id + '.out',
            name: 'out',
            connectedTo: null,
            connectedToType: null,
            type: 'out',
            blockId: id,
        },
    ];

    const inputConnectionsYOffset = SUM_BLOCK_SIZE / (inputConnections.length + 1);
    const outputConnectionsYOffset = SUM_BLOCK_SIZE / (outputConnections.length + 1);

    inputConnections = inputConnections.map((connection, index) => {
        connection.position = {
            x: 0,
            y: (index + 1) * inputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection
    });

    outputConnections = outputConnections.map((connection, index) => {
        connection.position = {
            x: SUM_BLOCK_SIZE - BLOCK_CONNECTION_SIZE,
            y: (index + 1) * outputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection;
    });

    return [
        ...inputConnections,
        ...outputConnections,
    ]
};