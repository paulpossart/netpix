import { useState } from 'react';
import { useSearch } from '../../../context/SearchContext';
import { callSearchTmdb } from '../../../apiCalls/tmdbCalls';
import styles from './searchbar.module.scss';
import searchIcon from '../../../assets/search.svg';
import closeIcon from '../../../assets/cross.svg';

function Searchbar({clearInput}) {
    const [searchbar, setSearchbar] = useState(false);
    const { searchInput, setSearchInput, setQueryResults } = useSearch();

    const handleSearch = async (e) => {
        e.preventDefault();
        const results = await callSearchTmdb(searchInput);
        setQueryResults(results)
    }

    return (
        <div className={`${styles.searchDiv} ${searchbar ? styles.searchDivOpen : styles.searchDivClosed}`}>
            <img src={searchIcon} onClick={() => setSearchbar(prev => !prev)} />
            
            <form onSubmit={handleSearch}>
                <input
                    type='text'
                    placeholder='search'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type='button' onClick={clearInput} className={styles.clearSearchBtn}><img src={closeIcon} /></button>
                <button type='submit' className={styles.searchBtn}>Search</button>
            </form>

        </div>
    );
};

export default Searchbar;
