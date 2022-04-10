import { BLOCK_CONNECTION_SIZE, LOGIC_ONE_BLOCK_WIDTH, LOGIC_ONE_BLOCK_HEIGHT } from '../../../../globals/globals';

export default function (id) {
    let outputConnections = [
        {
            id: id + '.q',
            name: 'q',
            connectedTo: null,
            connectedToType: null,
            type: 'out',
            blockId: id,
        },
    ];

    const outputConnectionsYOffset = LOGIC_ONE_BLOCK_HEIGHT / (outputConnections.length + 1);

    outputConnections = outputConnections.map((connection, index) => {
        connection.position = {
            x: LOGIC_ONE_BLOCK_WIDTH - BLOCK_CONNECTION_SIZE,
            y: (index + 1) * outputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection;
    });

    return [
        ...outputConnections,
    ]
};