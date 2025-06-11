import { useEffect, useState, useRef } from 'react';
import { callFetchPopular, callFetchVideosById } from '../../apiCalls/tmdbCalls';
import chevronRight from '../../assets/chevron-right.svg';

import styles from './movies.module.scss';

function PopularMovies() {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);
    const [modal, setModal] = useState(null);

    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w300';

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
        if (scrollRef.current) console.log('scrollRef:', scrollRef.current.scrollLeft);

    }, [movies]);

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


        let key;
        if (movieClips.length > 0) key = movieClips[randomIndexGenerator(movieClips)].key
        else if (trailers.length > 0) key = trailers[randomIndexGenerator(trailers)].key
        else if (movieVids.length > 0) movieVids[randomIndexGenerator(movieVids)].key;
        else key = null;
        console.log('key: ', key);

        setModal(
            <div className={styles.modal}>
                { key ? <iframe
                    src={`https://www.youtube.com/embed/${key}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                >
                </iframe> : <p>no video available</p>}
                <h3>{movie.title}</h3>
                <button>Trailer</button>
                {/*<button>Add</button>*/}
                <button>More</button>
                <a
                    href={`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                >Netflix</a>
                <a
                    href={`https://www.amazon.co.uk/gp/video/search?phrase=${encodeURIComponent(movie.title)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                >Prime</a>
                <button onClick={()=>setModal(null)}>Close</button>


            </div>
        )
    }


    return (
        <>
            <h2>Popular Movies</h2>
            {
                movies.length > 0 ? (
                    <div className={styles.moviesWrapper}>
                        <div /*onMouseLeave={() => setModal(null)}*/ className={modal ? styles.popOut : styles.popIn} >
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

export default PopularMovies;
