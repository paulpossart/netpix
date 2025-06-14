
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import searchIcon from '../../../assets/search.svg';
import accountWhite from '../../../assets/account-white.svg';
import accountBlack from '../../../assets/account-black.svg';

import Sidebar from './Sidebar';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../../../context/SearchContext';

import { callSearchTmdb } from '../../../apiCalls/tmdbCalls';

import closeIcon from '../../../assets/cross.svg';

function Header({ className }) {
    const [sidebar, setSidebar] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');
    const { searchInput, setSearchInput, setQueryResults, queryResults } = useSearch();

    const handleSearch = async (e) => {
        e.preventDefault();
        const results = await callSearchTmdb(searchInput);
        // if (results?.message) setQueryResults(results.message);
       // console.log(results)
        setQueryResults(results)
    }

    useEffect(()=>{
            console.log('from Header', queryResults)
        }, [queryResults])


    return (
        <header id='header' className={className}>
            <nav className={isAccountPath ? styles.accNav : styles.homeNav}>

                <h1>
                    <NavLink
                        onClick={() => { setQueryResults([]); setSearchInput('') }}
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
                                <form onSubmit={handleSearch}>
                                    <input
                                        className={searchBar ? styles.searchBarOpen : styles.searchBarClosed}
                                        type='text'
                                        placeholder='search'
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                    <button type='button' onClick={() => { setSearchInput(''); setQueryResults(null) }} className={`${styles.iconBtn} ${styles.closeSearch}`}><img src={closeIcon} /></button>
                                    <button type='submit' className={styles.searchBtn}>Search</button>
                                </form>

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
