import styles from './footer.module.scss';
import tmdbLogo from '../../../assets/tmdb-logo.svg';
import { useLocation } from 'react-router-dom';

function Footer() {
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    return (
        <footer
            className={styles.tmdb}
            style={isAccountPath
                ? { backgroundColor: 'rgba(255, 255, 255, 0.8)' }
                : { backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <p style={isAccountPath ? { color: 'black' } : { color: 'white' }}>This product uses the TMDB API but is not endorsed or certified by TMDB</p>
            <img src={tmdbLogo} />
        </footer>
    );
};

export default Footer;

