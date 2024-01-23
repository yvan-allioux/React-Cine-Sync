import React, { useEffect, useState, useRef } from 'react';
import VideoChapters from './VideoChapters';
import VideoMap from './VideoMap';

const VideoPlayer = () => {
    const [videoData, setVideoData] = useState(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        fetch('https://imr3-react.herokuapp.com/backend')
            .then(response => response.json())
            .then(data => setVideoData(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const fastForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    // Vérifier si les données du film sont chargées
    if (!videoData) return <div>Chargement...</div>;

    return (
        <div>
            <h1>{videoData.Film.title}</h1>
            <video ref={videoRef} width="750" height="500" controls>
                <source src={videoData.Film.file_url} type="video/mp4" />
                Votre navigateur ne supporte pas les vidéos HTML5.
            </video>
            <br />
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={fastForward}>Avance rapide 10s</button>
            <VideoChapters chapters={videoData.Chapters} videoRef={videoRef} />
            <VideoMap waypoints={videoData.Waypoints} videoRef={videoRef} />
        </div>
    );
};

export default VideoPlayer;
