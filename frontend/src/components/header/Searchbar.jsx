import { useState, useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import { callSearchTmdb } from '../../apiCalls/tmdbCalls';
import styles from './Searchbar.module.scss';
import searchIcon from '../../assets/search.svg';
import clearIcon from '../../assets/cross.svg';

function Searchbar({ clearInput, searchbarOpen, setSearchbarOpen }) {
    const { searchInput, setSearchInput, setQueryResults } = useSearch();

    useEffect(() => {
        if (searchbarOpen) {
            const searchInput = document.getElementById('search-input');
            searchInput.focus()
        }
    }, [searchbarOpen]);


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchInput) return;
        const results = await callSearchTmdb(searchInput);
        setQueryResults(results)
    };

    const toggleSearchbar = () => {
        setSearchbarOpen(prev => !prev);
        clearInput();
    };

    return (
        <div
            className={
                `${styles.Searchbar} 
                 ${!searchbarOpen ? styles.SearchbarClosed : ''}`
            }
        >
            <button
                type='button'
                className={styles.toggleSearchBtn}
                aria-label={searchbarOpen ? 'Close search bar' : 'Open search bar'}
                onClick={toggleSearchbar}
            >
                <img src={searchIcon} alt='' />
            </button>

            <form onSubmit={handleSearch}>
                <input
                    id='search-input'
                    type='text'
                    placeholder='search'
                    value={searchInput}
                    autoComplete="off"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    type='button'
                    className={styles.clearSearch}
                    aria-label='clear searchbar'
                    onClick={clearInput}
                >
                    <img src={clearIcon} alt='' />
                </button>
                <button type='submit' className={styles.submitSearch}>
                    Search
                </button>
            </form>

        </div>
    );
};

export default Searchbar;
