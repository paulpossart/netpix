import Portal from './Portal';

export default function TestModal({ modalData, onClose }) {

    return (
        <Portal isOpen={!!modalData} onClose={onClose}>
            {modalData}
            <button onClick={onClose}>
                Close
            </button>
        </Portal>
    );
};
