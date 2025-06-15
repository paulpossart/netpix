import { useModal } from '../../context/ModalContext';
import styles from './modal.module.scss';
import closeIcon from '../../assets/cross.svg'

const trailerModalContent = ({
    setter, vidKey
}) => {
    setter({
        vidKey
    })
}

function TrailerModal({ modalData }) {
    const { setTrailerModal, setInfoModal, setTextModal } = useModal();
    if (!modalData) return null;
    const { vidKey } = modalData;

    return (
        <>
            <div onClick={() => {
                setTrailerModal(null);
                setInfoModal(null);
                setTextModal(null)
            }
            } className={styles.modalOverlay}></div>
            <div className={styles.modal}>
                {
                    vidKey ?
                        <iframe
                            src={`https://www.youtube.com/embed/${vidKey}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        >
                        </iframe>
                        : <p style={{ padding: '12px' }}>no video available</p>
                }

                <div className={styles.btnContainer}>
                    <div className={styles.buttons}>
                        <button className={styles.iconBtn} onClick={() => {
                            setTrailerModal(null);
                            setInfoModal(null);
                            setTextModal(null)
                        }}><img src={closeIcon} /></button>
                    </div>
                </div>
            </div >

        </>
    );
};

export { trailerModalContent, TrailerModal };
