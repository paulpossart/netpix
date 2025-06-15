import { useList } from '../../context/ListContext';
import { useModal } from '../../context/ModalContext';
import { callCreateMoviesById, callDeleteMoviesById } from '../../apiCalls/moviesCalls';
import { textModalContent } from './TextModal';
import { trailerModalContent } from './TrailerModal';
import { callFetchVideosById } from '../../apiCalls/tmdbCalls';
import { fetchVidKeyAndTrailers, randomIndexGenerator } from '../../helpers/helperFunctions';
import styles from './modal.module.scss';
import trailerIcon from '../../assets/trailer.svg'
import closeIcon from '../../assets/cross.svg'
import playIcon from '../../assets/play-button.svg'
import addIcon from '../../assets/add.svg';
import tickIcon from '../../assets/tick.svg'

const infoModalContent = ({
    setter, vidKey, movie, listItem
}) => {
    setter({
        vidKey, movie, listItem
    })
}

function InfoModal({ modalData }) {
    const { fetchList } = useList()
    const { setTextModal, setInfoModal, setTrailerModal } = useModal();

    const addToList = async (id) => {
        console.log('add')
        try {
            const data = await callCreateMoviesById(id);

            textModalContent({
                setter: setTextModal,
                onClick: () => setTextModal(null),
                message: data?.message
            });
        } catch (err) {
            textModalContent({
                setter: setTextModal,
                onClick: () => setTextModal(null),
                message: err?.message
            });
        } finally {
            fetchList()
        }
    }

    const removeFromList = async (id) => {
        try {
            const data = await callDeleteMoviesById(id);

            textModalContent({
                setter: setTextModal,
                onClick: () => setTextModal(null),
                message: data?.message
            });
        } catch (err) {
            textModalContent({
                setter: setTextModal,
                onClick: () => setTextModal(null),
                message: err?.message
            });
        } finally {
            fetchList()
        }
    }

    const handleTrailers = async (movie, callFetch) => {
        console.log('called')
        const { trailers } = await fetchVidKeyAndTrailers(movie, callFetch);
        console.log(trailers)
        
         let trailerKey;
        if (trailers.length > 0) trailerKey = trailers[randomIndexGenerator(trailers)].key
        else trailerKey = null;

        trailerModalContent({ setter: setTrailerModal, vidKey: trailerKey })
    }

    if (!modalData) return null;

    const { vidKey, movie, listItem } = modalData;

    return (
        <>
            <div onClick={() => setInfoModal(null)} className={styles.modalOverlay}></div>
            <div className={styles.modal}>
                {
                    vidKey ?
                        <iframe
                            src={`https://www.youtube.com/embed/${vidKey}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        >
                        </iframe>
                        : <p style={{ paddingTop: '12px' }}>no video available</p>
                }

                <div className={styles.btnContainer}>
                    <h3>{movie.title}</h3>
                    <div className={styles.buttons}>

                        <button onClick={listItem ? () => removeFromList(movie.id) : () => addToList(movie.id)} className={styles.iconBtn}><img src={listItem ? tickIcon : addIcon} /></button>
                        <button onClick={() => handleTrailers(movie, callFetchVideosById)} className={styles.iconBtn}><img src={trailerIcon} /></button>
                        <button className={styles.iconBtn} onClick={() => setInfoModal(null)}><img src={closeIcon} /></button>

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
        </ >
    );
};

export { infoModalContent, InfoModal };
