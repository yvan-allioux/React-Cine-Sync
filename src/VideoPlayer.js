import React, { useRef, useState } from 'react';

const VideoPlayer = ({ source }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

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

    return (
        <div>
            <video ref={videoRef} width="750" height="500" controls>
                <source src={source} type="video/mp4" />
                Votre navigateur ne supporte pas les vidéos HTML5.
            </video>
            <br />
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={fastForward}>Avance rapide 10s</button>
        </div>
    );
};

export default VideoPlayer;
