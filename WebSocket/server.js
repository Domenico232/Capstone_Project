const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = socketIO(server);

const connectedClients = new Map();

/*io.on('connection', (socket) => {
  console.log('Nuova connessione WebSocket:', socket.id);

  let username = null;

  socket.on('register-user', ({ userName }) => {
    console.log('Utente registrato:', userName);
    username = userName;
    connectedClients.set(username, socket);
  });

  socket.on('evento-cliente', ({ data }) => {
    console.log('Evento ricevuto dal client:', data);
    console.log(connectedClients.get(username))
    if (username) {
      const recipientSocket = connectedClients.get(username);

      if (recipientSocket) {
        recipientSocket.emit('evento-server', data);
      } else {
        console.log(`Utente con username ${username} non trovato.`);
      }
    } else {
      console.log('Nome utente non registrato per la connessione attuale.');
    }
  });

  socket.emit("message", "ciao");

  socket.on('disconnect', () => {
    console.log('Client disconnesso:', socket.id);
    if (username) {
      connectedClients.delete(username);
    }
  });
});*/
function getConnectedUsers() {
  return Array.from(connectedClients.keys());
}

io.on('connection', (socket) => {
  console.log('Nuova connessione WebSocket:', socket.id);

  socket.on('register-user', ({ userName }) => {
    console.log('Utente registrato:', userName);
    connectedClients.set(userName, socket);
    const connectedUsers = getConnectedUsers();
    console.log('Utenti connessi:', connectedUsers);
  });

  socket.on('evento-cliente', ({ data, recipient }) => {
    console.log('Evento ricevuto dal client:', data);
    console.log(recipient)
    if (recipient) {
      const recipientSocket = connectedClients.get(recipient); // Ottieni il socket del destinatario utilizzando l'username

      if (recipientSocket) {
        recipientSocket.emit('evento-server', data); // Invia il messaggio al destinatario
      } else {
        console.log(`Utente con username ${recipient} non trovato.`);
      }
    } else {
      console.log('Nessun destinatario specificato per l\'evento.');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnesso:', socket.id);
    // Rimuovi l'utente dalla mappa connectedClients quando si disconnette
    connectedClients.forEach((value, key) => {
      if (value === socket) {
        connectedClients.delete(key);
      }
    });
  });
});
// Avvia il server
const port = process.env.PORT || 31337;
server.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});







