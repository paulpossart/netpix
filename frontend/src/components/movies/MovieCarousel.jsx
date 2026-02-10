import { useEffect, useState, useRef } from 'react';
import { useModal } from '../../context/ModalContext';
import { useList } from '../../context/ListContext';
import { callFetchDetailsById } from '../../apiCalls/tmdbCalls';
import styles from './MovieCarousel.module.scss';
import chevronRight from '../../assets/chevron-right.svg';
import dummyIcon from '../../assets/dummy-icon.svg';

function MovieCarousel({ title, callFetch }) {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);
    const { setModal } = useModal();
    const { myList } = useList();


    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w300';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await callFetch();
                setMovies(data);
            } catch (err) {
                console.log('Carousel err:', err);
            }
        };

        const getDetailsById = async (id) => {
            const details = await callFetchDetailsById(id);
            return details;
        };

        const fetchUserMovies = async () => {
            try {
                const movieArray = await Promise.all(myList.map(movie =>
                    getDetailsById(movie.movie_id))
                )
                if (movieArray.length < 10) {
                    while (movieArray.length < 10) {
                        movieArray.push({ isDummy: true })
                    }
                }
                setMovies(movieArray);
            } catch (err) {
                console.log(err)
            }
        };

        if (title === 'My List') fetchUserMovies();
        else fetchMovies();
    }, [myList]);

    const handleClick = async (movie) => {
        setModal({
            type: 'info',
            data: { movie }
        });
    };

    const handleClickRight = () => {
        scrollRef.current.scrollLeft += scrollRef.current.offsetWidth
    }

    const handleClickLeft = () => {
        scrollRef.current.scrollLeft -= scrollRef.current.offsetWidth
    }

    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            {
                movies.length > 0 ? (
                    <div className={styles.moviesWrapper}>
                        <div className={styles.clickerLeft} onClick={handleClickLeft}><img src={chevronRight} /></div>
                        <div ref={scrollRef} className={styles.moviesContainer}>
                            <ul>
                                {
                                    movies.map(((movie, index) =>
                                        movie.isDummy
                                            ? <li key={index}><img src={dummyIcon} /></li>
                                            : <li
                                                key={index}
                                                onClick={() => handleClick(movie)}
                                            >
                                                <img src={`${imgSrc}${width}${movie.poster_path}`} />
                                            </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={styles.clickerRight} onClick={handleClickRight}><img src={chevronRight} /></div>
                    </div>
                ) : (
                    <p>cannot display movies</p>
                )
            }
        </>
    )
};

export default MovieCarousel;
