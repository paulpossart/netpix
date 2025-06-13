import { createContext, useContext, useState, useEffect } from 'react';
import { callGetMovies } from '../apiCalls/moviesCalls';

const ListContext = createContext();
const useList = () => useContext(ListContext);

function ListProvider({ children }) {
    const [myList, setMyList] = useState('');

    const fetchList = async () => {
        try {
            const data = await callGetMovies();
            setMyList(data)
        } catch (err) {
            console.log('The err:', err)
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <ListContext.Provider value={{ myList, setMyList, fetchList }}>
            {children}
        </ListContext.Provider>
    );
};

export { useList, ListProvider };