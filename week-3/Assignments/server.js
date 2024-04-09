import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // 根据实际情况调整
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    console.log('A user connected:', socket.id);

    // 当用户加入房间时
    socket.on('join', room => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);

        // 向房间内的其他用户广播新用户加入
        socket.to(room).emit('user joined', socket.id);

        // 当收到信号时，将其转发给房间内的其他用户
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
