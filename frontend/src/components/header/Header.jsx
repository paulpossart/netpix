
import { NavLink, useLocation } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { useState, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import Searchbar from './searchbar/Searchbar';
import styles from './header.module.scss';
import accountWhite from '../../assets/account-white.svg';
import accountBlack from '../../assets/account-black.svg';

function Header({ className }) {
    const [sidebar, setSidebar] = useState(false);
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');
    const isNotFound = path === '/not-found';
    const { setSearchInput, setQueryResults } = useSearch();

    const clearInput = () => {
        setQueryResults([]);
        setSearchInput('')
    };

    return (
        <header id='header' className={className}>
            <nav className={isAccountPath ? styles.accNav : styles.homeNav}>

                <h1>
                    <NavLink
                        onClick={clearInput}
                        className={isAccountPath ? styles.accH1 : styles.homeH1}
                        to='/'
                    >
                        NETPIX
                    </NavLink>
                </h1>

                {
                    isNotFound ? null :
                        <>
                            <div className={styles.navBtns}>
                                {
                                    isAccountPath ? null :
                                        <Searchbar clearInput={clearInput} />
                                }
                                <img
                                    src={isAccountPath ? accountBlack : accountWhite}
                                    onClick={() => setSidebar(prev => !prev)}
                                    onMouseEnter={() => setSidebar(true)} />
                            </div>

                            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                        </>
                }
            </nav>
        </header >
    )
};

export default Header;
