// Importation des hooks et composants nécessaires de React et react-bootstrap
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';

// Définition du composant VideoChat
const VideoChat = () => {
    // Déclaration des états pour les messages, le nom de l'utilisateur et le message actuel
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    // Utilisation de useRef pour maintenir une référence persistante au WebSocket
    const websocket = useRef(null);

    let useEffectLaunch = false;

    // useEffect pour établir la connexion WebSocket au montage du composant
    
    useEffect(() => {
        if (!useEffectLaunch) {
        useEffectLaunch = true;
        console.log('useEffect');
        // Initialisation de la connexion WebSocket
        websocket.current = new WebSocket('wss://imr3-react.herokuapp.com/');

        // une fois le websocket est ouvert
        websocket.current.onopen = () => {
            console.log('WebSocket ouvert');
        }

        // Gestion de la réception de messages via WebSocket
        websocket.current.onmessage = event => {
            const newMessage = JSON.parse(event.data);
            // Ajout du nouveau message à l'état messages, sauf si le message est de "Rick"
            if (newMessage.name !== "Rick") {
                setMessages(prevMessages => [...prevMessages, ...newMessage]);
                console.log(newMessage);
            }
        };
        
        // Gestion des erreurs WebSocket
        websocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        // Commenté : fermeture de la connexion WebSocket lors du démontage du composant
        // return () => websocket.current.close();
    }
    }, []);
    
    // Fonction pour envoyer un message
    const sendMessage = () => {
        const msg = { name, message };
        // Envoi du message sous forme de chaîne JSON via WebSocket
        websocket.current.send(JSON.stringify(msg));
        // Réinitialisation du champ de message après l'envoi
        setMessage('');
    };

    // Filtrage des messages pour exclure ceux de "Rick" avant l'affichage
    const filteredMessages = messages.filter(msg => msg.name.toLowerCase() !== 'rick');

    // Sélection des 10 derniers messages pour l'affichage
    const displayedMessages = filteredMessages.slice(-10);

    // Structure JSX du composant, incluant un Card pour le chat, un formulaire pour l'envoi de messages, et l'affichage des messages
    return (
        <Card>
            <Card.Body>
                <Card.Title>Chat</Card.Title>
                <ListGroup variant="flush">
                    {displayedMessages.map((msg, index) => (
                        <ListGroup.Item key={index}><strong>{msg.name}:</strong> {msg.message}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Votre nom" 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="message">
                        <Form.Control 
                            type="text" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            placeholder="Votre message" 
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={sendMessage}>Envoyer</Button>
                </Form>
            </Card.Footer>
        </Card>
    );
};

// Exportation du composant VideoChat pour utilisation dans d'autres parties de l'application
export default VideoChat;
