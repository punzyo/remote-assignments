// 使用 ES Module 语法导入模块
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();

app.use(cors()); // 使用默认配置，允许所有跨域请求

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // 允许任何来源
        methods: ["GET", "POST"] // 允许的 HTTP 方法
    }
});

io.on('connection', socket => {
    console.log('A user connected:', socket.id);

    socket.on('join', room => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);

        // 当用户加入房间时，向房间内的其他用户广播
        socket.to(room).emit('user joined', socket.id);

        // 当有信令数据需要交换时
        socket.on('signal', ({ room, data }) => {
            // 广播信令数据给房间内的其他用户，除了发送者自己
            socket.to(room).emit('signal', { id: socket.id, signal: data });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
