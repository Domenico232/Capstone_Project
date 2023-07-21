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

// Definizione della funzione generateUniqueId al di fuori del listeners
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

io.on('connection', (socket) => {
  console.log('Nuova connessione WebSocket:', socket.id);

  const userId = generateUniqueId();
  socket.emit('user-id', userId);
  connectedClients.set(userId, socket);

  socket.on('evento-cliente', ({ data }) => {
    console.log('Evento ricevuto dal client:', data);

    const recipientSocket = connectedClients.get(userId);

    if (recipientSocket) {
      recipientSocket.emit('evento-server', data);
    } else {
      console.log(`Utente con ID ${userId} non trovato.`);
    }
  });

  socket.emit("message", "ciao");

  socket.on('disconnect', () => {
    console.log('Client disconnesso:', socket.id);
    connectedClients.delete(userId);
  });
});

// Avvia il server
const port = process.env.PORT || 31337;
server.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});








