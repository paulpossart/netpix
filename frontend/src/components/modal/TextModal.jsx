import { useLocation } from "react-router-dom";
import styles from './modal.module.scss';

const textModalContent = ({
    setter, onClick, message, extraBtn = false, extraOnClick
}) => {
    setter({
        onClick, message, extraBtn, extraOnClick
    })
}

function TextModal({ modalData }) {
    const path = useLocation().pathname;
    const isAccount = path.startsWith('/account');

    if (!modalData) return null;

    const { message, onClick, extraBtn, extraOnClick } = modalData;

    return (
        <>
            <div onClick={onClick} className={isAccount ? styles.txtModOverlayAcc : styles.txtModOverlayHome}></div>
            <div className={`${styles.textModal} ${isAccount ? styles.accModal : styles.HomeModal}`}>
                <p>{message}</p>
                {extraBtn && <button className={styles.btn1} onClick={extraOnClick}>Confirm</button>}
                <button style={{ marginTop: '0.8rem' }} className={isAccount ? styles.btn2 : styles.btn1} onClick={onClick}>{extraBtn ? 'Cancel' : 'OK'}</button>
            </div>
        </>
    );
};

export { textModalContent, TextModal };
