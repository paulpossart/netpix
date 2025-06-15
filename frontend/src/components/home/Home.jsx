import { useEffect } from 'react';

import { useSearch } from '../../context/SearchContext';
import { useList } from '../../context/ListContext';
import {
    callFetchPopular,
    callFetchUpcoming,
    callFetchNowPlaying
} from '../../apiCalls/tmdbCalls';
import MovieCarousel from './movieCarousel/MovieCarousel';
import SearchResults from './searchResults/SearchResults';
import Banner from './banner/Banner';
import MyList from './myList/MyList';

function Home() {
    const { queryResults } = useSearch();
    const { myList, fetchList } = useList();

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <main>
                {queryResults?.success ? (
                    <SearchResults />
                ) : (
                    <>
                        <Banner />
                        {myList?.length > 0 && <MyList />}
                        <MovieCarousel title='Popular Movies' callFetch={callFetchPopular} />
                        <MovieCarousel title='Upcoming Movies' callFetch={callFetchUpcoming} />
                        <MovieCarousel title='Now in Cinemas' callFetch={callFetchNowPlaying} />
                    </>
                )
                }
            </main>
        </>
    )
}

export default Home;
