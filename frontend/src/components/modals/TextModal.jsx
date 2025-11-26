import Portal from './Portal';

function TextModal({ modalData, onClose }) {

    const {
        message = '',
        extraBtn = false,
        extraOnClick = () => {}
    } = modalData;

    return (
        <Portal isOpen={!!modalData} onClose={onClose}>
            <div>
                <p style={{}}>{message}</p>
            </div>

            <div>
                {
                    extraBtn && <button onClick={extraOnClick}>
                        Confirm
                    </button>
                }
                <button onClick={onClose}>
                    {extraBtn ? 'Cancel' : 'OK'}
                </button>
            </div>
        </Portal>
    );
};

export default TextModal;
