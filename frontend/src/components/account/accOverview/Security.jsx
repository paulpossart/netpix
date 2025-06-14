import { Link, useLocation, Outlet } from "react-router-dom";
import styles from './accOverview.module.scss';
import chevronRight from '../../../assets/chevron-right.svg';
import accountIcon from '../../../assets/account-black.svg';
import passwordIcon from '../../../assets/padlock.svg';

function Security() {
    const path = useLocation().pathname;

    if (
        path === '/account/security/update-username'
        || path === '/account/security/update-password'
    ) {
        return <Outlet />;
    }

    return (
        <div className={styles.accountOverview}>
            <h2>Security</h2>

            <section>
                <h3>Account Details</h3>
                <div className={styles.overviewContainer}>

                    <ul>
                        <li>
                            <Link
                                to='update-password'
                                className={styles.quickLink}
                            >
                                <div className={styles.quickLinkDiv}>
                                    <img src={passwordIcon} />
                                    Change password
                                </div>
                                <img src={chevronRight} />
                            </Link>
                        </li>

                        <div className={styles.border}></div>

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

        </div>
    )
};

export default Security;
