import { useSearch } from "../../context/SearchContext";
import { useState, useEffect } from "react";
import styles from './movies.module.scss'
import MovieModal from "./MovieModal";
import { callFetchVideosById } from "../../apiCalls/tmdbCalls";

function SearchResults() {
    const { searchInput, queryResults } = useSearch();

    const [modal, setModal] = useState(false);

    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w300';

    useEffect(()=>{
        console.log('from searchResults', queryResults)
    }, [queryResults])



    const handleClick = async (movie) => {
        const movieVids = await callFetchVideosById(movie.id);
        console.log('vids:', movieVids)

        const movieClips = movieVids.filter(vid => vid.type === 'Clip');
        const trailers = movieVids.filter(vid => vid.type === 'Trailer');

        const randomIndexGenerator = (array) => {
            const idx = Math.floor(array.length * Math.random());
            return idx;
        }

        let vidKey;
        if (movieClips.length > 0) vidKey = movieClips[randomIndexGenerator(movieClips)].key
        else if (trailers.length > 0) vidKey = trailers[randomIndexGenerator(trailers)].key
        else if (movieVids.length > 0) vidKey = movieVids[randomIndexGenerator(movieVids)].key;
        else vidKey = null;
        console.log('key: ', vidKey);

        setModal(
            <MovieModal movie={movie} vidKey={vidKey} setModal={setModal} trailers={trailers} listItem={false} />
        )
    }


    return (
        <>
            <div>
                {queryResults?.results && queryResults?.results.length > 0
                    ? (<div className={styles.moviesWrapper}>
                        <div className={modal ? styles.popOut : styles.popIn} >
                            {modal && modal}
                        </div>
                        <div onClick={() => setModal(false)} className={modal ? styles.overlayVisible : styles.overlayHidden} ></div>

                        <div className={styles.searchContainer}>

                            <ul style={{ flexWrap: 'wrap' }}>

                                {queryResults.results.map((movie, index) =>
                                    <li
                                        onClick={() => handleClick(movie)}
                                        key={index}>

                                        {/*<h3 style={{ fontWeight: '900' }}>{movie.title}</h3>*/}
                                        {movie.poster_path
                                            ? <img src={`${imgSrc}${width}${movie.poster_path}`} />
                                            : <p>no image available</p>}
                                    </li>
                                )}

                            </ul>

                        </div >


                    </div>
                    )
                    : (
                        <p>{queryResults.message || 'No results found.'}</p>
                    )}
            </div>
        </>
    )
};

export default SearchResults;
