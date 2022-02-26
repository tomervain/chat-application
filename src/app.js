import { LitElement, html, css } from 'lit';
import { io } from 'socket.io-client'

import { Login } from './components/login';
import { UsersList } from './components/users-list';
import { ChatBox } from './components/chatbox';

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
            margin: 0 auto;
            height: 800px;
            width: 80%;
            background: #444753;
            border-radius: 0;
            display: flex;
        }
        .chat-container .users-list {
            width: 250px;
        }
        .chat-container .chatbox {
            width: calc(100% - 250px);
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
            <app-users-list class="users-list" .users=${this._activeUsers}></app-users-list>
            <app-chatbox class="chatbox" 
                .messages=${this._messages} 
                @newMessage="${this._onNewMessage}">
            </app-chatbox>
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
            author: message.user,
            text: message.text,
            time: message.time
        });

        await this.shadowRoot.querySelector('.chatbox').requestUpdate();
    }
}

customElements.define('app-main', App);