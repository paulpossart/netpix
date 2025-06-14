import { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();
const useSearch = () => useContext(SearchContext);

function SearchProvider({ children }) {
    const [searchInput, setSearchInput] = useState('');
    const [queryResults, setQueryResults] = useState([{ results: [], message: '' }])

    return (
        <SearchContext.Provider value={{ searchInput, setSearchInput, queryResults, setQueryResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export { useSearch, SearchProvider };