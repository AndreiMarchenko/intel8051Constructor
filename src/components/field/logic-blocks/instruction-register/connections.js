import { BLOCK_CONNECTION_SIZE, INSTRUCTION_REGISTER_BLOCK_SIZE } from '../../../../globals/globals';

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
        {
            id: id + '.en',
            name: 'en',
            connectedTo: null,
            connectedToType: null,
            type: 'in',
            blockId: id,
        },
    ];

    const inputConnectionsYOffset = INSTRUCTION_REGISTER_BLOCK_SIZE / (inputConnections.length + 1);

    inputConnections = inputConnections.map((connection, index) => {
        connection.position = {
            x: 0,
            y: (index + 1) * inputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
        };
        return connection
    });

    return [
        ...inputConnections,
    ]
};