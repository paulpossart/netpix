import { useState } from 'react';
import SignIn from './authView/SignIn';
import CreateUser from './authView/CreateUser';
import Disclaimer from './disclaimer/Disclaimer';
import styles from './auth.module.scss';
import Footer from '../utils/footer/Footer';

function AuthPage() {
    const [view, setView] = useState('sign-in');
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

            <section>
                {
                    view === 'sign-in'
                        ? <SignIn setView={setView} />
                        : <CreateUser setView={setView} />
                }
            </section>
            <Footer />
        </main>
    );
};

export default AuthPage;
