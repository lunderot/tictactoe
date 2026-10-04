import './roomDialog.css';
import { Modal } from "./modal";

export function RoomDialog({ link }) {
    return (
        <Modal>
            <div class="roomDialog">
                <div class="desc">Send the link below to your opponent to begin playing!</div>
                <div class="link">
                    <div class="url">
                        {link}
                    </div>
                    <div class="button" onClick={() => navigator.clipboard.writeText(link)}>
                        Copy link
                    </div>
                </div>
                <a target="_blank" rel="noopener noreferrer" href={link}>Click to open!</a>
            </div>
        </Modal>
    );
}