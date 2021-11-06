import BlockConnection from "./BlockConnection";

export default function OutputConnections({names, blockCoords}) {
    const connections = names.map((name, i) => {
        return <BlockConnection name={name} x={blockCoords.endX - 10} y={blockCoords.startY + i * 20}/>
    });

    return (
        connections
    );
};