import { LitElement, html, css } from 'lit';
import { io } from 'socket.io-client'
import './components/login';
import './components/users-list';
import './components/chatbox';

class App extends LitElement {
    static properties = {
        _loggedIn: { attribute: false },
        _socket: { attribute: false },
        _user: { attribute: false },
        _activeUsers: {},
        _messages: {}
    }

    static styles = css`
        .chat-container {
            height: 98vh;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            background: var(--theme-dark);
        }
        .users-list {
            min-height: 18vh;
            max-height: 18vh;
            overflow-y: scroll;
            text-align: center;
        }
        .chatbox {
            width: 100%;
            min-height: 80vh;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            background: var(--theme-light);
            color: var(--theme-dark);
        }

        .hide-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        .hide-scroll::-webkit-scrollbar {
            background: transparent;
            width: 0px;
        }
        
        @media only screen and (min-width: 768px) {
            .chat-container {
                height: 800px;
                width: 80%;
                flex-direction: row;
            }
            .users-list {
                width: 250px;
                min-height: none;
                max-height: none;
                overflow-y: auto;
            }
            .chatbox {
                width: calc(100% - 250px);
                min-height: none;
                max-height: none;
            }
        }
    `;

    constructor() {
        super();
        this._loggedIn = false;
        this._user = "";
        this._activeUsers = {};
        this._messages = [];
    }

    loginTemplate = () => html`<app-login @loginSubmit="${this._onLogin}"></app-login>`;

    chatTemplate = () => html`
        <div class="chat-container">
            <app-users-list class="users-list hide-scroll" .users=${this._activeUsers}></app-users-list>
            <app-chatbox class="chatbox" .messages=${this._messages} @newMessage="${this._onNewMessage}"></app-chatbox>
        </div>
    `;

    socketInit() {
        this._socket.on('userAdded', async (users) => {
            this._activeUsers = users;
            await this.shadowRoot.querySelector('.users-list').requestUpdate();
        });

        this._socket.on('userRemoved', async (name) => {
            delete this._activeUsers[name];
            await this.shadowRoot.querySelector('.users-list').requestUpdate();
        });

        this._socket.on('chatMessage', message => {
            this._addNewMessageToChat(message);
        });
    }

    render() {
        return this._loggedIn ?
            this.chatTemplate() :
            this.loginTemplate();
    }

    _onLogin(e) {
        this._user = e.detail.loginName;
        this._socket = io();
        this.socketInit();
        this._socket.emit('login', this._user);
        this._loggedIn = true;
    }

    _onNewMessage(e) {
        this._socket.emit('chatMessage', {
            user: this._user,
            text: e.detail.message
        });
    }

    async _addNewMessageToChat(message) {
        this._messages.push({
            user: message.user,
            text: message.text,
            time: message.time,
            color: message.color
        });

        await this.shadowRoot.querySelector('.chatbox').requestUpdate();
    }
}

customElements.define('app-main', App);