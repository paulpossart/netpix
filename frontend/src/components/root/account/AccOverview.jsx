import { useAuth } from '../../../context/AuthContext';
import { SecurityIcon, MemberIcon } from '../../utils/svgs/accountSvgs';
import { Link } from 'react-router-dom';
import styles from './Account.module.scss';
import chevronRight from '../../../assets/chevron-right.svg';

function Overview() {
    const { user } = useAuth();

    const username = user.username;
    const createdAt = new Date(user.created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
    })
    return (
        <>
            <h2>Account</h2>

            <section >
                <h3>Membership Details</h3>
                <div className={styles.overviewContainer}>
                    <p className={styles.memberSince}>Member since {createdAt}</p>
                    <p>Free plan</p>
                    <p>Username: <span className={styles.username}>{username}</span></p>
                </div>
            </section>


            <section>
                <h3>Quick Links</h3>
                <div className={styles.overviewContainer}>
                    <ul>
                        <li>
                            <Link
                                to='security'
                                className={styles.quickLink}
                                style={{ borderBottom: 'solid 1px rgb(220, 220, 220)' }}
                            >
                                <div className={styles.quickLinkDiv}>
                                    <SecurityIcon />
                                    Change username and password
                                </div>
                                <img src={chevronRight} />
                            </Link>
                        </li>
                        <li>
                            <Link to='membership' className={styles.quickLink}>
                                <div className={styles.quickLinkDiv}>
                                    <MemberIcon />
                                    Cancel membership
                                </div>
                                <img src={chevronRight} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </section >

        </>
    );
};

export default Overview;
