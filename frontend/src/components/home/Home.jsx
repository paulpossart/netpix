import MovieCarousel from './MovieCarousel';
import Banner from './Banner';
import { callFetchPopular, callFetchUpcoming, callFetchNowPlaying } from '../../apiCalls/tmdbCalls';
import { useState } from 'react';
import SearchResults from './SearchResults';
import { useSearch } from '../../context/SearchContext';
import MyList from './MyList';
import { useList } from '../../context/ListContext';

function Home() {
    const {queryResults} = useSearch();
    const {myList} = useList()

    return (
        <>
            <main>
                {queryResults?.length > 0 ? (
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
