import {BLOCK_CONNECTION_SIZE, RAM_BLOCK_HEIGHT, RAM_BLOCK_WIDTH} from '../../../../globals/globals';

export default function (id) {
    let inputConnections = [
        {
            id: id + '.addr',
            name: 'addr',
            connectedTo: null,
            connectedToType: null,
            type: 'in',
            blockId: id,
        },
        {
            id: id + '.readAddr',
            name: 'readAddr',
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
        {
            id: id + '.r/!w',
            name: 'r/!w',
            connectedTo: null,
            connectedToType: null,
            type: 'in',
            blockId: id,
        },
    ];
    let outputConnections = [
        {
            id: id + '.data',
            name: 'data',
            connectedTo: null,
            connectedToType: null,
            type: 'inout',
            blockId: id,
        },
    ];

    const inputConnectionsYOffset = RAM_BLOCK_HEIGHT / (inputConnections.length + 1);
    const outputConnectionsYOffset = RAM_BLOCK_HEIGHT / (outputConnections.length + 1);

    inputConnections = inputConnections.map((connection, index) => {
        connection.position = {
            x: 0,
            y: (index + 1) * inputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection
    });

    outputConnections = outputConnections.map((connection, index) => {
        connection.position = {
            x: RAM_BLOCK_WIDTH - BLOCK_CONNECTION_SIZE,
            y: (index + 1) * outputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection;
    });

    return [
        ...inputConnections,
        ...outputConnections,
    ]
};