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

function getConnectedUsers() {
  return Array.from(connectedClients.keys());
}

io.on('connection', (socket) => {
  console.log('Nuova connessione WebSocket:', socket.id);

  socket.on('send-invite', ({ senderUsername, recipientUsername }) => {
    console.log(`Invito ricevuto da ${senderUsername} per ${recipientUsername}`);
    
    const recipientSocket = connectedClients.get(recipientUsername);

    if (recipientSocket) {
      // Invia l'invito al destinatario
      recipientSocket.emit('invite-received', { senderUsername });
      console.log('Invito inviato al destinatario.');
    } else {
      console.log(`Utente con username ${recipientUsername} non trovato.`);
    }
  });

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
      const recipientSocket = connectedClients.get(recipient);

      if (recipientSocket) {
        recipientSocket.emit('evento-server', data); 
      } else {
        console.log(`Utente con username ${recipient} non trovato.`);
      }
    } else {
      console.log('Nessun destinatario specificato per l\'evento.');
    }
  });

  socket.on('challenge-accepted', ({ data, recipient }) => {
    console.log('Evento ricevuto dal client:', data);
    console.log(recipient)
    if (recipient) {
      const recipientSocket = connectedClients.get(recipient); 

      if (recipientSocket) {
        recipientSocket.emit('start-game', data); // Invia il messaggio "start-game" al destinatario
      } else {
        console.log(`Utente con username ${recipient} non trovato.`);
      }
    } else {
      console.log('Nessun destinatario specificato per l\'evento.');
    }
  });

  socket.on('message-sent', ({ data, recipient }) => {
    console.log('Messaggio ricevuto dal client:', data);
    console.log(recipient)
    if (recipient) {
      const recipientSocket = connectedClients.get(recipient); 

      if (recipientSocket) {
        recipientSocket.emit('message-recived', data); // Invia il messaggio al destinatario
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







