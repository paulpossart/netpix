import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.scss';
import backIcon from '../../assets/back-arrow.svg';

function Sidebar({ sidebar, setSidebar }) {
    const { user, logout } = useAuth();
    const username = user?.username;
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    return (
        <>
            {
                sidebar &&
                <div
                    onClick={() => setSidebar(false)}
                    className={`${styles.overlay} ${isAccountPath && styles.accOverlay}`}
                ></div>
            }

            <nav
                onMouseLeave={() => setSidebar(false)}
                className={
                    `${styles.sidebar}
                     ${isAccountPath && styles.accSidebar}
                     ${!sidebar && styles.closeSidebar}`
                }
            >

                <div className={styles.sidebarDiv}>
                    <p>Welcome {username}!</p>
                </div>

                <div className={
                    `${styles.sidebarDiv}
                     ${!isAccountPath && styles.sidebarDivCentre}`
                }>
                    {
                        isAccountPath
                            ? <Link to='/'>Netpix</Link>
                            : <Link to='/account'>Account</Link>
                    }
                </div>

                <div className={styles.sidebarDiv}>
                    <button
                        onClick={logout}
                        className={styles.textBtn}
                    >
                        Sign Out
                    </button>
                </div>

            </nav >
        </>
    );
};

export default Sidebar;
