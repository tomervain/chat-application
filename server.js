const path = require('path');
const http = require('http');
const config = require('config');
const express = require('express');
const socketio = require('socket.io');
const moment = require('moment');

const { UserService } = require('./src/services/user-service');
const { ChatbotService } = require('./src/services/chatbot-service');

const serverConfig = config.get('server');
const userService = new UserService();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const ANSI_NORM = "\x1b[0m"; // ansi reset
const ANSI_LINK = "\x1b[94;1m"; // ansi bold bright blue

// set dist as static folder (containing the bundled client)
app.use(express.static(path.join(__dirname, 'dist')));

// initialize socket server events
io.on('connection', socket => {
    socket.on('login', name => {
        let activeUsers = {};
        Object.values(userService.users).forEach(user => activeUsers[user.name] = user.color);

        if (Object.keys(activeUsers).includes(name))
        {
            socket.emit('login', false);
            return;
        }

        
        userService.addUser(socket.id, name);   
        Object.values(userService.users).forEach(user => activeUsers[user.name] = user.color);

        io.emit('userAdded', activeUsers);
        socket.emit('login', true);
    });

    socket.on('disconnect', () => {
        let userName = userService.users[socket.id].name;
        userService.removeUser(socket.id);

        io.emit('userRemoved', userName);
    });

    socket.on('chatMessage', message => {
        let color = userService.users[socket.id].color;

        // emit message to all users
        io.emit('chatMessage', {
            user: message.user,
            text: message.text,
            color: color,
            time: moment().format('HH:mm')
        });
    });
});

// run chatbot service
const botService = new ChatbotService();
botService.initialize();

// run http server
server.listen(serverConfig.port, () => {
    let host = serverConfig.host;
    let port = serverConfig.port;

    process.stdout.write("Chat Application Server is running in");
    console.log(ANSI_LINK, `http://${host}:${port}`, ANSI_NORM);
});