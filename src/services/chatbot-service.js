const config = require('config');
const io = require('socket.io-client');
const { ElasticsearchService } = require('./elasticsearch-service');

const { sample } = require('../utilities/array-utils');
const { answers } = require('../resources/bot-answers');

const serverConfig = config.get('server');
const botConfig = config.get('chatbot');

class ChatbotService {
    constructor() {
        let host = serverConfig.host;
        let port = serverConfig.port;

        this.name = botConfig.botName,
        this.socket = io(`ws://${host}:${port}`);
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
                // and another question came, override (unless answer is known)
                if (message.text.includes('?')) {
                    if (await this._attemptAnswer(message.text))
                        return;

                    this.question = message.text;
                } else {
                    // else its considered a new answer
                    await this.elasticService.saveQuestionAndAnswer(this.question, message.text);
                    this.question = "";
                    this.questionFlag = false;
                }

                return;

            } else if (message.text.includes('?')) {
                if (await this._attemptAnswer(message.text))
                    return;

                this.question = message.text;
                this.questionFlag = true;
            }
        });
    }

    async _attemptAnswer(question) {
        const answer = await this.elasticService.lookForAnswer(question);

        if (answer === null)
            return false;

        this._answerToChat(answer);
        this.question = "";
        this.questionFlag = false;
        return true;
    }

    _answerToChat(answer) {
        let botAnswer = sample(answers);

        this.socket.emit('chatMessage', {
            user: this.name,
            text: botAnswer.replace('{ANSWER}', answer)
        });
    }
}

exports.ChatbotService = ChatbotService;