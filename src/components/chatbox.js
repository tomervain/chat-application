import { LitElement, html, css } from 'lit';

export class ChatBox extends LitElement {
    static properties = {
        messages: {},
        _input : { attribute: false }
    }

    static styles = css`
        .chatbox {
            width: 100%;
            background: #f2f5f8;
            color: #434651;
            height: 100%;
        }
        .chatbox .chat-area {
            padding: 30px 30px 20px;
            border-bottom: 2px solid white;
            overflow-y: auto;
            height: 650px;
        }
        .chatbox .chat-area ul {
            display: flex;
            flex-direction: column-reverse;
            list-style-type: none;
        }
        .chatbox .chat-area .message-data {
            margin-bottom: 15px;
        }
        .chatbox .chat-area .message-data-time {
            color: #a8aab1;
            padding-left: 6px;
        }
        .chatbox .chat-area .message {
            color: white;
            background: #86bb71;
            padding: 18px 20px;
            line-height: 26px;
            font-size: 16px;
            border-radius: 7px;
            margin-bottom: 30px;
            width: 95%;
            position: relative;
        }
        .chatbox .chat-area .message:after {
            bottom: 100%;
            left: 7%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-bottom-color: #86bb71;
            border-width: 10px;
            margin-left: -10px;
        }
        .chatbox .chat-form {
            padding: 17px 30px 10px;
        }
        .chatbox .chat-form input {
            width: 100%;
            border: none;
            padding: 8px 10px;
            font: 16px/22px "Lato", Arial, sans-serif;
            margin-bottom: 10px;
            border-radius: 5px;
            resize: none;
        }
        .chatbox .chat-form button {
            float: right;
            color: #94c2ed;
            font-size: 1rem;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            font-weight: bold;
            background: #f2f5f8;
        }
        .chatbox .chat-form button:hover {
            color: #75b1e8;
        }
    `;

    constructor() {
        super();
        this._input = "";
    }

    messageTemplate = (author, text, time) => html`
        <li>
            <div class="message-data">
                <span class="message-data-name">${author}</span>
                <span class="message-data-time">${time}</span>
            </div>
            <div class="message my-message">${text}</div>
        </li>
    `;

    render() {
        return html`
            <div class="chatbox">
                    <div class="chat-area">
                        <ul>
                            ${this.messages.map((message) => this.messageTemplate(message.author, message.text, message.time))}
                        </ul>
                    </div>
                    <div class="chat-form">
                        <input id="message-to-send" 
                            placeholder="Type your message" 
                            .value="${this._input}" 
                            @input="${this._onInput}">
                        <button @click="${this._onSendClick}">Send</button>
                    </div>
                </div>
            </div>
        `;
    }

    _onInput = (e) => this._input = e.target.value;

    _onSendClick() {
        this._dispatchSubmitNewMessageEvent(this._input);
        this._input = ""; // clear input text
    };

    _dispatchSubmitNewMessageEvent(text) {
        let event = new CustomEvent('newMessage', {
            detail: { message: text },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }
}

customElements.define('app-chatbox', ChatBox);