import { BLOCK_CONNECTION_SIZE, REGISTER_BLOCK_SIZE } from '../../../utils/globals';

export default function (id) {
  let inputConnections = [
    {
      id: id + '.d',
      name: 'd',
      connectedTo: null,
      type: 'in',
      blockId: id,
    },
    {
      id: id + '.en',
      name: 'en',
      connectedTo: null,
      type: 'in',
      blockId: id,
    },
  ];
  let outputConnections = [
    {
      id: id + '.q',
      name: 'q',
      connectedTo: null,
      type: 'out',
      blockId: id,
    },
  ];

  const inputConnectionsYOffset = REGISTER_BLOCK_SIZE / (inputConnections.length + 1);
  const outputConnectionsYOffset = REGISTER_BLOCK_SIZE / (outputConnections.length + 1);

  inputConnections = inputConnections.map((connection, index) => {
    connection.position = {
      x: 0,
      y: (index + 1) * inputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
    };
    return connection
  });

  outputConnections = outputConnections.map((connection, index) => {
    connection.position = {
      x: REGISTER_BLOCK_SIZE - BLOCK_CONNECTION_SIZE,
      y: (index + 1) * outputConnectionsYOffset - BLOCK_CONNECTION_SIZE / 2
    };
    return connection;
  });

  return [
    ...inputConnections,
    ...outputConnections,
  ]
};