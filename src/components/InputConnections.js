import BlockConnection from "./BlockConnection";

export default function InputConnections({names, blockGlobalCoords, blockId}) {
    const connections = names.map((name, i) => {
        return <BlockConnection
            id={blockId + '.' + name}
            key={blockId + '.' + name}
            name={name}
            x={0}
            y={i * 20}
            blockGlobalCoords={blockGlobalCoords}
            input
        />
    });

    return (
        connections
    );
}