import BlockConnection from "./BlockConnection";

export default function InputConnections({names, blockCoords, blockId}) {
    const connections = names.map((name, i) => {
        return <BlockConnection name={name} blockId={blockId} x={blockCoords.startX} y={blockCoords.startY + i * 20}/>
    });

    return (
        connections
    );
}