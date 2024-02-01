import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';

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
        
        websocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        //return () => websocket.current.close();
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

export default VideoChat;
