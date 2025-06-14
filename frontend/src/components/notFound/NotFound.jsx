import { Link } from "react-router-dom";
import Header from "../header/Header";
import styles from './notFound.module.scss';

function NotFound() {
    return (
        <main className={styles.notFound}>
            <header>
                <Header />
            </header>
            <section>
                <div className={styles.notFoundTextAndBtn}>
                    <h2>Lost your way?</h2>
                    <p>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
                    <Link className={styles.homeLinkBtn} to={'/'}>Netpix Home</Link>
                    <aside>FROM <span>LOST IN SPACE</span></aside>
                </div>
            </section>
        </main>
    );
};

export default NotFound;