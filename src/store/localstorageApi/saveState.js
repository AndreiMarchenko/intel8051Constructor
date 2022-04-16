export default async function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('redux', serializedState);
    } catch (e) {
        // Ignore
    }
}