import React from 'react';
import VideoPlayer from './VideoPlayer';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <div className="App">
            <h1>Lecteur vidéo</h1>
            <VideoPlayer source="chemin_vers_votre_video.mp4" />
        </div>
    );
}

export default App;
