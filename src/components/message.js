import { LitElement, html, css } from 'lit';

export class MessageItem extends LitElement {
    static properties = {
        user: { type: String },
        time: { type: String },
        text: { type: String },
        color: { type: String }
    }

    static styles = css`
        .message-data {
            margin-bottom: 15px;
        }
        .message-data-time {
            color: #a8aab1;
            padding-left: 6px;
        }
        .message {
            color: white;
            padding: 18px 20px;
            line-height: 26px;
            font-size: 16px;
            border-radius: 7px;
            margin-bottom: 30px;
            width: 95%;
            position: relative;           
        }
    `;

    render() {
        const messageColor = `background: var(--${this.color}-600)`;
        const messageBorder = `border-bottom-color: var(--${this.color}-600)`;
        let outText = this.text.split('<br/>');

        return html`
            <li>
                <div class="message-data">
                    <span class="message-data-name">${this.user}</span>
                    <span class="message-data-time">${this.time}</span>
                </div>
                <div class="message" style="${messageColor}; ${messageBorder};">
                    ${outText.length < 2 ? outText[0] : outText.map(t => html`${t}<br/>`)}
                </div>
            </li>
        `;
    }
}

customElements.define('app-message', MessageItem);