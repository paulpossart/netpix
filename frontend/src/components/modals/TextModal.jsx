import Portal from './Portal';
import { useLocation } from 'react-router-dom';
import styles from './modal.module.scss';

function TextModal({ modalData, onClose }) {
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    const {
        message = '',
        onClick = onClose,
        extraBtn = false,
        extraOnClick = () => { }
    } = modalData;

    return (
        <Portal isOpen={!!modalData} onClick={onClick}>
            <section className={`${styles.TextModal} ${isAccountPath ? styles.accTextModal : ''}`}>
                <h2
                    id='modal-title'
                    className={styles.srOnly}
                >
                    Notification
                </h2>
                <p>{message}</p>

                <div className={styles.btnsDiv}>
                    {
                        extraBtn && <button
                            onClick={extraOnClick}
                            className={styles.redBtn}
                        >
                            Confirm
                        </button>
                    }
                    <button
                        onClick={onClick}
                        className={isAccountPath ? styles.blackBtn : styles.redBtn}
                        autoFocus
                    >
                        {extraBtn ? 'Cancel' : 'OK'}
                    </button>
                </div>
            </section>

        </Portal>
    );
};

export default TextModal;
