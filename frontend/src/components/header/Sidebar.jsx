import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.scss';

function Sidebar({ sidebar, setSidebar }) {
    const { user, logout } = useAuth();
    const username = user?.username;
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    useEffect(() => {
        if (!sidebar) return;
        const closeOnEsc = (e) => { if (e.key === 'Escape') setSidebar(false); }
        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    }, [sidebar, setSidebar]);

    return (
        <>
            {
                sidebar &&
                <div
                    onClick={() => setSidebar(false)}
                    className={`${styles.overlay} ${isAccountPath ? styles.accOverlay : styles.homeOverlay}`}
                ></div>
            }

            <nav
                id='sidebar'
                aria-label='sidebar navigation'
                onMouseLeave={() => setSidebar(false)}
                className={
                    `${styles.sidebar}
                     ${isAccountPath ? styles.accSidebar : styles.homeSidebar}
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
                            ? <Link to='/'>Back to Netpix</Link>
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
