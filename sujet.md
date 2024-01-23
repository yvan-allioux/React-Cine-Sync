L'objectif des séances à venir est de réaliser une webapp en utilisant la librairie React.
Ce document est une trame pour vous guider, vous n'avez pas l'obligation d'implémenter toutes
les fonctionnalités, ce ne sont que des pistes pour vous donner des idées!
L'application que vous avez à réaliser est une application mettant en oeuvres les concepts
d'une application Rich Media : multimédia, interactive et synchronisée.
Pour ce faire vous aurez à implémenter:
Un component chargé de la lecture de la vidéo,
un component chargé d'afﬁcher les chapitres de la vidéo, cliquer sur les chapitres
positionnera la vidéo au momrent correspondant,
un component chargé d'afﬁcher une carte avec des points d'intérêts liés à différents
moment du ﬁlm,Jouons avec React!
Fonctionnalités attendues
Elle devra proposer à l'utilisateur une interface lui permettant de visualiser
un ﬁlm, de naviguer dans le contenu par le biais d'un chapitrage mais
également de consulter une carte illustrant les lieux où se déroule l'action.
L'utilisateur pourra interagir avec la carte en selectionnant des points
d'intérêt et ainsi accéder aux moments du ﬁlm concernés. De même, une
liste dynamique de mots-clefs sera afﬁcher durant la lecture du ﬁlm. Enﬁn
un zone de discussion permettra à l'utilisateur de discuter avec d'autres
utilisateurs et partager des pointeurs dirigeant vers des moments du ﬁlm.
un component chargé d'afﬁcher une liste de mots clefs correspondant à différentsmoment du ﬁlm,
un component chargé d'afﬁcher la chatroom associé à la vidéo,
un component chargé de composer et poster des messages dans la chatroom. Certains
messages permettent de partager des "moments d'intérêt" de la vidéo.
La note que vous aurez à l'issue du module est composée:
à 50% de la note obtenue lors du devoir sur table portant sur le cours d'introductions à
l'évolution du développement d'interfaces RIA ainsi que sur l'initiation à React,
à 50% de la note obtenue avec le projet dont vous lisez le sujet.
Ce nano-projet, qui n'est à réaliser que pendant le temps où vous êtes en cours, est
évalué sur les critères suivants:
code doit obligatoirement impérativement compiler après un git clone suivi d'un
npm install & npm start. Cette condition vous garanti un minimum de 10/20 sur
la note du projet.présence obligatoire des composants listés au point ci-dessus
présence de tests unitaires. Chaque composant doit avoir une suite de test associée.
Une couverture à 100% n'est pas exigée cependant vos tests devront couvrir les
fonctionnalités clefs de vos composants. Par exemple vous testerez que votre
composant en charge d'afﬁcher les mots clefs afﬁche uniquement ceux lié à un
timestamp donné, pas ceux après.
votre application doit remplir les conditions d'une RIA : interactive, multimédia et
synchronisée. Les différents composants présentent tous des caractéristiques qui
peuvent inﬂuencer les autres : cliquer sur un point d'intérêt sur la carte change le
positionnement de la vidéo ainsi que les mots-clefs afﬁchés. Cliquer sur un chapitre
avance ou recule la lecture de la vidéo, change les mots-clefs et les points d'intérêts sur
la carte,...style visuel de l'application. L'esthétique est libre mais votre code doit mettre en
évidence l'usage de CSS.
Aﬁn que je puisse évaluer correctement votre travail vous devrez le partager sur un
dépôt git de votre choix et m'y donner accès en précisant les noms et prénoms des
membres de l'équipe (dans le README de votre dépôt par exemple). Aﬁn d'évaluer la
répartition du travail dans les membres de l'équipe prennez soin de pousser vos
contributions respectives régulièrement sur le dépôt.
Si vous travaillez en pairprogramming, précisez-le dans votre README.

Critères d'évaluation

Un backend est à votre disposition pour réaliser l'exercice. Ce backend fournit deux choses:
un ﬂux JSON contenant les informations relatives au ﬁlm à afﬁcher,une chatroom
accessible en WebSocket
Les URLs sont les suivantes:
Fichier JSON : https://imr3-react.herokuapp.com/backendChat Websocket : wss://imr3-react.herokuapp.com
Le ﬁchier JSON comporte les données suivantes:
un noeud Film contenant trois champs,file_url, title, synopsis_url,
descrivant les informations sur le titre, l'url du ﬁchier ainsi qu'une URL donnant sonsynopsis,
un noeud Chapters contenant un tableau d'objets dont les champs pos et
title contiennent respectivement le timestamp en secondes et le titre du chapitre,
un noeud Waypoints contenant un tableau d'objets dont les champs lat, lng,
label et timestamp contiennent les lattitudes, longitudes en Degré
Décimal, unlibellé et un timestamp en secondes,un noeud Keywords
contennant des mots clefs associés à certains moment du ﬁlm. Il
est composé dun tableau d'objets à deux champs, pos et data. Le premier
contient le moment en secondes auxquels correspondent le ou les mots-clefs contenus
dans le second champ. data
est un tableau d'objets à deux champs, title et
url contenant le mot-clef pour le premier et l'URL d'une page contenant plus
d'informations sur le mot-clef.Un exemple du ﬁchier JSON:{  "Film" : {    "file_url" : "...",    "title" : "...",    "synopsis_url" : "..."  },  "Chapters": [    {Ressources disponibles
Format de donnéesLe ﬁchier JSON      "pos": "0",      "title": "Start"    },    {      "pos": "45",      "title": "Chapitre 2"    },    {      "pos": "117",      "title": "Chapitre 3"    },    (...)  ],  "Waypoints":[    {      "lat":"32.42",      "lng":"-90.13",      "label":"Place 1",      "timestamp":"45"    },    {      "lat":"38.90",      "lng":"-77.04",      "label":"Place 2",      "timestamp":"300"    },    (...)  ],  "Keywords": [    {      "pos": "0",      "data": [        {          "title":"Mot clef 1",          "url":"url de la page"        },        {          "title":"Mot clef 2",          "url":"url de la page"        },        (...)      ]    },    {      "pos": "117",      "data": [        {          "title":"Mot clef 3",          "url":"url de la page"        }      ]    },    (...)  ]}
En vous connectant au serveur de WebSockets vous recevrez dès la connexion un tableau
contenant un ou plusieurs objets correspondant aux messages émis sur le chat avant que
vous soyez connectés. Ces objets disposent de trois champ obligatoire, when, name et
message ainsi qu'un champ optionnel moment. when contient le timestamp Unix du
moment où le message a été reçu par le serveur, name
contient le nom de son auteur et
message le contenu. moment contient le timestamp en secondes du moment du ﬁlm
partagé.Un exemple de réponse du serveur de Websockets:[  {    "when":"1580742794",    "name":"Alice",    "message":"Hi, I'm Alice!"  },  {    "when":"1580742479",    "name":"Bob",    "message":"Hi, I'm Bob. Checkout this moment!",    "moment":462  },  (...)]Aﬁn de vous aider à implémenter les différentes fonctionnalités vous trouverez ci-dessousdes bouts de code, des commandes bash ainsi que des liens vers des librairies qui peuventvous être utiles.Démarrer un nouveau projet React (le pre-requis est d'avoir NodeJS d'installé)Le chat
Aide$ npx create-react-app nom_du_projet
Démarrer le serveur local (à exécuter dans le répertoire de votre projet)$ npm start &
vous n'avez pas besoin de tuer le processus pour que vos changements soient pris en
compte, le hot-reload s'en charge.
Démarrer le test runner (à éxécuter dans le répertoire de votre projet)$ npm test
vous n'avez pas besoin de tuer le processus pour que vos changements soient pris encompte, le hot-reload s'en charge également pour les suites de test.
Instancier un client WebSocketURL = "wss://imr3-react.herokuapp.com";ws = new WebSocket(URL);Cyle de vie du client WebSocketthis.ws.onopen = () => {    console.log("connected");    this.setState({        connected: true    });};this.ws.onmessage = evt => {    const messages = JSON.parse(evt.data);    messages.map(message => this.addMessage(message));};this.ws.onclose = () => {    console.log("disconnected, reconnect.");    this.setState({        connected: false,        ws: new WebSocket(URL)    });};Envoyer un message sur la WebSocketsubmitMessage = messageString => {    const message = { name: this.state.name, message: messageString };    this.ws.send(JSON.stringify(message));};
Librairies utiles
Pour intégrer des cartes OpenstreetMap, vous pouvez par exempl utiliser la librairie
React-leaﬂet
Pour intégrer des composants déjà stylisés, vous pouvez par exemple utiliser la librairie
Bootstrap React
Pour intégrer un lecteur video, vous pouvez utiliser le composant Player de la librairie
Video ReactIl s'agit de suggestions, vous êtes totalement libre d'utiliser d'autres librairies ou de créer lesvotre!
Attention
Pour que votre carte React-leaﬂet s'afﬁche correctement vous devez non seulement importer
les dépendances comme précisé dans la documentation mais également importer la feuillede style CSS et déﬁnir les attributs de hauteur et largeur dans votre App.css.@import url("https://unpkg.com/leaflet@1.6.0/dist/leaflet.css");#id_de_votre_composant_map{  width:600px;   height:400px}LicenseLicenseCC BY-SA 4.0CC BY-SA 4.0 Marc Poppleton
