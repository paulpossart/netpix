import { useSearch } from "../../../context/SearchContext";
import { callFetchVideosById } from "../../../apiCalls/tmdbCalls";
import { fetchVidKeyAndTrailers } from "../../../helpers/helperFunctions";
import { infoModalContent } from "../../modal/InfoModal";
import { useModal } from "../../../context/ModalContext";
import styles from '../movies.module.scss'

function SearchResults() {
    const { queryResults } = useSearch();
    const { setInfoModal } = useModal();
    const imgSrc = 'https://image.tmdb.org/t/p/';
    const width = 'w300';

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
            <div>
                {queryResults?.results && queryResults?.results.length > 0
                    ? (<div className={styles.moviesWrapper}>

                        <div className={styles.searchContainer}>
                            <ul style={{ flexWrap: 'wrap' }}>

                                {queryResults.results.map((movie, index) =>
                                    <li
                                        onClick={() => handleClick(movie)}
                                        key={index}
                                    >
                                        {movie.poster_path
                                            ? <img src={`${imgSrc}${width}${movie.poster_path}`} />
                                            : <p>no image available</p>}
                                    </li>
                                )}

                            </ul>
                        </div >
                    </div>
                    )
                    : (
                        <p>{queryResults.message || 'No results found.'}</p>
                    )}
            </div>
        </>
    )
};

export default SearchResults;
