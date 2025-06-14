import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import Header from '../header/Header';
import Footer from '../utils/footer/Footer';
import { Modal } from '../modal/Modal';
import styles from './root.module.scss';
import netpixLogo from '../../assets/netpix-logo.svg';

function Root() {
    const [bigN, setBigN] = useState(
        <div className={styles.bigN}>
            <img src={netpixLogo} />
        </div>
    );

    const { modal } = useModal();

    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    useEffect(() => {
        const seenIntro = sessionStorage.getItem('bigN');
        if (seenIntro) {
            setBigN(null);
            return;
        }

        const intro = setTimeout(() => {
            setBigN(null);
            sessionStorage.setItem('bigN', 'seen');
        }, 2000);

        return () => {
            clearTimeout(intro);
        }

    }, []);

    useEffect(() => {
        if (bigN === null) {
            const spacerHeight = () => {
                const header = document.getElementById('header');
                const spacer = document.getElementById('spacer');
                if (header && spacer) {
                    spacer.style.height = `${header.offsetHeight}px`;
                }
            };

            window.addEventListener('resize', spacerHeight);
            setTimeout(spacerHeight, 10);

            return () => {
                window.removeEventListener('resize', spacerHeight);
            };
        }
    }, [bigN, path]);

    return (
        <>
            {
                bigN ? bigN :
                    <div className={styles.root}>
                        {modal && <Modal modalData={modal} />}
                        <Header className={`${styles.header} ${isAccountPath ? styles.headerAccount : styles.headerHome}`} />
                        <div id='spacer'></div>
                        <div className={`${styles.outlet} ${isAccountPath ? styles.outletAccount : styles.outletHome}`}>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
            }
        </>
    )
};

export default Root;
