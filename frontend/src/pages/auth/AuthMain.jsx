import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import styles from './AuthMain.module.scss';
import Footer from '../../components/footer/Footer';

function AuthMain() {
    const [view, setView] = useState('login');

    return (
        <main
            aria-labelledby='auth-title'
            className={styles.authPage}
        >

            <header>
                <h1 id='auth-title'>NETPIX</h1>
            </header>

            <div aria-live='polite' className={styles.srOnly}>
                {
                    view === 'login'
                        ? 'You are on the sign in page'
                        : 'You are on the user registration page'
                }
            </div>

            <section>
                {
                    view === 'login'
                        ? <Login setView={setView} />
                        : <Register setView={setView} />
                }
            </section>

            <Footer />

        </main>
    )
}

export default AuthMain;
