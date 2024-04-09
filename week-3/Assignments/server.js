import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // 允许任何来源
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    console.log('A user connected:', socket.id);
  
    socket.on('join room', payload => {
      const { roomID, peerID } = payload;
      socket.join(roomID);
      console.log(`User ${peerID} joined room ${roomID}`);
  
     
      const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
      const otherUsers = clients.filter(clientID => clientID !== socket.id);
  

      socket.emit('other users', otherUsers);
  
      socket.to(roomID).emit('user joined', { peerID });
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      const rooms = Array.from(socket.rooms);
      rooms.forEach(roomID => {
        if (roomID !== socket.id) {
          socket.to(roomID).emit('user left', { peerID: socket.id });
        }
      });
    });
  });


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
