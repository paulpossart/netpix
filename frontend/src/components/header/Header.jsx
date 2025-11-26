import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
// import useSearch from seartchContext
import Sidebar from './Sidebar';
import Searchbar from './Searchbar';
import styles from './Header.module.scss';
import accountIconWhite from '../../assets/account-white.svg';
import accountIconBlack from '../../assets/account-black.svg';

function Header({ className }) {
    const [sidebar, setSidebar] = useState(false);
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');
    //setSearch State
    //clear searchbar

    return (
        <header id='header' className={className}>
            <nav
                className={styles.nav}
                aria-label='main site navigation'
            >

                <NavLink
                    to='/'
                    onClick={() => {/*clear search input*/ }}
                    className={`${styles.logo} ${isAccountPath && styles.accLogo}`}
                >
                    NETPIX
                </NavLink>

                {
                    <>
                        <div className={styles.navBtns}>
                            {
                                !isAccountPath && <Searchbar />
                            }
                            <button
                                type='button'
                                onClick={() => setSidebar(prev => !prev)}
                                onMouseEnter={() => setSidebar(true)}
                                className={styles.imgBtn}
                                aria-expanded={sidebar}
                                aria-controls='account-sidebar'
                            >
                                <img
                                    src={isAccountPath ? accountIconBlack : accountIconWhite}
                                    alt=''
                                />
                            </button>
                        </div>

                        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                    </>
                }

            </nav>
        </header>
    )
};

export default Header;
