import styles from './footer.module.scss';
import tmdbLogo from '../../../../assets/tmdb-logo.svg';
import { useLocation } from 'react-router-dom';

function Footer() {
    const path = useLocation().pathname;

    return (
        <footer className={styles.tmdb}>
            <p style={path === '/account' ? { color: 'black' } : { color: 'white' }}>This product uses the TMDB API but is not endorsed or certified by TMDB</p>
            <img src={tmdbLogo} />
        </footer>
    );
};

export default Footer;

