import React, { useEffect, useState, useRef } from 'react';
import VideoChapters from './VideoChapters';
import VideoMap from './VideoMap';
import VideoKeywords from './VideoKeywords';
import VideoChat from './VideoChat';

import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';

const VideoPlayer = () => {
    const [videoData, setVideoData] = useState(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
            }
        }, 1000); // Mise à jour chaque seconde

        return () => clearInterval(interval); // Nettoyage
    }, []);
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
                setIsPlaying(false);
            } else {
                const playPromise = videoRef.current.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                    }).catch(error => {
                        console.error('Error attempting to play the video: ', error);
                    });
                } else {
                    // Dans le cas où play() ne retourne pas une promesse (comportement non standard)
                    setIsPlaying(true);
                }
            }
        }
    };



    const fastForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    // Vérifier si les données du film sont chargées
    if (!videoData) return <div><Container className="text-center mt-5">
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Chargement...</span>
        </Spinner>
    </Container></div>;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <h1>{videoData.Film.title}</h1>
                    <video ref={videoRef} width="100%" height="auto" controls>
                        <source src={videoData.Film.file_url} type="video/mp4" />
                        Votre navigateur ne supporte pas les vidéos HTML5.
                    </video>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start my-3">
                        <Button variant="primary" onClick={togglePlay}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </Button>
                        <Button variant="secondary" onClick={fastForward}>
                            Avance rapide 10s
                        </Button>
                    </div>
                </Col>
            </Row>
            <VideoChat />
            <Row>
                <Col>
                    <VideoChapters chapters={videoData.Chapters} videoRef={videoRef} currentTime={currentTime} />
                    <VideoKeywords keywords={videoData.Keywords} currentTime={currentTime} />
                    <VideoMap waypoints={videoData.Waypoints} videoRef={videoRef} currentTime={currentTime} />
                </Col>
            </Row>
        </Container>
    );
};

export default VideoPlayer;
