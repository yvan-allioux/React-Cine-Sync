package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// Configuration pour l'upgrade de HTTP vers WebSocket.
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true }, // Permet toutes les origines.
}

func main() {
	// Définit la route et le handler pour les connexions WebSocket.
	http.HandleFunc("/ws", handleConnections)

	// Démarre le serveur sur le port 8080.
	log.Println("Serveur démarré sur :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

// Gère les nouvelles connexions WebSocket.
func handleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade la requête HTTP vers une connexion WebSocket.
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal("Erreur d'upgrade WebSocket", err)
	}
	defer ws.Close()

	// Boucle pour lire les messages du client.
	for {
		var msg map[string]interface{}
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("Erreur de lecture JSON : %v", err)
			break
		}
		// Traite le message reçu ici (cette partie est simplifiée).
	}
}
