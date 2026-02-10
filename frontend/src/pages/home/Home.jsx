import { useSearch } from '../../context/SearchContext';
import SearchResults from './searchResults/SearchResults';

import { useList } from '../../context/ListContext';
import {
  callFetchPopular,
  callFetchNowPlaying,
  callFetchUpcoming,
  callFetchDetailsById
} from '../../apiCalls/tmdbCalls';
import MovieCarousel from '../../components/movies/MovieCarousel';
import Banner from '../../components/banner/banner';
import styles from './Home.module.scss';


function Home() {

  const { myList } = useList();
  const { queryResults } = useSearch();
  const hasResults = queryResults.results.length > 0 || queryResults.message;

  return (
    <main>
      <h1 className={styles.srOnly}>
        Netpix Home Page
      </h1>

      <div aria-live='polite' className={styles.srOnly}>
        {
          hasResults
            ? 'You are on the search results page'
            : 'You are on the home page'
        }
      </div>

      {
        hasResults
          ? (
            <SearchResults />
          ) : (
            <>
              <Banner />
              {myList?.length > 0 && <MovieCarousel title='My List' callFetch={callFetchDetailsById} />}
              <MovieCarousel title='Popular Movies' callFetch={callFetchPopular} />
              <MovieCarousel title='Upcoming Movies' callFetch={callFetchUpcoming} />
              <MovieCarousel title='Now in Cinemas' callFetch={callFetchNowPlaying} />
            </>
          )
      }
    </main>
  )
}

export default Home;
