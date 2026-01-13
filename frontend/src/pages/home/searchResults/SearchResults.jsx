import { useSearch } from '../../../context/SearchContext';
import styles from './SearchResults.module.scss';


function SearchResults() {
  const { queryResults } = useSearch();
  //   const { setInfoModal } = useModal();
  const imgSrc = 'https://image.tmdb.org/t/p/';
  const width = 'w300';

  return (
    <>
      <div>
        {queryResults.results.length > 0
          ? (
            <div className={styles.SearchResults}>
              <div className={styles.resultsContainer}>
                <ul>
                  {queryResults.results.map((movie, index) =>
                    <li key={movie.id}>
                      {movie.poster_path
                        ? <img src={`${imgSrc}${width}${movie.poster_path}`} />
                        : <div className={styles.noImgLi}>
                          <h3>{movie.title}</h3>
                          <p>no image available</p>
                        </div>
                      }
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )
          : (<p>{queryResults.message}</p>)}
      </div>
    </>
  )
}

export default SearchResults;