import './SaveState.css';
import saveStateToLocalStorage from '../../../../../store/localstorageApi/saveState';
import saveToFile from "../../../../../utils/saveToFile";
import store from '../../../../../store/store'
import downloadFile from "../../../../../utils/downloadFile";

export default function saveState() {
    const handleSaveState = () => {
        const file = saveToFile(JSON.stringify(store.getState(), null, 2));
        downloadFile(file);
        saveStateToLocalStorage(JSON.stringify(store.getState()));
    };

    return (
        <button className="save-state-btn" onClick={handleSaveState}>
            Save state
        </button>
    );
};