import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from './AccOverview.module.scss';
import chevronRight from '../../assets/chevron-right.svg';
import securityIcon from '../../assets/security.svg';
import membershipIcon from '../../assets/membership.svg';



function Overview() {
    const { user } = useAuth();
    const username = user.username;
    const createdAt = new Date(user.created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
    })

    return (
        <section className={styles.AccOverview}>
            <h2>Account<span className={styles.srOnly}>Overview</span></h2>

            <section>
                <h3>Membership Details</h3>
                <div className={styles.container}>
                    <p className={styles.memberSince}>Member since {createdAt}</p>
                    <p>Free plan</p>
                    <p>Username: <span className={styles.username}>{username}</span></p>
                </div>
            </section>

            <section>
                <h3>Quick Links</h3>
                <div className={styles.container}>
                    <ul>
                        <li>
                            <Link
                                to='security'
                                className={styles.quickLink}
                            >
                                <div>
                                    <img src={securityIcon} alt='' />
                                    Change username and password
                                </div>
                                <img src={chevronRight} alt='' />
                            </Link>
                        </li>

                        <li className={styles.border}></li>

                        <li>
                            <Link to='membership' className={styles.quickLink}>
                                <div>
                                    <img src={membershipIcon} alt='' />
                                    Cancel membership
                                </div>
                                <img src={chevronRight} alt='' />
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>

        </section>
    );
};

export default Overview;
