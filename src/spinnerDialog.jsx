import './spinnerDialog.css';
import { Modal } from "./modal";

export function SpinnerDialog() {
    return (
        <Modal>
            <div class='spinnerDialog'>
                <div class="wheel red"></div>
            </div>
        </Modal>
    );
}