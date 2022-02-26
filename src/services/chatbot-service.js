const io = require("socket.io-client");

class ChatbotService {
    constructor(botName, port) {
        this.name = botName,
        this.port = port
        this.socket = io(`ws://localhost:${this.port}`);
    }

    initialize() {
        this.socketInit();
        this.socket.emit('login', this.name);
    }

    socketInit() {
        this.socket.on('chatMessage', message => {
            if (message.user != this.name && message.text.includes('bones')) {
                this.socket.emit('chatMessage', {
                    user: this.name,
                    text: "mmmmm... bonessss"
                });
            }
        });
    }
}

exports.ChatbotService = ChatbotService;