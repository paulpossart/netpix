import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import SignOut from '../../auth/SignOut';
import styles from './sidebar.module.scss';
import backIcon from '../../../assets/back-arrow.svg';

function Sidebar({ sidebar, setSidebar }) {
    const { user } = useAuth();
    const username = user?.username;
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    return (
        <>
            {
                sidebar &&
                <div
                    onClick={() => setSidebar(false)}
                    className={styles.overlay}
                    style={isAccountPath
                        ? { backgroundColor: 'rgba(255, 255, 255, 0.6' }
                        : { backgroundColor: 'rgba(0, 0, 0, 0.6' }}>
                </div>
            }
            <div onMouseLeave={() => setSidebar(false)}
                className={
                    `${styles.sidebar} 
                 ${isAccountPath ? styles.sidebarWhite : styles.sidebarBlack} 
                 ${sidebar ? styles.sidebarOpen : styles.sidebarClosed}`
                }>

                <div className={styles.sidebarDiv}>
                    {
                        isAccountPath ?
                            <Link
                                className={styles.backToNetpix}
                                to='/'><img src={backIcon}
                                />
                                Back to Netpix
                            </Link>
                            : <p>Welcome {username}!</p>
                    }
                </div>

                <div
                    className={`${styles.sidebarDiv} ${isAccountPath
                        ? null : styles.sidebarDivCentre}`}>
                    <Link to={'account'}>Account</Link>
                </div>

                <div className={styles.sidebarDiv}>
                    <SignOut />
                </div>

            </div>
        </>
    )
};

export default Sidebar;
