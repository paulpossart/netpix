import { Link } from "react-router-dom";
import Header from "../header/Header";
import styles from './notFound.module.scss';

function NotFound() {
    return (
        <div className={styles.notFound}>
            <header>
                <Header />
            </header>
            <main>
                <div className={styles.notFoundTextAndBtn}>
                    <h2>Lost your way?</h2>
                    <p>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
                    <div className={styles.homeNav}>
                        <Link className={styles.btnHomeLink} to={'/'}>Netpix Home</Link>
                    </div>
                    <aside>FROM <span>LOST IN SPACE</span></aside>
                </div>
            </main>
        </div>
    );
};

export default NotFound;