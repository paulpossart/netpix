import styles from '../App.module.scss'

function Home() {
    const [tadum, setTadum] = useState(
        <div className={styles.overflow}>
            <div className={styles.big}>hello</div>
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
                    (
                        <div>
                            goodbye
                        </div>
                    )
            }
        </>
    )
}

export default Home;
