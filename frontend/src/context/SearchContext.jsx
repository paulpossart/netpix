import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();
const useSearch = () => useContext(SearchContext);

function SearchProvider({ children }) {
    const [searchInput, setSearchInput] = useState('');
    const [queryResults, setQueryResults] = useState({ results: [], message: '' });

    const clearQueryResults = () => setQueryResults({ results: [], message: '' });

    return (
        <SearchContext.Provider value={{
            searchInput,
            setSearchInput,
            queryResults,
            setQueryResults,
            clearQueryResults
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export { useSearch, SearchProvider };