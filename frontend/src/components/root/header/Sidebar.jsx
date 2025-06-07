import { Link, useLocation } from 'react-router-dom';
import SignOut from '../../auth/SignOut';
import styles from './header.module.scss';
import { useAuth } from '../../../context/AuthContext';
import backIcon from '../../../assets/back-arrow.svg';


function Sidebar({ sidebar, setSidebar }) {
    const { user } = useAuth();
    const username = user.username;
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    return (
        <div onMouseLeave={() => setSidebar(false)}
            className={
                `${styles.sidebar} 
                 ${isAccountPath ? styles.sidebarWhite : styles.sidebarBlack} 
                 ${sidebar ? styles.sidebarOpen : styles.sidebarClosed}`
            }>
            <div className={styles.sidebarDiv}>
                {
                   isAccountPath
                        ? <Link className={styles.backBtn} to='/'><img src={backIcon} />Back to Netpix</Link>
                        : <p>Welcome {username}!</p>
                }
            </div>
            <div className={`${styles.sidebarDiv} ${isAccountPath ? null : styles.sidebarDivCentre}`}>
                <Link to={'account'}>Account</Link>
            </div>
            <div className={styles.sidebarDiv}>
                <SignOut />
            </div>
        </div>)
};

export default Sidebar;
