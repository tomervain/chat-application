const io = require("socket.io-client");

const { ElasticsearchService } = require('./elasticsearch-service');

class ChatbotService {
    constructor(botName, port) {
        this.name = botName,
        this.port = port
        this.socket = io(`ws://localhost:${this.port}`);
        this.elasticService = new ElasticsearchService();
        this.questionFlag = false;
        this.question = "";
    }

    initialize() {
        this.socketInit();
        this.socket.emit('login', this.name);
    }

    socketInit() {
        this.socket.on('chatMessage', async (message) => {
            // don't respond to own message
            if (message.user === this.name)
                return;

            // if question flag is on
            if (this.questionFlag) {
                // and another question came, override
                if (message.text.includes('?')) {
                    this.question = message.text;
                } else {                    
                    // else its considered a new answer
                    await this.elasticService.saveQuestionAndAnswer(this.question, message.text);
                    this.question = "";
                    this.questionFlag = false;
                }

                return;
            } else if (message.text.includes('?')) {
                // look for answer, if exist answer it
                const answer = await this.elasticService.lookForAnswer(message.text);
                if (answer != null) {
                    this.socket.emit('chatMessage', {
                        user: this.name,
                        text: answer
                    });

                    this.question = "";
                    this.questionFlag = false;
                    return;
                }

                this.question = message.text;
                this.questionFlag = true;
                return;
            }
        });
    }
}

exports.ChatbotService = ChatbotService;