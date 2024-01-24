import React from 'react';

const formatTime = (seconds) => {
    const pad = (num, size) => num.toString().padStart(size, '0');
    const hours = pad(Math.floor(seconds / 3600), 2);
    const minutes = pad(Math.floor((seconds % 3600) / 60), 2);
    const sec = pad(seconds % 60, 2);

    return `${hours}:${minutes}:${sec}`;
};

const VideoChapters = ({ chapters, videoRef, currentTime }) => {
    const navigateToChapter = (timestamp) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timestamp;
            videoRef.current.play();
        }
    };

    const isChapterPlaying = (startTime, endTime) => {
        return currentTime >= startTime && currentTime < endTime;
    };

    return (
        <div>
            <h3>Chapitres</h3>
            <ul>
                {chapters.map((chapter, index) => (
                    <li key={index} 
                        onClick={() => navigateToChapter(chapter.pos)}
                        style={{ fontWeight: isChapterPlaying(chapter.pos, chapters[index + 1]?.pos || Infinity) ? 'bold' : 'normal' }}>
                        {chapter.title} {formatTime(parseInt(chapter.pos))}
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default VideoChapters;
