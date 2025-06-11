import MovieCarousel from './MovieCarousel';
import { callFetchPopular, callFetchUpcoming, callFetchNowPlaying } from '../../apiCalls/tmdbCalls';

function Home() {
    return (
        <>
            <main>
                <MovieCarousel title='Popular Movies' callFetch={callFetchPopular} />
                <MovieCarousel title='Upcoming Movies' callFetch={callFetchUpcoming} />
                <MovieCarousel title='Now in Cinemas' callFetch={callFetchNowPlaying} />
            </main>
        </>
    )
}

export default Home;
