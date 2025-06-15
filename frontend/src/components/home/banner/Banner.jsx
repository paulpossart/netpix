import { useEffect, useState } from 'react';
import { fetchVidKeyAndTrailers, randomIndexGenerator } from '../../../helpers/helperFunctions'
import { infoModalContent } from '../../modal/InfoModal';
import { trailerModalContent } from '../../modal/TrailerModal';
import { useModal } from "../../../context/ModalContext";
import { callFetchPopular, callFetchVideosById, callFetchLogoById } from '../../../apiCalls/tmdbCalls';
import styles from './banner.module.scss';
import trailerIcon from '../../../assets/black-trailer.svg';
import infoIcon from '../../../assets/info.svg'


function Banner() {
    const [movie, setMovie] = useState(null);
    const [modal, setModal] = useState(false);
    const [logo, setLogo] = useState(null);
    const { setInfoModal, setTrailerModal } = useModal();

    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w1280';

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const data = await callFetchPopular();
                setMovie(data[randomIndexGenerator(data)]);
                //setMovie(data[1])
            } catch (err) {
                console.log('The err:', err)
            }
        }

        fetchPopular();

        const interval = setInterval(() => {
            fetchPopular();
        }, 10 * 1000)

        return () => clearInterval(interval)
    }, [])


    const handleInfo = async (movie) => {
        const {YTKey} = await fetchVidKeyAndTrailers(movie, callFetchVideosById)

        infoModalContent({
            setter: setInfoModal,
            vidKey: YTKey,
            movie: movie,
            lisItem: false
        });
    }

    const handleTrailer = async (movie) => {

        console.log('called')
        const { trailers } = await fetchVidKeyAndTrailers(movie, callFetchVideosById);
        console.log(trailers)

        let trailerKey;
        if (trailers.length > 0) trailerKey = trailers[randomIndexGenerator(trailers)].key
        else trailerKey = null;

        trailerModalContent({ setter: setTrailerModal, vidKey: trailerKey })
    }

    const fetchLogo = async (movie) => {
        try {
            const data = await callFetchLogoById(movie.id);
            const englishLogos = data.filter(logo => (logo.iso_639_1 === 'en'))
            setLogo(englishLogos[0])

        } catch (err) {
            console.log('The err:', err)
            setLogo(null)
        }
    }

    return (
        <>
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
                                        <button style={{ whiteSpace: 'nowrap' }} onClick={() => handleTrailer(movie)} className={styles.whtBtn} ><img src={trailerIcon} />Play Trailer</button>
                                        <button style={{ whiteSpace: 'nowrap' }} onClick={() => handleInfo(movie)} className={styles.opaqueBtn}><img src={infoIcon} />More Info</button>
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
                        </div >
                    </div >
                ) : (
                    <p>no movies</p>
                )
            }
        </>
    );
};

export default Banner;
