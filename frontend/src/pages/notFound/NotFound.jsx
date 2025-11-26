import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
    return (
        <main className={styles.notFound} >
            <header>
                <Link
                    to='/'
                    className={`${styles.logo}`}
                >
                    NETPIX
                </Link>

                <h1 className={styles.srOnly}>
                    Page not found
                </h1>
            </header>

            <div>
                <h2>Lost your way?</h2>
                <p>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
                <Link to='/' className={styles.whiteBtn} replace>Netpix Home</Link>
                <aside>FROM <span>LOST IN SPACE</span></aside>
            </div>
        </main>
    )
};

export default NotFound;