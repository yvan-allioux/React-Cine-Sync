import React from 'react';
import { ListGroup } from 'react-bootstrap';

const VideoKeywords = ({ keywords, currentTime }) => {
    // Filtrer les mots-clés en fonction du temps actuel de la vidéo
    const currentKeywords = keywords.filter(kw => currentTime >= parseInt(kw.pos));

    // Afficher les mots-clés correspondants
    return (
        <div>
            <h3>Mots-clés</h3>
            <ListGroup>
                {currentKeywords.length > 0 && currentKeywords[currentKeywords.length - 1].data.map((keyword, index) => (
                    <ListGroup.Item key={index} action href={keyword.url} target="_blank">
                        {keyword.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default VideoKeywords;
