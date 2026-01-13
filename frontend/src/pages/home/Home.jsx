import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import SearchResults from './searchResults/SearchResults';
import styles from './Home.module.scss';


function Home() {
  const { user } = useAuth();
  const { queryResults } = useSearch();


  return (
    <main>
      <h1 className={styles.srOnly}>
        Netpix Home Page
      </h1>
      {
        queryResults.results.length > 0
          || queryResults.message
          ? <SearchResults />
          :
          <>
            <p>Hello, {user.username}</p>
            <Link to='/account'>Account</Link>
          </>
      }
    </main>
  )
}

export default Home;
