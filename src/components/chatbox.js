import { LitElement, html, css } from 'lit';
import './message'

export class ChatBox extends LitElement {
    static properties = {
        messages: {},
        _input: { attribute: false }
    }

    static styles = css`
        .chat-area {
            padding: 5px 20px;
            height: 100%;
            flex-grow: 1;
            border-bottom: 2px solid white;
            overflow-y: scroll;
        }
        .chat-area ul {
            margin-right: 20px;
            padding-left: 0;
            display: flex;
            flex-direction: column-reverse;
            align-items: flex-start;
            list-style-type: none;
        }
        .chat-form {
            padding: 10px;
            display: flex;
            justify-content: space-around;
        }
        .chat-form input {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px 0px 0px 5px;
            font: 16px/22px "Lato", Arial, sans-serif;
            resize: none;
        }
        .chat-form button {
            background: #444753;
            color: #f2f5f8;
            text-transform: uppercase;
            font-weight: bold; 
            border: none;
            border-radius: 0px 5px 5px 0px;
            cursor: pointer;
        }
        .chat-form button:hover {
            color: #75b1e8;
        }

        @media only screen and (min-width: 768px) {
            .chat-area {
                height: 650px;
            }
            .chat-area ul {
                padding-left: 40px;
            }
        }
    `;

    constructor() {
        super();
        this._input = "";
    }

    render() {
        return html`
            <div class="chat-area">
                <ul>
                    ${this.messages.map(message => html`
                    <app-message 
                        user=${message.user}
                        text=${message.text}
                        time=${message.time}
                        color=${message.color}>
                    </app-message>`)}
                </ul>
            </div>
            <div class="chat-form">
                <input  placeholder="Type your message" 
                        .value="${this._input}" 
                        @input="${this._onInput}">

                <button @click="${this._onSendClick}">Send</button>
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