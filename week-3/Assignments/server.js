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

    socket.on('join', room => {
        // 将新用户加入指定的房间
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);

        // 获取房间内所有已经存在的Socket连接（不包括自己）
        const otherUsers = io.sockets.adapter.rooms.get(room);
        const usersToSend = Array.from(otherUsers).filter(id => id !== socket.id);

        // 向加入的新用户发送房间内所有已经存在的用户列表
        socket.emit('all users', usersToSend);

        // 当收到信号时，将其转发给房间内的指定用户
        socket.on('signal', ({ userToSignal, callerID, signal }) => {
            io.to(userToSignal).emit('signal', { id: callerID, signal });
        });

        // 当用户离开时
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            // 向房间内的其他用户广播用户离开的消息
            socket.to(room).emit('user left', socket.id);
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
