export default function loadState() {
    try {
        const serializedState = localStorage.getItem('redux');
        if (!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}