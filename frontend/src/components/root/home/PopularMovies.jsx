import { useEffect, useState, useRef } from 'react';
import { callFetchPopular } from '../../../apiCalls/tmdbCalls';
import chevronRight from '../../../assets/chevron-right.svg';

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


    const handleOnMouseEnter = (movie) => {
        setModal(
            <div>
                <p>{movie.title}</p>
            </div>
        )

    }


    return (
        <>
            <h2>Popular Movies</h2>
            {
                movies.length > 0 ? (
                    <div className={styles.moviesWrapper}>
                        <div onMouseLeave={() => setModal(null)} className={modal ? styles.popOut : styles.popIn} >
                            {modal && modal}
                        </div>
                        <div onClick={() => setModal(false)} className={modal ? styles.overlayVisible : styles.overlayHidden} ></div>
                        <div className={styles.clickerLeft} onClick={handleClickLeft}><img src={chevronRight} /></div>
                        <div ref={scrollRef} className={styles.moviesContainer}>

                            <ul>

                                {movies.map((movie, index) =>
                                    <li
                                        onMouseEnter={() => handleOnMouseEnter(movie)}
                                        onMouseLeave={() => handleOnMouseEnter(null)}
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
