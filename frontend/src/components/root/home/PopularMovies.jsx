import { useEffect, useState } from 'react';
import { callFetchPopular } from '../../../apiCalls/tmdbCalls';

function PopularMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const data = await callFetchPopular();
                setMovies(data)
            } catch (err) {
                console.log('The err:', err)
            }
        }
        fetchPopular();
    }, [])

    useEffect(() => {
        console.log('movieArray:', movies)
    }, [movies])

    return (
        <>
            <h2>Popular Movies</h2>
            {
                movies.length > 0 ? (
                    <ul>

                        {movies.map((movie, index) =>
                            <li>
                                <br></br>
                                <h3 style={{fontWeight: '900'}}>{movie.title}</h3>
                                <p>{movie.overview}</p>
                                <br></br>
                            </li>
                        )}

                    </ul>
                ) : (
                    <p>no movies</p>
                )
            }
        </>
    );
};

export default PopularMovies;
