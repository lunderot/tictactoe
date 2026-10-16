import './spinnerDialog.css';
import { Modal } from "./modal";

export function SpinnerDialog({isLocalTurn}) {
    return (
        <Modal>
            <div class='spinnerDialog'>
                <div class="container">
                    <div class={`wheel ${isLocalTurn ? 'blue' : 'red'}`}></div>
                    <div class="pointer"></div>
                    <div class="center"></div>
                </div>
            </div>
        </Modal>
    );
}