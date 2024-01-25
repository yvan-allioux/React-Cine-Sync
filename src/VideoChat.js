import React, { useState, useEffect, useRef } from 'react';

const VideoChat = () => {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const websocket = useRef(null);

    useEffect(() => {
        websocket.current = new WebSocket('wss://imr3-react.herokuapp.com/');
        websocket.current.onmessage = event => {
            const newMessage = JSON.parse(event.data);
            // Filtrer les messages de l'utilisateur "Rick"
            if (newMessage.name !== "Rick") {
                setMessages(prevMessages => [...prevMessages, ...newMessage]);
            }
        };
        return () => websocket.current.close();
    }, []);

    const sendMessage = () => {
        const msg = { name, message };
        websocket.current.send(JSON.stringify(msg));
        setMessage(''); // Réinitialiser le champ du message après l'envoi
    };

    // Filtrer les messages de "Rick" avant de les afficher
    const filteredMessages = messages.filter(msg => msg.name.toLowerCase() !== 'rick');

    // Pagination : Affichage des 5 derniers messages
    const displayedMessages = filteredMessages.slice(-10);

    return (
        <div>
            <div>
                {displayedMessages.map((msg, index) => (
                    <p key={index}><strong>{msg.name}:</strong> {msg.message}</p>
                ))}
            </div>
            <div>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Votre nom" 
                />
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Votre message" 
                />
                <button onClick={sendMessage}>Envoyer</button>
            </div>
        </div>
    );
};

export default VideoChat;
