import saveStateToLocalStorage from "../../../../../store/localstorageApi/saveState";
import './DeleteState.css';

export default function DeleteState() {
    const handleDeleteState = () => {
        saveStateToLocalStorage('');
    };

    return (
        <button className="delete-state-btn" onClick={handleDeleteState}>
            Delete state
        </button>
    );
}