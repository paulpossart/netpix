import styles from './movies.module.scss';
import trailerIcon from '../../assets/trailer.svg'
import closeIcon from '../../assets/cross.svg'
import playIcon from '../../assets/play-button.svg'
import addIcon from '../../assets/add.svg';
import tickIcon from '../../assets/tick.svg'
import { useList } from '../../context/ListContext';

import { callCreateMoviesById, callGetMovies, callDeleteMoviesById } from '../../apiCalls/moviesCalls';

function MovieModal({ movie, vidKey, setModal, trailers, listItem }) {

    const { fetchList } = useList()

    const addToList = async (id) => {
        try {
            const data = await callCreateMoviesById(id);
            setModal(
                <div className={styles.modal}>
                    <p style={{ padding: '2rem' }}>{data?.message}</p>
                    <div className={styles.btnContainer}>
                        <div className={styles.buttons}>
                            <button className={styles.btn1} onClick={() => setModal(null)}>OK</button>
                        </div>
                    </div>

                </div>
            )
        } catch (err) {
            setModal(
                <div className={styles.modal}>
                    <p style={{ padding: '2rem' }}>{err?.message}</p>
                    <div className={styles.btnContainer}>
                        <div className={styles.buttons}>
                            <button className={styles.btn1} onClick={() => setModal(null)}>OK</button>
                        </div>
                    </div>

                </div>
            )
        } finally {
            fetchList()
        }
    }

    const handleDelete = async (id) => {
        try {
            const data = await callDeleteMoviesById(id);
            setModal(
                <div className={styles.modal}>
                    <p style={{ padding: '2rem' }}>{data?.message}</p>
                    <div className={styles.btnContainer}>
                        <div className={styles.buttons}>
                            <button className={styles.btn1} onClick={() => setModal(null)}>OK</button>
                        </div>
                    </div>

                </div>
            )

        } catch (err) {
            setModal(
                <div className={styles.modal}>
                    <p style={{ padding: '2rem' }}>{err?.message}</p>
                    <div className={styles.btnContainer}>
                        <div className={styles.buttons}>
                            <button className={styles.btn1} onClick={() => setModal(null)}>OK</button>
                        </div>
                    </div>

                </div>
            )
        } finally {
            fetchList()
        }
    }


    const handleClick = async () => {

        const randomIndexGenerator = (array) => {
            const idx = Math.floor(array.length * Math.random());
            return idx;
        }

        let trailerKey;
        if (trailers.length > 0) trailerKey = trailers[randomIndexGenerator(trailers)].key
        else trailerKey = null;

        setModal(
            <div className={styles.modal}>
                {vidKey ? <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                >
                </iframe> : <p style={{ padding: '12px' }}>no video available</p>}

                <div className={styles.btnContainer}>

                    <div className={styles.buttons}>

                        <button className={styles.iconBtn} onClick={() => setModal(null)}><img src={closeIcon} /></button>
                    </div>
                </div>

            </div>
        )
    }


    return (
        <div className={styles.modal}>
            {vidKey ? <iframe
                src={`https://www.youtube.com/embed/${vidKey}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            >
            </iframe> : <p style={{ paddingTop: '12px' }}>no video available</p>}

            <div className={styles.btnContainer}>
                <h3>{movie.title}</h3>
                <div className={styles.buttons}>

                    <button onClick={listItem ? () => handleDelete(movie.id) : () => addToList(movie.id)} className={styles.iconBtn}><img src={listItem ? tickIcon : addIcon} /></button>
                    <button onClick={handleClick} className={styles.iconBtn}><img src={trailerIcon} /></button>
                    <button className={styles.iconBtn} onClick={() => setModal(null)}><img src={closeIcon} /></button>

                </div>
            </div>

            {/*<button>More</button>*/}

            <div className={styles.links}>
                <a
                    className={styles.btn1}
                    href={`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                ><img src={playIcon} />Netflix</a>
                <a
                    className={styles.primeBtn}
                    href={`https://www.amazon.co.uk/gp/video/search?phrase=${encodeURIComponent(movie.title)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                ><img src={playIcon} />Prime</a>
            </div>

        </div>
    )
};

export default MovieModal;