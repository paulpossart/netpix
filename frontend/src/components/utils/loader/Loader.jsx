import styles from './loader.module.scss';

function Loader({className}) {
    return (
        <div className={className || styles.loader}></div>
    );
};

export default Loader;
