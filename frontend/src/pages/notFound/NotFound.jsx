import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import styles from './NotFound.module.scss';

function NotFound() {
    return (
        <main
            aria-labelledby='not-found-title'
            className={styles.notFound}
        >

            <Link
                to='/'
                onClick={() => { }}
                className={`${styles.logo}`}
            >
                NETPIX
            </Link>

            <h2
                id='not-found-title'
                className={styles.srOnly}
            >
                Page not found
            </h2>

            <div>
                <h3>Lost your way?</h3>
                <p>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
                <Link to='/' replace>Netpix Home</Link>
                <aside>FROM <span>LOST IN SPACE</span></aside>
            </div>
        </main>
    )
};

export default NotFound;