import netpixLogo from '../../assets/netpix-logo.svg';
import styles from './BigN.module.scss';

function BigN() {
    return (
        <div className={styles.bigN}>
            <img src={netpixLogo} />
        </div>
    );
};

export default BigN;
