import { Link, useLocation, Outlet } from "react-router-dom";
import styles from './Account.module.scss';
import chevronRight from '../../../assets/chevron-right.svg';
import accountIcon from '../../../assets/account-black.svg';
import passwordIcon from '../../../assets/padlock.svg';

function Security() {
    const path = useLocation().pathname;
    console.log(path);

    if (
        path === '/account/security/update-username'
        || path === '/account/security/update-password'
    ) {
        return <Outlet />;
    }

    return (
        <>
            <h2>Security</h2>

            <section>
                <h3>Account Details</h3>
                <div className={styles.overviewContainer}>
                    <ul>
                        <li>
                            <Link
                                to='update-password'
                                className={styles.quickLink}
                                style={{ borderBottom: 'solid 1px rgb(220, 220, 220)' }}
                            >
                                <div className={styles.quickLinkDiv}>
                                    <img src={passwordIcon} />
                                    Change password
                                </div>
                                <img src={chevronRight} />
                            </Link>
                        </li>
                        <li>
                            <Link to='update-username' className={styles.quickLink}>
                                <div className={styles.quickLinkDiv}>
                                    <img src={accountIcon} />
                                    Change username
                                </div>
                                <img src={chevronRight} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </section >

        </>
    )
};

export default Security;
