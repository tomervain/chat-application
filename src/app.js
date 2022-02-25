import { LitElement, html, css } from 'lit';

import { UsersList } from './components/users-list';
import { ChatBox } from './components/chatbox';

class App extends LitElement {
    static properties = {
        _loggedIn: { attribute: false },
        _nameValue: { attribute: false }
    }

    static styles = css`
        .login-container {
            margin: 0 auto;
            height: 800px;
            width: 80%;
            background: #444753;
            border-radius: 0;
        }
        .login-container h1 {
            font-size: 3rem;
            font-weight: 300;
            text-align: center;
            padding-top: 80px;
        }
        .login-container .login-page {
            width: 360px;
            padding: 5% 0 0;
            margin: auto;
        }
        .login-container .form {
            position: relative;
            z-index: 1;
            background: white;
            max-width: 360px;
            margin: 0 auto 100px;
            padding: 45px;
            text-align: center;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        }
        .login-container .form input {
            outline: 0;
            background: #f2f2f2;
            width: 100%;
            border: 0;
            margin: 0 0 15px;
            padding: 15px;
            box-sizing: border-box;
            font-size: 14px;
        }
        .login-container .form button {
            text-transform: uppercase;
            outline: 0;
            background: #5491ca;
            width: 100%;
            border: 0;
            padding: 15px;
            color: #FFFFFF;
            font-size: 14px;
            -webkit-transition: all 0.3 ease;
            transition: all 0.3 ease;
            cursor: pointer;
        }
        .login-container .form button:hover {
            background: #4689c8;
        }
        .login-container .form .message {
            padding-bottom: 10px;
            color: #434752;
            font-size: 16px;
        }

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
        this._nameValue = "";
    }

    loginTemplate = () => html`
        <div class="login-container">
            <h1>Welcome to Smart Chat Application</h1>
            <div class="login-page">
                <div class="form">
                    <div class="login-form">
                        <p class="message">Please enter your name for the chat:</p>
                        <input type="text" 
                            placeholder="name" 
                            .value="${this._nameValue}" 
                            @input="${this._onInput}"/>
                        <button @click="${this._login}">enter</button>                       
                    </div>
                </div>
            </div>
        </div>
    `;

    chatTemplate = () => html`
        <div class="chat-container">
            <app-users-list class="users-list"></app-users-list>
            <app-chatbox class="chatbox"></app-chatbox>
        </div>
    `;

    render() {
        return this._loggedIn ?
            this.chatTemplate() :
            this.loginTemplate();
    }

    _onInput(e) {
        this._nameValue = e.target.value;
    }

    _login() {
        console.log(`logged in as ${this._nameValue}`);
        this._loggedIn = true;
    }
}

customElements.define('app-main', App);