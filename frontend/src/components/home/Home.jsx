import MovieCarousel from './MovieCarousel';
import Banner from './Banner';
import { callFetchPopular, callFetchUpcoming, callFetchNowPlaying } from '../../apiCalls/tmdbCalls';
import { useState } from 'react';
import SearchResults from './SearchResults';
import { useSearch } from '../../context/SearchContext';

function Home() {
    const {queryResults} = useSearch();

    return (
        <>
            <main>
                {queryResults?.length > 0 ? (
                    <SearchResults />
                ) : (
                    <>
                        <Banner />
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
