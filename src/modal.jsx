import './modal.css';

export function Modal({ children }) {
    return (
        <div id='bg'>
            <div>
                {children}
            </div>
        </div>
    );
}