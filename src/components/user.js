import { LitElement, html, css } from 'lit';

export class UserItem extends LitElement {
    static properties = {
        name: { type: String },
        color: { type: String }
    }

    static styles = css`
        .user {
            padding: 0.5rem;
            font-size: 1.1rem;
            font-weight: bolder;
        }
    `;

    render() {
        return html`
            <li style="color: var(--${this.color}-200)" class="user">${this.name}</li>
        `;
    }
}

customElements.define('app-user', UserItem);