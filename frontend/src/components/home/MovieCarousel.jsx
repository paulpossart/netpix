import { useEffect, useState, useRef } from 'react';
import { callFetchPopular, callFetchVideosById } from '../../apiCalls/tmdbCalls';
import chevronRight from '../../assets/chevron-right.svg';
import MovieModal from './MovieModal';

import styles from './movies.module.scss';

function MovieCarousel({title, callFetch}) {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);
    const [modal, setModal] = useState(false);

    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w300';

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const data = await callFetch();
                setMovies(data)
            } catch (err) {
                console.log('The err:', err)
            }
        }
        fetchPopular();
    }, [])
 
    //======================
   {/* useEffect(() => {
        console.log('movieArray:', movies)
        if (scrollRef.current) console.log('scrollRef:', scrollRef.current.scrollLeft);

    }, [movies]);*/}
    //======================

    const handleClickRight = () => {
        scrollRef.current.scrollLeft += scrollRef.current.offsetWidth
    }

    const handleClickLeft = () => {
        scrollRef.current.scrollLeft -= scrollRef.current.offsetWidth
    }

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
        else if (movieVids.length > 0) vidKey =  movieVids[randomIndexGenerator(movieVids)].key;
        else vidKey = null;
        console.log('key: ', vidKey);

        setModal(
            <MovieModal movie={movie} vidKey={vidKey} setModal={setModal} trailers={trailers} />
        )
    }


    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            {
                movies.length > 0 ? (
                    <div className={styles.moviesWrapper}>
                        <div className={modal ? styles.popOut : styles.popIn} >
                            {modal && modal}
                        </div>
                        <div onClick={() => setModal(false)} className={modal ? styles.overlayVisible : styles.overlayHidden} ></div>
                        <div className={styles.clickerLeft} onClick={handleClickLeft}><img src={chevronRight} /></div>
                        <div ref={scrollRef} className={styles.moviesContainer}>

                            <ul>

                                {movies.map((movie, index) =>
                                    <li
                                        onClick={() => handleClick(movie)}
                                        key={index}>

                                        {/*<h3 style={{ fontWeight: '900' }}>{movie.title}</h3>*/}
                                        <img src={`${imgSrc}${width}${movie.poster_path}`} />
                                    </li>
                                )}

                            </ul>

                        </div >
                        <div className={styles.clickerRight} onClick={handleClickRight}><img src={chevronRight} /></div>

                    </div>
                ) : (
                    <p>no movies</p>
                )
            }
        </>
    );
};

export default MovieCarousel;
