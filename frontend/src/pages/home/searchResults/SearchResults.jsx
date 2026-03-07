import { useSearch } from '../../../context/SearchContext';
import { useModal } from '../../../context/ModalContext';
import styles from './SearchResults.module.scss';

function SearchResults() {
  const { queryResults } = useSearch();
  const { setModal } = useModal();
  const imgSrc = 'https://image.tmdb.org/t/p/';
  const width = 'w300';

  const handleClick = async (movie) => {
    setModal({
      type: 'info',
      data: { movie }
    });
  };

  return (
    <>
      <section>
        <h2 className={styles.srOnly}>Search Results</h2>

        {queryResults.results.length > 0
          ? (
            <div className={styles.SearchResults}>
              <div className={styles.resultsContainer}>
                <ul>
                  {queryResults.results.map((movie, index) =>
                    <li key={movie.id}>
                      <button onClick={() => handleClick(movie)}>
                        {movie.poster_path
                          ? <img
                            src={`${imgSrc}${width}${movie.poster_path}`}
                            alt={`Poster for the movie ${movie.title}`}
                          />
                          : <div className={styles.noImgLi}>
                            <h3>{movie.title}</h3>
                            <p>no image available</p>
                          </div>
                        }
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )

          : (<p>{queryResults.message}</p>)}

      </section>
    </>
  )
}

export default SearchResults;