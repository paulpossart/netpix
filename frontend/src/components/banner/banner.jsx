import { useEffect, useState } from 'react';
import { randomIndexGenerator } from '../../utils/helpers';
import { useModal } from '../../context/ModalContext';
import { callFetchPopular, callFetchLogoById } from '../../apiCalls/tmdbCalls';
import styles from './banner.module.scss';
import infoIcon from '../../assets/info-black.svg'

function Banner() {
    const [movie, setMovie] = useState(null);
    const [logo, setLogo] = useState(null);
    const { setModal } = useModal();

    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w1280';

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const data = await callFetchPopular();
                setMovie(data[randomIndexGenerator(data)]);
            } catch (err) {
                console.log('Banner err:', err)
            }
        };

        fetchPopular();

        const interval = setInterval(() => {
            fetchPopular();
        }, 10 * 1000)

        return () => clearInterval(interval)
    }, []);

    const handleClick = async (movie) => {
        setModal({
            type: 'info',
            data: { movie }
        });
    };

    const fetchLogo = async (movie) => {
        try {
            const data = await callFetchLogoById(movie.id);
            const englishLogos = data.filter(logo => (logo.iso_639_1 === 'en'))
            setLogo(englishLogos[0])

        } catch (err) {
            console.log('Logo err:', err)
            setLogo(null)
        }
    }


    return (
        <section>
            <h2 className={styles.title}></h2>
            {
                movie ? (
                    <div className={styles.moviesWrapper}>
                        <div className={styles.bannerContainer}>
                            <div className={styles.imgOverlay}>
                                <div className={styles.bannerInfo}>
                                    <div className={styles.logo}>
                                        {
                                            logo
                                                ? <img src={`${imgSrc}${width}${logo.file_path}`} />
                                                : <h3>{movie.title}</h3>
                                        }
                                    </div>
                                    <div className={styles.btnDiv}>
                                        <button
                                            onClick={() => handleClick(movie)}
                                            className={styles.infoBtn}
                                        >
                                            <img src={infoIcon} alt='' />
                                            More Info
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <img
                                src={`${imgSrc}${width}${movie.backdrop_path}`
                                }
                                onLoad={() => {
                                    setLogo(null);
                                    fetchLogo(movie)

                                }}
                            />
                        </div>

                    </div>
                ) : null
            }
        </section>
    );
};

export default Banner;
