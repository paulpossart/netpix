import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useModal } from '../../../context/ModalContext';
import { callDeleteUser } from '../../../apiCalls/usersCalls';
import { textModalContent } from '../../modal/TextModal';
import styles from './accOverview.module.scss';

function Membership() {
    const navigate = useNavigate();
    const { setTextModal } = useModal();
    const { setUser } = useAuth();

    const removeUser = (e) => {
        e.preventDefault();
        setTextModal(null)
        setUser(null);
        navigate('/auth')
    };

    const deleteUser = async () => {
        try {
            const deleteUser = await callDeleteUser();

            if (deleteUser?.success) {
                textModalContent({
                    setter: setTextModal,
                    onClick: removeUser,
                    message: deleteUser.message,
                });
            }
        } catch (err) {
            textModalContent({
                setter: setTextModal,
                onClick: () => setTextModal(null),
                message: err.message,
            });
        }
    };

    const confirmDel = (e) => {
        e.preventDefault();
        textModalContent({
            setter: setTextModal,
            onClick: () => setTextModal(null),
            message: 'Really delete?',
            extraBtn: true,
            extraOnClick: deleteUser
        });
    }

    return (
        <div className={styles.accountOverview}>
            <h2>Cancel Membership</h2 >
            <section>
                <h3>We're sad to see you go</h3>
                <div className={styles.overviewContainer}>
                    <button
                        onClick={confirmDel}
                        className={styles.deleteBtn}
                    >
                        Delete Account
                    </button>


                    <Link
                        to='/account'
                        className={styles.transparentBtn}
                        style={{ marginTop: '0.8rem' }}
                    >
                        Cancel
                    </Link>
                </div>
            </section >
        </div>
    );
};

export default Membership;
