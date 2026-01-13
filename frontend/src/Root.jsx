import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BigN from "./components/bigN/BigN";
import styles from './Root.module.scss';

import { useModal } from "./context/ModalContext";
import TestModal from "./components/modals/TestModal";
import TextModal from "./components/modals/TextModal";


function Root() {
    const { modal, closeModal } = useModal();

    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    const [seenBigN, setSeenBigN] = useState(() => {
        return sessionStorage.getItem('bigN') === 'seen';
    });

    useEffect(() => {
        if (seenBigN) return;

        const intro = setTimeout(() => {
            setSeenBigN(true);
            sessionStorage.setItem('bigN', 'seen');
        }, 2000);

        return () => {
            clearTimeout(intro);
        }
    }, [setSeenBigN]);

    useEffect(() => {
        if (seenBigN) {
            const spacerHeight = () => {
                const header = document.getElementById('header');
                const spacer = document.getElementById('spacer');

                if (header && spacer) {
                    spacer.style.height = `${header.offsetHeight}px`
                }
            };

            window.addEventListener('resize', spacerHeight);
            requestAnimationFrame(spacerHeight);

            return () => {
                window.removeEventListener('resize', spacerHeight);
            }
        }
    }, [seenBigN, path]);

    return (
        <>
            {
                !seenBigN
                    ? <BigN />
                    : <div className={styles.Root}>

                        {modal.type === 'test' && <TestModal modalData={modal.data} onClose={closeModal} />}
                        {modal.type === 'text' && <TextModal modalData={modal.data} onClose={closeModal} />}

                        <Header className={`${styles.header} ${isAccountPath ? styles.accHeader : ''}`} />

                        <div id='spacer'></div>

                        <div className={`${styles.outlet} ${isAccountPath ? styles.outletAccount : ''}`}>
                            <Outlet />
                        </div>

                        <Footer />

                    </div >
            }
        </>
    )
};

export default Root;
