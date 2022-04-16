import './SaveState.css';
import saveStateToLocalStorage from '../../../../../store/localstorageApi/saveState';
import store from '../../../../../store/store'

export default function saveState() {
    const handleSaveState = () => {
        saveStateToLocalStorage(store.getState());
    };

    return (
        <button className="save-state-btn" onClick={handleSaveState}>
            Save state
        </button>
    );
};