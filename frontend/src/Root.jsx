import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BigN from "./components/bigN/BigN";
import styles from './Root.module.scss';

//add modals

function Root() {
    const [showBigN, setShowBigN] = useState(true);

    const path = useLocation().pathname;
    const isAccountPath = path.startsWith('/account');

    useEffect(() => {
        const seenIntro = sessionStorage.getItem('bigN');

        if (seenIntro) {
            setShowBigN(false);
            return;
        }

        const intro = setTimeout(() => {
            setShowBigN(false);
            sessionStorage.setItem('bigN', 'seen');
        }, 2000);

        return () => {
            clearTimeout(intro);
        }
    }, []);

    useEffect(()=>{
        if (!showBigN) {
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
    }, [showBigN, path]);

    return (
        <>
            {
                showBigN
                    ? <BigN />
                    : < div className={styles.Root} >

                        <Header className={`${styles.header} ${isAccountPath && styles.headerAccount}`} />

                        <div id='spacer'></div>

                        <div className={`${styles.outlet} ${isAccountPath ? styles.outletAccount : styles.outletHome}`}>
                            <Outlet />
                        </div>

                        <Footer />

                    </div >
            }
        </>
    )
};

export default Root;
