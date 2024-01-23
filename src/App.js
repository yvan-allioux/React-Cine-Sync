import React from 'react';
import VideoPlayer from './VideoPlayer';

function App() {
    return (
        <div className="App">
            <h1>Lecteur vidéo</h1>
            <VideoPlayer source="https://archive.org/download/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4" />
        </div>
    );
}

export default App;
