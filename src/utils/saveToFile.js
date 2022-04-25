export default function(fileContents) {
    return new File(
        [fileContents],
        "state.json", {
            type: 'application/json'
        }
    );
};