import { useLocation } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import styles from './modal.module.scss';


const setTextModal = ({
    setter, onClick, message, extraBtn = false, extraOnClick
}) => {


    setter(
        <>
            <div onClick={onClick} className={styles.modalOverlay}></div>
            <div className={styles.modal}>
                <p>{message}</p>
                {extraBtn && <button className={styles.btn1} onClick={extraOnClick}>Confirm</button>}
                <button style={{ marginTop: '0.8rem' }} className={styles.btn2} onClick={onClick}>{extraBtn ? 'Cancel' : 'OK'}</button>

            </div>
        </>
    )
}

function Modal({ children }) {
    const path = useLocation().pathname;
    const isAccount = path.startsWith('/account');
    
    return (
        <div className={isAccount && styles.accModal}>
            {children}
        </div>
    );
};

export { setTextModal, Modal };
/*
<>
    <>
        <div onClick={removeUser} className={styles.modalOverlay}></div>
        <div className={styles.modal}>
            <p>{deleteUser.message}</p>
            <button className={styles.btn1} onClick={removeUser}>OK</button>
        </div>
    </>



    <>
        <div onClick={() => setModal(null)} className={styles.modalOverlay}></div>
        <div className={styles.modal}>
            <p>{err.message}</p>
            <button className={styles.btn1} onClick={() => setModal(null)}>OK</button>
        </div>
    </>




    <>
        <div onClick={() => setModal(null)} className={styles.modalOverlay}></div>
        <div className={styles.modal}>
            <p>Really delete?</p>
            <div className={styles.btnsDiv}>
                <button className={styles.btn1} onClick={deleteUser}>Confirm</button>
                <button onClick={() => setModal(null)} className={styles.cancelBtn}>Cancel</button>
            </div>
        </div>
    </>
</>*/