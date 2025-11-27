import Portal from './Portal';

function TextModal({ modalData, onClose }) {

    const {
        message = '',
        onClick = onClose,
        extraBtn = false,
        extraOnClick = () => {}
    } = modalData;

    return (
        <Portal isOpen={!!modalData} onClick={onClick}>
            <div>
                <p style={{}}>{message}</p>
            </div>

            <div>
                {
                    extraBtn && <button onClick={extraOnClick}>
                        Confirm
                    </button>
                }
                <button onClick={onClick}>
                    {extraBtn ? 'Cancel' : 'OK'}
                </button>
            </div>
        </Portal>
    );
};

export default TextModal;
