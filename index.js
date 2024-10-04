import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors({
    origin:'*',
methods:['GET', 'POST'],
allowedHeaders: ['Content-Type']}));
app.use(express.static('/'));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('workk');

    socket.on('message', (msg) => {
        console.log("Message: ", msg);
        io.emit('message', msg);
    })

    socket.on('disconnect', () => {
        console.log('disconnect');
    })
})

server.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
})