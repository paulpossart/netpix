import { useLocation } from 'react-router-dom';
import styles from './InputErr.module.scss';
import errorIcon from '../../assets/error.svg';
import accErrorIcon from '../../assets/error-account.svg';

function InputErr({id, errMessage}) {
    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    return (
        <p id={id} className={`${styles.InputErr} ${isAccountPath ? styles.accInputErr : ''}`}>
            <img src={isAccountPath ? accErrorIcon : errorIcon} alt='' />
            <span>{errMessage}</span>
        </p>
    );
};

export default InputErr;

