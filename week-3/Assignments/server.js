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

    socket.on('join room', room => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);

        // 获取房间内所有已经存在的Socket连接（不包括自己）
        const otherUsers = io.sockets.adapter.rooms.get(room)?.size ? Array.from(io.sockets.adapter.rooms.get(room)) : [];
        const usersToSend = otherUsers.filter(id => id !== socket.id);

        // 向加入的新用户发送房间内所有已经存在的用户列表
        socket.emit('all users', usersToSend);

        // 通知房间内的其他用户有新用户加入
        socket.to(room).emit('user joined', socket.id);
    });

    socket.on('sending signal', payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on('returning signal', payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // 向所有客户端广播用户离开的消息
        io.emit('user left', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

