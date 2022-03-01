import { LitElement, html, css } from 'lit';
import './user'

export class UsersList extends LitElement {
    static properties = {
        users: {}
    };

    static styles = css`
        h1 {
            font-size: 1.5rem;
            margin: 25px auto;
            font-weight: bold;
        }
        ul {
            padding: 0;
            list-style: none;
        }
    `;

    constructor() {
        super();
        this.users = {}
    }

    render() {
        return html`
            <h1>Active Users</h1>
            <ul>
                ${Object.keys(this.users).map(user => 
                    html`<app-user name=${user} color=${this.users[user]}></app-user>`)}                                      
            </ul>
        `;
    }
}

customElements.define('app-users-list', UsersList);