import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useModal } from '../../../context/ModalContext';
import { callDeleteUser } from '../../../apiCalls/usersCalls';
import styles from './accChildren.module.scss';

function Membership() {
    const { setUser } = useAuth();
    const { setModal, closeModal } = useModal();
    const navigate = useNavigate();

    const deleteUser = async () => {
        const removeUser = () => {
            setUser(null)
            closeModal();
            navigate('/auth')
        }

        try {
            const response = await callDeleteUser()
            setModal({
                type: 'text',
                data: {
                    message: response.message,
                    onClick: removeUser
                }
            });
        } catch (err) {
            setModal({
                type: 'text',
                data: {
                    message: 'Could not delete user. Please try again later.',
                    onClick: closeModal
                }
            });
        }
    };

    const confirmDel = (e) => {
        e.preventDefault();
        setModal({
            type: 'text',
            data: {
                message: 'Really delete?',
                extraBtn: true,
                extraOnClick: deleteUser
            }
        });
    };

    return (
        <div className={styles.accChildren}>
            <h2>Cancel Membership</h2 >
            <section>
                <h3>Delete your account</h3>
                <div className={styles.Membership}>
                    <button
                        onClick={confirmDel}
                        className={styles.deleteAcc}>
                        Delete Account
                    </button>
                    <Link
                        to='/account'
                        className={styles.transparentBtn}

                    >
                        Cancel
                    </Link>
                </div>
            </section>

        </div>
    );
}

export default Membership;

