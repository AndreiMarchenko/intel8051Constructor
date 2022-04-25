import saveStateToLocalStorage from "../../../../../store/localstorageApi/saveState";
import './ClearField.css';
import Swal from 'sweetalert2';


const swalWithButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn confirm-clear-btn',
        cancelButton: 'btn dismiss-clear-btn'
    },
    buttonsStyling: false
})

export default function ClearField() {
    const handleDeleteState = () => {
        swalWithButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                saveStateToLocalStorage('');
                window.location.reload();
            }
        })
    };

    return (
        <button className="clear-field-btn" onClick={handleDeleteState}>
            Clear field
        </button>
    );
}