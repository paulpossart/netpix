import {useAuth} from '../../../context/AuthContext';
import { SecurityIcon, MemberIcon } from '../../utils/svgs/accountSvgs';
import { Link } from 'react-router-dom';
import styles from './Account.module.scss';

function Overview() {
    const {user} = useAuth();

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
                    <p>Member since {createdAt}</p>
                    <p>Standard plan</p>
                    <p>Username: {username}</p>
                </div>
            </section>


            <section>
                <h3>Quick Links</h3>
                <div className={styles.overviewContainer}>
                <Link>Change username and password</Link>
                <Link>Cancel membership</Link>
            </div>
        </section >

        </>
    );
};

export default Overview;
