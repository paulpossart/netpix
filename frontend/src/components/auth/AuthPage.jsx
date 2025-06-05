import { useState } from 'react';
import SignIn from './SignIn';
import CreateUser from '../users/CreateUser';
import styles from './auth.module.scss';
import tmdbLogo from '../../assets/tmdb-logo.svg';

function AuthPage() {
    const [view, setView] = useState('sign-in');

    return (
        <div className={styles.authBackground}>
            <div className={styles.authPage}>
                <h1>NETPIX</h1>
                <div className={styles.authContainer}>
                    {view === 'sign-in'
                        ? <SignIn setView={setView} />
                        : <CreateUser setView={setView} />
                    }
                </div>
                <div className={styles.tmdb}>
                    <p>This product uses the TMDB API but is not endorsed or certified by TMDB</p>
                    <img src={tmdbLogo} />
                </div>
            </div>
        </div>

    );
};

export default AuthPage;
