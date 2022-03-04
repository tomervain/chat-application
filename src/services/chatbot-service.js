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

        this.userCount = 0;
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

            // a previous question was asked before
            if (this.questionFlag) {

                if (this._questionAsked(message.text)) {
                    // question has an available answer
                    if (await this._attemptAnswer(message.text))
                        return;

                    this._setQuestion(message.text);

                } else {
                    await this.elasticService.saveQuestionAndAnswer(this.question, message.text);
                    this._resetQuestionState();
                }

                return;

            } else if (this._questionAsked(message.text)) {

                // new question was asked before
                if (await this._attemptAnswer(message.text))
                    return;

                this._setQuestion(message.text);
            }
        });

        this.socket.on('userAdded', () => this.userCount++);

        this.socket.on('userRemoved', name => {
            this.userCount--;

            // reset conversation state if chat is empty
            if (this.userCount == 0)
                this._resetQuestionState();
        });
    }

    async _attemptAnswer(question) {
        const answer = await this.elasticService.lookForAnswer(question);

        if (answer === null)
            return false;

        this._answerToChat(answer);
        this._resetQuestionState();

        return true;
    }

    _answerToChat(answer) {
        let botAnswer = sample(answers);

        this.socket.emit('chatMessage', {
            user: this.name,
            text: botAnswer.replace('{ANSWER}', answer)
        });
    }

    _questionAsked = (text) => text.includes('?');

    _setQuestion(question) {
        this.question = question;
        this.questionFlag = true;
    }

    _resetQuestionState() {
        this.question = "";
        this.questionFlag = false;
    }
}

exports.ChatbotService = ChatbotService;