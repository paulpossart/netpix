import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import SearchResults from './searchResults/SearchResults';
import styles from './Home.module.scss';


function Home() {
  const { user } = useAuth();
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
          ? <SearchResults />
          :
          <>
            {/* switch to new component... user / lists / movies*/}
            <p>Hello, {user.username}</p>
            <Link to='/account'>Account</Link>
          </>
      }
    </main>
  )
}

export default Home;
