import { useEffect, useState } from "react";
import styles from './Trailers.module.scss';

function Trailers({ vidArray }) {
    const [trailers, setTrailers] = useState([]);
    const [clips, setClips] = useState([]);
    const [otherVids, setOtherVids] = useState([]);

    useEffect(() => {
        const trailersArray = [];
        const clipsArray = [];
        const otherArray = [];

        console.log('trailers:', vidArray)

        vidArray.forEach(vid => {
            if (vid.type === 'Trailer' || vid.type === 'Teaser') trailersArray.push(vid);
            else if (vid.type === 'Clip') clipsArray.push(vid);
            else otherArray.push(vid);
        });

        

        setTrailers(trailersArray);
        setClips(clipsArray);
        setOtherVids(otherArray);

    }, [vidArray]);

    return (
        <div className={styles.Trailers}>
            <div>
                <h4>Trailers</h4>
                <ul>
                    {
                        trailers.map((vid) =>
                            <li key={vid.id}>
                                <h3>
                                    {vid.name}
                                </h3>
                                <iframe
                                    src={`https://www.youtube.com/embed/${vid.key}?autoplay=0`}
                                    title="YouTube video player"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                >
                                </iframe>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div>
                <h4>Clips</h4>
                <ul>
                    {
                        clips.map((vid) =>
                            <li key={vid.id}>
                                <h3>
                                    {vid.name}
                                </h3>
                                <iframe
                                    src={`https://www.youtube.com/embed/${vid.key}?autoplay=0`}
                                    title="YouTube video player"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                >
                                </iframe>
                            </li>
                        )
                    }
                </ul>
            </div>
            {
                otherVids.length > 0 ?
                    <div>
                        <h4>Extras</h4>
                        <ul>
                            {
                                otherVids.map((vid) =>
                                    <li key={vid.id}>
                                        <h3>
                                            {vid.name}
                                        </h3>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${vid.key}?autoplay=0`}
                                            title="YouTube video player"
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        >
                                        </iframe>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    : null
            }
        </div>
    );
};

export default Trailers;