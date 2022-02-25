const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    const ANSI_LINK = "\x1b[94;1m"; // bold, bright blue
    process.stdout.write("Chat Application Server is running in");
    console.log(ANSI_LINK, `http://localhost:${PORT}`);
});