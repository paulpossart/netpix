import styles from './Account.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { callDeleteUser } from '../../apiCalls/usersCalls';
import { useState } from 'react';

function Membership() {
    const [modal, setModal] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const removeUser = (e) => {
        e.preventDefault();
        setModal(null)
        setUser(null);
        navigate('/auth')
    };

    const deleteUser = async () => {
        try {
            const deleteUser = await callDeleteUser();

            if (deleteUser?.success) {
                setModal(
                    <>
                        <div onClick={removeUser} className={styles.modalOverlay}></div>
                        <div className={styles.modal}>
                            <p>{deleteUser.message}</p>
                            <button className={styles.btn1} onClick={removeUser}>OK</button>
                        </div>
                    </>
                );
            }
        } catch (err) {
            setModal(
                <>
                    <div onClick={() => setModal(null)} className={styles.modalOverlay}></div>
                    <div className={styles.modal}>
                        <p>{err.message}</p>
                        <button className={styles.btn1} onClick={() => setModal(null)}>OK</button>
                    </div>
                </>
            );
        }
    };

    const confirmDel = (e) => {
        e.preventDefault();
        setModal(
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
        )
    }

    return (
        <>
            {modal && modal}

            <h2>Cancel Membership</h2 >
            <section>
                <h3>We're sad to see you go</h3>
                <div className={styles.overviewContainer}>
                    <form>

                        <button
                            onClick={confirmDel}
                            className={styles.deleteBtn}
                        >
                            Delete Account
                        </button>


                        <Link
                            to='/account'
                            className={styles.cancelBtn}
                        >
                            Cancel
                        </Link>

                    </form>
                </div>
            </section >
        </>
    );
};

export default Membership;
