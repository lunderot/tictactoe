import './roomDialog.css';
import { Modal } from "./modal";

export function RoomDialog({ link }) {
    return (
        <Modal>
            <div class='roomDialog'>
                <p>Send the link below to your opponent to begin playing!</p>
                <input type='text' value={link} disabled></input>
                <button id="share-link-copy">Copy link</button>
                <a target="_blank" rel="noopener noreferrer" href={link}>Click to open!</a>
            </div>
        </Modal>
    );
}