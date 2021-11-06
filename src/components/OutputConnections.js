import BlockConnection from "./BlockConnection";

export default function OutputConnections({names, blockGlobalCoords, blockId}) {
    const connections = names.map((name, i) => {
        return <BlockConnection
            id={blockId + '.' + name}
            key={blockId + '.' + name}
            name={name}
            x={40}
            y={i * 20}
            blockGlobalCoords={blockGlobalCoords}
            output
        />
    });

    return (
        connections
    );
};