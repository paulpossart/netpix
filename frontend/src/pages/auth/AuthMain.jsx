import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Disclaimer from './disclaimer/Disclaimer';
import styles from './AuthMain.module.scss';
import Footer from '../../components/footer/Footer';

function AuthMain() {
    const [view, setView] = useState('login');
    const [viewedDisclaimer, setViewedDisclaimer] = useState(() => {
        return localStorage.getItem('netpix-disclaimer') === 'seen';
    });

    return (
        <main className={styles.authPage}>

            {
                !viewedDisclaimer &&
                <Disclaimer
                    onClick={() => {
                        setViewedDisclaimer(true);
                        localStorage.setItem('netpix-disclaimer', 'seen')
                    }}
                />
            }

            <header>
                <h1>NETPIX</h1>
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

        </main >
    )
}

export default AuthMain;
