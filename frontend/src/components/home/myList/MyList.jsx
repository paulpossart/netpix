import { useEffect, useState, useRef } from 'react';
import { callFetchDetailsById, callFetchVideosById } from '../../../apiCalls/tmdbCalls';
import { fetchVidKeyAndTrailers } from "../../../helpers/helperFunctions";
import { infoModalContent } from "../../modal/InfoModal";
import { useModal } from "../../../context/ModalContext";
import { useList } from '../../../context/ListContext';
import styles from './myList.module.scss';
import dummyIcon from '../../../assets/black-trailer.svg';
import chevronRight from '../../../assets/chevron-right.svg';

function MyList() {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);
    const [modal, setModal] = useState(false);
    const { myList } = useList();
    const { setInfoModal } = useModal();

    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w300';

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


    const handleClickRight = () => {
        scrollRef.current.scrollLeft += scrollRef.current.offsetWidth
    }

    const handleClickLeft = () => {
        scrollRef.current.scrollLeft -= scrollRef.current.offsetWidth
    }

    const handleClick = async (movie) => {
        const { YTKey } = await fetchVidKeyAndTrailers(movie, callFetchVideosById);
        infoModalContent({
            setter: setInfoModal,
            vidKey: YTKey,
            movie: movie,
            listItem: true
        });
    }


    return (
        <>
            <h2 className={styles.title}>My List</h2>
            {
                movies.length > 0 ? (
                    <div className={styles.moviesWrapper}>
                
                        <div className={styles.clickerLeft} onClick={handleClickLeft}><img src={chevronRight} /></div>
                        <div ref={scrollRef} className={styles.listContainer}>

                            <ul>

                                {movies.map((movie, index) =>
                                    movie.isDummy
                                        ? (<li key={index}><img src={dummyIcon} /></li>)
                                        : (<li
                                            onClick={() => handleClick(movie)}
                                            key={index}>

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
