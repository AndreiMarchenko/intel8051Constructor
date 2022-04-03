import { BLOCK_CONNECTION_SIZE, GLOBAL_SIG_BLOCK_SIZE } from '../../../../globals/globals';

export default function (id) {
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
    const outputConnectionsYOffset = GLOBAL_SIG_BLOCK_SIZE / (outputConnections.length + 1);
    outputConnections = outputConnections.map((connection, index) => {
        connection.position = {
            x: GLOBAL_SIG_BLOCK_SIZE - BLOCK_CONNECTION_SIZE,
            y: (index + 1) * outputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection;
    });

    return [
        ...outputConnections,
    ]
};