import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useModal } from '../../../context/ModalContext';
import styles from './accChildren.module.scss';
import chevronRight from '../../../assets/chevron-right.svg';
import accountIcon from '../../../assets/account-black.svg';
import passwordIcon from '../../../assets/padlock.svg';
import logOutAllIcon from '../../../assets/logout-all.svg';

function Security() {
    const { logoutAll } = useAuth();
    const { setModal, closeModal } = useModal();

    const path = useLocation().pathname;

    const renderModal = () => {
        setModal({
            type: 'text',
            data: {
                message: 'You will be signed out of all devices',
                extraBtn: true,
                extraOnClick: async () => {
                    closeModal();
                    await logoutAll();
                }
            }
        });
    };

    if (
        path === '/account/security/update-username'
        || path === '/account/security/update-password'
    ) {
        return <Outlet />;
    }


    return (
        <div className={styles.accChildren}>
            <h2>Security</h2>

            <section>
                <h3>Account Details</h3>

                <div className={styles.Security}>

                    <ul>
                        <li>
                            <Link
                                to='update-password'
                                className={styles.quickLink}
                            >
                                <div>
                                    <img src={passwordIcon} />
                                    Change password
                                </div>
                                <img src={chevronRight} />
                            </Link>
                        </li>

                        <li className={styles.border}></li>

                        <li>
                            <Link
                                to='update-username'
                                className={styles.quickLink}
                            >
                                <div>
                                    <img src={accountIcon} />
                                    Change username
                                </div>
                                <img src={chevronRight} />
                            </Link>
                        </li>

                        <li className={styles.border}></li>

                        <li>
                            <button
                                onClick={renderModal}
                                className={styles.quickLink}
                            >
                                <div>
                                    <img src={logOutAllIcon} />
                                    Sign out everywhere
                                </div>
                                <img src={chevronRight} />
                            </button>

                        </li>
                    </ul>

                </div>
            </section>
        </div>
    );
};

export default Security;
