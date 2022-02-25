import { LitElement, html, css } from 'lit';

export class ChatBox extends LitElement {
    static properties = {
        messages: {}
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
        this.messages = [
            { author: "Mister Mime", text: "Are we meeting today? Project has been already finished and I have results to show you.", time: "22:12, Today" },
            { author: "Arnold", text: "Yes, lets meet after lunch!", time: "22:16, Today" },
            { author: "Vin Diesel", text: "I'm Groot!", time: "22:18, Today" },
            { author: "John Doe", text: "Can i join the meeting?", time: "22:19, Today" },
            { author: "Arnold", text: "Sure thing! But do i know you?", time: "22:20, Today" },
            { author: "John Doe", text: "Nobody knows me, i'm a little bit anonymous around here", time: "22:21, Today" },
            { author: "Peter Parker", text: "I wanna join too!", time: "22:21, Today" },
            { author: "Mister Mime", text: "Both of you can join, i hope i won't bore you to death :)", time: "22:22, Today" },
            { author: "John Doe", text: "Great!", time: "22:24, Today" }
        ]
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
                        <input name="message-to-send" id="message-to-send" placeholder="Type your message">
                        <button>Send</button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('app-chatbox', ChatBox);