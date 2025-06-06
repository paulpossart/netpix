
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import searchIcon from '../../../assets/search.svg';
import accountWhite from '../../../assets/account-white.svg';
import accountBlack from '../../../assets/account-black.svg';

import Sidebar from './Sidebar';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Header({ className }) {
    const [sidebar, setSidebar] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const location = useLocation();
    const path = location.pathname;

    return (
        <header id='header' className={className}>
            <nav className={styles.navbar}>

                <h1>
                    <NavLink
                        className={styles.h1}
                        to='/'
                    >
                        NETPIX
                    </NavLink>
                </h1>

                <div className={styles.navBtns}>
                    {
                        path === '/account' ?
                            null :
                            <div className={`${styles.searchDiv} ${searchBar ? styles.searchDivOpen : styles.searchDivClosed}`}>
                                <img src={searchIcon} onClick={() => setSearchBar(prev => !prev)} />
                                <input
                                    className={searchBar ? styles.searchBarOpen : styles.searchBarClosed}
                                    type='search'
                                    placeholder='search' />
                            </div>
                    }
                    <img
                        src={path === '/account' ? accountBlack : accountWhite}
                        onClick={() => setSidebar(prev => !prev)}
                        onMouseEnter={() => setSidebar(true)} />
                </div>

                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

            </nav>
        </header>
    )
};

export default Header;
