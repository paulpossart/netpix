import { useEffect, useState } from 'react';
import { callFetchPopular, callFetchVideosById, callFetchLogoById } from '../../apiCalls/tmdbCalls';
import MovieModal from './MovieModal';
import trailerIcon from '../../assets/black-trailer.svg';
import infoIcon from '../../assets/info.svg'
import styles from './movies.module.scss';
import closeIcon from '../../assets/cross.svg'

function Banner() {
    const [movie, setMovie] = useState(null);
    const [modal, setModal] = useState(false);
    const [movieKey, setMovieKey] = useState(0);
    const [logo, setLogo] = useState(null)

    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w1280';

    const randomIndexGenerator = (array) => {
        const idx = Math.floor(array.length * Math.random());
        return idx;
    }

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const data = await callFetchPopular();
                setMovie(data[randomIndexGenerator(data)]);
                //setMovie(data[3]);
                console.log(movie)

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


    //======================
    useEffect(() => {
        console.log('logo:', logo);
        console.log('movie:', movie)

    }, [logo, movie]);
    //======================

    const handleInfo = async (movie) => {
        const movieVids = await callFetchVideosById(movie.id);

        const movieClips = movieVids.filter(vid => vid.type === 'Clip');
        const trailers = movieVids.filter(vid => vid.type === 'Trailer');

        let vidKey;
        if (movieClips.length > 0) vidKey = movieClips[randomIndexGenerator(movieClips)].key
        else if (trailers.length > 0) vidKey = trailers[randomIndexGenerator(trailers)].key
        else if (movieVids.length > 0) vidKey = movieVids[randomIndexGenerator(movieVids)].key;
        else vidKey = null;
        console.log('key: ', vidKey);

        setModal(
            <MovieModal movie={movie} vidKey={vidKey} setModal={setModal} trailers={trailers} />
        )
    }

    const handleTrailer = async (movie) => {

        const movieVids = await callFetchVideosById(movie.id);

        const trailers = movieVids.filter(vid => vid.type === 'Trailer');

        let trailerKey;
        if (trailers.length > 0) trailerKey = trailers[randomIndexGenerator(trailers)].key
        else trailerKey = null;

        setModal(
            <div className={styles.modal}>
                {trailerKey ? <iframe
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

    const onLoad = async (movie) => {
        const movieVids = await callFetchVideosById(movie.id);
        const movieClips = movieVids.filter(vid => vid.type === 'Clip');
        const trailers = movieVids.filter(vid => vid.type === 'Trailer');

        let vidKey;
        if (movieClips.length > 0) vidKey = movieClips[randomIndexGenerator(movieClips)].key
        else if (trailers.length > 0) vidKey = trailers[randomIndexGenerator(trailers)].key
        else if (movieVids.length > 0) vidKey = movieVids[randomIndexGenerator(movieVids)].key;
        else vidKey = null;

        setMovieKey(prev => ({ ...prev, [movie.id]: vidKey })), 3000
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
                        <div className={modal ? styles.popOut : styles.popIn} >
                            {modal && modal}
                        </div>
                        <div onClick={() => setModal(false)} className={modal ? styles.overlayVisible : styles.overlayHidden} ></div>

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
                                        <button onClick={() => handleTrailer(movie)} className={styles.whtBtn} ><img src={trailerIcon} />Play Trailer</button>
                                        <button onClick={() => handleInfo(movie)} className={styles.opaqueBtn}><img src={infoIcon} />More Info</button>
                                    </div>

                                </div>

                            </div>
                            <img
                                src={`${imgSrc}${width}${movie.backdrop_path}`}
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
