import tmdbLogo from '../../assets/tmdb-logo.svg';
import styles from './Footer.module.scss';
import { useLocation } from 'react-router-dom';

function Footer() {
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    return (
        <footer
            id='footer'
            className={
                `${styles.tmdb}
                 ${isAccountPath ? styles.account : styles.home}`
            }>
            <p>
                This product uses the TMDB API but is not endorsed or certified by TMDB
            </p>
            <img src={tmdbLogo} alt="" />
        </footer>
    );
};

export default Footer;
