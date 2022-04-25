import './LoadState.css';
import saveStateToLocalStorage from '../../../../../store/localstorageApi/saveState';

export default function saveState() {
    const handleLoadState = () => {
        const input = document.querySelector('.load-state-input');
        input.click();
    };

    const handleFileInput = event => {
        const file = event.target.files[0];
        let fileContents;

        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (event) {
            fileContents = event.target.result;
            saveStateToLocalStorage(fileContents);
            window.location.reload();
        }
    };

    return (
        <>
            <button className="load-state-btn" onClick={handleLoadState}>
                Load state
            </button>
            <input className="load-state-input" type="file" onChange={handleFileInput}/>
        </>
    );
};