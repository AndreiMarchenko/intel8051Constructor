import { BLOCK_CONNECTION_SIZE, ROM_BLOCK_WIDTH, ROM_BLOCK_HEIGHT } from '../../../../globals/globals';

export default function (id) {
    let inputConnections = [
        {
            id: id + '.inc',
            name: 'inc',
            connectedTo: null,
            connectedToType: null,
            type: 'in',
            blockId: id,
        },
        {
            id: id + '.en',
            name: 'en',
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

    const inputConnectionsYOffset = ROM_BLOCK_HEIGHT / (inputConnections.length + 1);
    const outputConnectionsYOffset = ROM_BLOCK_HEIGHT / (outputConnections.length + 1);

    inputConnections = inputConnections.map((connection, index) => {
        connection.position = {
            x: 0,
            y: (index + 1) * inputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection
    });

    outputConnections = outputConnections.map((connection, index) => {
        connection.position = {
            x: ROM_BLOCK_WIDTH - BLOCK_CONNECTION_SIZE,
            y: (index + 1) * outputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection;
    });

    return [
        ...inputConnections,
        ...outputConnections,
    ]
};