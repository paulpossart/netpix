import { useEffect, useState, useRef } from 'react';
import { callFetchDetailsById, callFetchVideosById } from '../../apiCalls/tmdbCalls';
import chevronRight from '../../assets/chevron-right.svg';
import MovieModal from './MovieModal';
import dummyIcon from '../../assets/black-trailer.svg'


import styles from './movies.module.scss';
import { callGetMovies } from '../../apiCalls/moviesCalls';
import { useList } from '../../context/ListContext';

function MyList({ title, callFetch }) {
    const [fetch, setFetch] = useState([]);
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);
    const [modal, setModal] = useState(false);
    const { myList, setMyList, fetchList } = useList();

    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w300';

    /**useEffect(() => {
        fetchList();
    }, []);*/

    useEffect(() => {
        const getDetails = async (id) => {
            const details = await callFetchDetailsById(id);
            return details;
        }
        const fetchMovieDetails = async () => {
            try {
                const movieArray = await Promise.all(myList.map(movie =>
                    getDetails(movie.movie_id))
                )
                if (movieArray.length < 10) {
                    while (movieArray.length < 10) {
                        movieArray.push({ isDummy: true })
                    }
                }
                setMovies(movieArray)
                console.log('movieArray: ', movieArray)
            } catch (err) {
                console.log(err)
            }
        }

        fetchMovieDetails();

    }, [myList])



    //======================
    /*useEffect(() => {
            console.log('TheMovieArray:', fetch)
            //if (scrollRef.current) console.log('scrollRef:', scrollRef.current.scrollLeft);
    
        }, [fetch]);*/
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
        else if (movieVids.length > 0) vidKey = movieVids[randomIndexGenerator(movieVids)].key;
        else vidKey = null;
        console.log('key: ', vidKey);

        setModal(
            <MovieModal movie={movie} vidKey={vidKey} setModal={setModal} trailers={trailers} listItem={true} />
        )
    }


    return (
        <>
            <h2 className={styles.title}>My List</h2>
            {
                movies.length > 0 ? (
                    <div className={styles.moviesWrapper}>
                        <div className={modal ? styles.popOut : styles.popIn} >
                            {modal && modal}
                        </div>
                        <div onClick={() => setModal(false)} className={modal ? styles.overlayVisible : styles.overlayHidden} ></div>
                        <div className={styles.clickerLeft} onClick={handleClickLeft}><img src={chevronRight} /></div>
                        <div ref={scrollRef} className={styles.listContainer}>

                            <ul>

                                {movies.map((movie, index) =>
                                    movie.isDummy
                                        ? (<li key={index}><img src={dummyIcon} /></li>)
                                        : (<li
                                            onClick={() => handleClick(movie)}
                                            key={index}>

                                            {/*<h3 style={{ fontWeight: '900' }}>{movie.title}</h3>*/}
                                            <img src={`${imgSrc}${width}${movie.poster_path}`} />
                                        </li>)
                                )}

                            </ul>

                        </div >
                        <div className={styles.clickerRight} onClick={handleClickRight}><img src={chevronRight} /></div>

                    </div>
                ) : (
                    <p>No movies</p>
                )
            }
        </>
    );
};

export default MyList;
