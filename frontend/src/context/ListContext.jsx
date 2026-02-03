import { createContext, useContext, useState, useEffect } from 'react';
import { callGetMovieList } from '../apiCalls/moviesCalls';

const ListContext = createContext();
const useList = () => useContext(ListContext);

function ListProvider({ children }) {
    const [myList, setMyList] = useState([]);

    const fetchList = async () => {
        try {
            const data = await callGetMovieList();
            setMyList(data);

        } catch (err) {
            console.log('List err:', err)
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <ListContext.Provider value={{ myList, setMyList, fetchList }}>
            {children}
        </ListContext.Provider>
    );
};

export { useList, ListProvider };
