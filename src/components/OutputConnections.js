import BlockConnection from "./BlockConnection";

export default function OutputConnections({names, blockCoords, blockId}) {
    const connections = names.map((name, i) => {
        return <BlockConnection
            id={blockId + name}
            name={name}
            x={blockCoords.endX - 10}
            y={blockCoords.startY + i * 20}
            output
        />
    });

    return (
        connections
    );
};