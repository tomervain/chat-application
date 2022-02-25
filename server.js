const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const ANSI_NORM = "\x1b[0m"; // default, reset
const ANSI_LINK = "\x1b[94;1m"; // bold, bright blue
const PORT = process.env.PORT || 8000;

// set dist as static folder (containing the bundled client)
app.use(express.static(path.join(__dirname, 'dist')));

// initialize socket server events
io.on('connection', socket => {
    socket.emit('message', 'Welcome to chat application');

    socket.broadcast.emit('message', 'another user has connected');

    socket.on('disconnect', () => {
        io.emit('message', 'a user has left the chat');
    });

    socket.on('chatMessage', message => {
        console.log(`new message: ${message}`);
    });
});

// run http server
server.listen(PORT, () => {
    process.stdout.write("Chat Application Server is running in");
    console.log(ANSI_LINK, `http://localhost:${PORT}`, ANSI_NORM);
});