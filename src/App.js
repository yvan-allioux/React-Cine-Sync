import React from 'react';
import VideoPlayer from './VideoPlayer';

function App() {
    return (
        <div className="App">
            <h1>Lecteur vidéo</h1>
            <VideoPlayer source="chemin_vers_votre_video.mp4" />
        </div>
    );
}

export default App;
