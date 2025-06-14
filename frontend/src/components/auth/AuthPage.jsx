import { useState } from 'react';
import SignIn from './authView/SignIn';
import CreateUser from './authView/CreateUser';
import styles from './auth.module.scss';
import Footer from '../utils/footer/Footer';

function AuthPage() {
    const [view, setView] = useState('sign-in');

    return (
        <main className={styles.authPage}>

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
