import styles from '../App.module.scss'
import { useEffect, useState } from 'react';
import SignOut from './1_auth/SignOut';

function Home() {
    const [tadum, setTadum] = useState(
        <div className={styles.overflow}>
            <div className={styles.big}>N</div>
        </div>
    )

    useEffect(() => {
        const intro = setTimeout(() => {
            setTadum(null);
        }, 2000);

        return () => clearTimeout(intro);
    }, []);

    return (
        <>
            {
                tadum ?
                    tadum :
                    (<>
                        <div>
                            Welcome to Netpix
                        </div>
                        <SignOut />
                    </>
                    )
            }
        </>
    )
}

export default Home;
