import React from 'react';

const VideoKeywords = ({ keywords, currentTime }) => {
    // Filtrer les mots-clés en fonction du temps actuel de la vidéo
    const currentKeywords = keywords.filter(kw => currentTime >= parseInt(kw.pos));

    // Afficher les mots-clés correspondants
    return (
        <div>
            <h3>Mots-clés</h3>
            <ul>
                {currentKeywords.length > 0 && currentKeywords[currentKeywords.length - 1].data.map((keyword, index) => (
                    <li key={index}>
                        <a href={keyword.url} target="_blank" rel="noopener noreferrer">{keyword.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoKeywords;
