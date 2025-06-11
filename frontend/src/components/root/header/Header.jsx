
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
    const path = useLocation().pathname;
     const isAccountPath = path.startsWith('/account');

    return (
        <header id='header' className={className}>
            <nav className={isAccountPath ? styles.accNav : styles.homeNav}>

                <h1>
                    <NavLink
                        className={isAccountPath ? styles.accH1 : styles.homeH1}
                        to='/'
                    >
                        NETPIX
                    </NavLink>
                </h1>

                <div className={styles.navBtns}>
                    {
                        isAccountPath ?
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
                        src={isAccountPath ? accountBlack : accountWhite}
                        onClick={() => setSidebar(prev => !prev)}
                        onMouseEnter={() => setSidebar(true)} />
                </div>

                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

            </nav>
        </header>
    )
};

export default Header;
