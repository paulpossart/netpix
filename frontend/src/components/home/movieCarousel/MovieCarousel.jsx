import { useEffect, useState, useRef } from 'react';
import { callFetchVideosById } from '../../../apiCalls/tmdbCalls';
import { fetchVidKeyAndTrailers } from "../../../helpers/helperFunctions";
import { infoModalContent } from "../../modal/InfoModal";
import { useModal } from "../../../context/ModalContext";
import styles from './movieCarousel.module.scss';
import chevronRight from '../../../assets/chevron-right.svg';

function MovieCarousel({ title, callFetch }) {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);
    const [modal, setModal] = useState(false);
    const { setInfoModal } = useModal();

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
            lisItem: false
        });
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
                                        key={index}
                                    >
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
