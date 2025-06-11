import styles from './movies.module.scss';
import trailerIcon from '../../assets/trailer.svg'
import closeIcon from '../../assets/cross.svg'
import playIcon from '../../assets/play-button.svg'

function MovieModal({ movie, vidKey, setModal, trailers }) {
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
                
                <div className={styles.buttons}
                style={{justify: 'center'}}>
                    
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
                    <button onClick={handleClick} className={styles.iconBtn}><img src={trailerIcon} /></button>
                    <button className={styles.iconBtn} onClick={() => setModal(null)}><img src={closeIcon} /></button>
                </div>
            </div>


            {/*<button>Add</button>*/}
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