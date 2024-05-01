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
        }, 1000);

        return () => clearInterval(interval);
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

    if (!videoData) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
            </Spinner>
        </Container>
    );

    return (
        <Container fluid="lg" className="py-5">
            <Row>
                <Col md={3} className="mb-4">
                    {/* Les chapitres à gauche */}
                    <VideoChapters chapters={videoData.Chapters} videoRef={videoRef} currentTime={currentTime} />
                </Col>
                <Col xs={12} md={6}>
                    {/* Titre et vidéo au centre */}
                    <h1 className="text-center mb-3">{videoData.Film.title}</h1>
                    <div className="video-wrapper mb-3">
                        <video ref={videoRef} width="100%" height="auto" controls>
                            <source src={videoData.Film.file_url} type="video/mp4" />
                            Votre navigateur ne supporte pas les vidéos HTML5.
                        </video>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-3">
                            <Button variant="primary" onClick={togglePlay}>
                                {isPlaying ? 'Pause' : 'Play'}
                            </Button>
                            <Button variant="secondary" onClick={fastForward}>
                                Avance rapide 10s
                            </Button>
                        </div>
                    </div>
                    {/* Mots-clés et waypoints en dessous de la vidéo */}
                    <VideoKeywords keywords={videoData.Keywords} currentTime={currentTime} />
                    <VideoMap waypoints={videoData.Waypoints} videoRef={videoRef} currentTime={currentTime} />
                </Col>
                <Col md={3}>
                    {/* Le chat à droite <VideoChat />*/}
                    
                </Col>
            </Row>
        </Container>
    );
};

export default VideoPlayer;
