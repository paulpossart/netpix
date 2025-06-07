import { useState } from 'react';
import SignIn from './SignIn';
import CreateUser from './CreateUser';
import styles from './auth.module.scss';
import Footer from '../utils/footer/Footer';

function AuthPage() {
    const [view, setView] = useState('sign-in');

    return (
        <div className={styles.authBackground}>
            <main className={styles.authPage}>

                <header>
                    <h1>NETPIX</h1>
                </header>

                <section className={styles.authContainer}>
                    {view === 'sign-in'
                        ? <SignIn setView={setView} />
                        : <CreateUser setView={setView} />
                    }
                </section>
                <Footer />
            </main>
        </div>

    );
};

export default AuthPage;
