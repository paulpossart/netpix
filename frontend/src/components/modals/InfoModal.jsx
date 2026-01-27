import Portal from './Portal';
import { useEffect, useState } from 'react';
import { callFetchVideosById } from '../../apiCalls/tmdbCalls';
import Trailers from './InfoModalMovies/Trailers';

import styles from './modal.module.scss';
import addIcon from '../../assets/add.svg';
import removeIcon from '../../assets/tick.svg';
import moreIcon from '../../assets/chevron-down.svg';
import closeIcon from '../../assets/cross.svg';
import playIcon from '../../assets/play-button.svg';


function InfoModal({ modalData, onClose }) {
    const [vidKey, setVidKey] = useState(null);
    const [vidArray, setVidArray] = useState([]);
    const [moreInfoOpen, setMoreInfoOpen] = useState(false);

    const {
        movie = null,
        onClick = onClose,
    } = modalData;

    useEffect(() => {
        const randomIndexGenerator = (array) => {
            const idx = Math.floor(array.length * Math.random());
            return idx;
        }

        const fetchVids = async () => {
            const vids = await callFetchVideosById(movie.id);
            setVidArray(vids);
            setVidKey(vids[randomIndexGenerator(vids)].key);
            console.log(vids)
        };

        fetchVids();
    }, []);

    useEffect(() => {
        const moreInfo = document.getElementById('more-info');
        if (!moreInfo) return;

        const moreInfoHeight = moreInfo.scrollHeight;

        if (moreInfoOpen === false) moreInfo.style.height = `0px`;
        else moreInfo.style.height = `${moreInfoHeight}px`;

    }, [moreInfoOpen]);

    return (
        <Portal isOpen={!!modalData} onClick={onClick}>
            <section className={styles.InfoModal}>
                <h2
                    id='modal-title'
                    className={styles.srOnly}
                >
                    Movie Information
                </h2>

                <div
                    className={`
                        ${styles.iframeWrapper}
                        ${moreInfoOpen ? styles.closeWrapper : ''}
                    `}
                >

                    {
                        vidKey && !moreInfoOpen &&
                        <iframe
                            src={`https://www.youtube.com/embed/${vidKey}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        >
                        </iframe>
                    }

                </div>

                <div className={styles.titleAndBtnsDiv}>
                    <h3>{movie.title}</h3>
                    <div className={styles.buttons}>
                        <button
                            aria-label='Add to "My List"'
                            className={styles.iconBtn}
                        >
                            <img src={addIcon} alt='' />
                        </button>

                        <button
                            aria-label='More info'
                            className={styles.iconBtn}
                            onClick={() => setMoreInfoOpen(prev => !prev)}
                        >
                            <img
                                className={
                                    moreInfoOpen
                                        ? styles.expandUp
                                        : styles.expandDown
                                }
                                src={moreIcon}
                                alt=''
                            />
                        </button>


                        <button
                            onClick={onClick}
                            aria-label='Close modal'
                            className={styles.iconBtn}
                        >
                            <img src={closeIcon} alt='' />
                        </button>

                    </div>
                </div>

                <section
                    id='more-info'
                    className={styles.moreInfo}
                >
                    <div className={styles.moreInfoInner}>
                        <article>
                            {movie.overview}
                        </article>
                        <div>
                            <Trailers vidArray={vidArray} />
                        </div>
                    </div>

                </section>

                <div className={styles.links}>
                    <a
                        className={styles.redBtn}
                        href={`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img src={playIcon} alt='' />
                        Netflix
                    </a>
                    <a
                        className={styles.primeBtn}
                        href={`https://www.amazon.co.uk/gp/video/search?phrase=${encodeURIComponent(movie.title)}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img src={playIcon} alt='' />
                        Prime
                    </a>
                </div>
            </section>

        </Portal>
    );
};

export default InfoModal;
