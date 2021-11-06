import BlockConnection from "./BlockConnection";

export default function InputConnections({names, blockCoords, blockId}) {
    const connections = names.map((name, i) => {
        return <BlockConnection
            id={blockId + name}
            name={name}
            x={blockCoords.startX}
            y={blockCoords.startY + i * 20}
            input
        />
    });

    return (
        connections
    );
}