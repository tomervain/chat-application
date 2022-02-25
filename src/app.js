import { LitElement, html, css } from 'lit';
import { io } from 'socket.io-client'

import { Login } from './components/login';
import { UsersList } from './components/users-list';
import { ChatBox } from './components/chatbox';

class App extends LitElement {
    static properties = {
        _loggedIn: { attribute: false },
        _socket: { attribute: false },
        _user: { attribute: false }
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
    }

    loginTemplate = () => html`<app-login @loginSubmit="${this._onLogin}"></app-login>`;

    chatTemplate = () => html`
        <div class="chat-container">
            <app-users-list class="users-list"></app-users-list>
            <app-chatbox class="chatbox" @newMessage="${this._onNewMessage}"></app-chatbox>
        </div>
    `;

    socketInit() {
        this._socket.on('message', message => console.log(message));
    }

    render() {       
        return this._loggedIn ?
            this.chatTemplate() :
            this.loginTemplate();
    }

    _onLogin(e) {
        this._socket = io();
        this.socketInit();
        this._user = e.detail.loginName;
        console.log(`logged in as ${this._user}`);
        this._loggedIn = true;
    }

    _onNewMessage(e) {
        this._socket.emit('chatMessage', e.detail.message);
    }
}

customElements.define('app-main', App);