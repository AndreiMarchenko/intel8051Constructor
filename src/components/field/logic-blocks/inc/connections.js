import { BLOCK_CONNECTION_SIZE, INC_BLOCK_WIDTH, INC_BLOCK_HEIGHT } from '../../../../globals/globals';

export default function (id) {
    let inputConnections = [
        {
            id: id + '.in',
            name: 'in',
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

    const inputConnectionsYOffset = INC_BLOCK_HEIGHT / (inputConnections.length + 1);
    const outputConnectionsYOffset = INC_BLOCK_HEIGHT / (outputConnections.length + 1);

    inputConnections = inputConnections.map((connection, index) => {
        connection.position = {
            x: 0,
            y: (index + 1) * inputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection
    });

    outputConnections = outputConnections.map((connection, index) => {
        connection.position = {
            x: INC_BLOCK_WIDTH - BLOCK_CONNECTION_SIZE,
            y: (index + 1) * outputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection;
    });

    return [
        ...inputConnections,
        ...outputConnections,
    ]
};