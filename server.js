const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const moment = require('moment');

const { UserService } = require('./src/services/user-service');

const userService = new UserService();
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
    socket.on('login', name => {
        userService.addUser(socket.id, name);
        console.log(userService.users);
    });

    socket.on('disconnect', () => {
        userService.removeUser(socket.id);
    });

    socket.on('chatMessage', message => {
        let color = userService[message.user];

        // emit message to all users
        io.emit('chatMessage', {
            user: message.user,
            text: message.text,
            color: color,
            time: moment().format('HH:mm')
        });

        // this is where the chatbot will read it and do something
    });
});

// run http server
server.listen(PORT, () => {
    process.stdout.write("Chat Application Server is running in");
    console.log(ANSI_LINK, `http://localhost:${PORT}`, ANSI_NORM);
});