import { LitElement, html, css } from 'lit';

import { UserItem } from './user'

export class UsersList extends LitElement {
    static properties = {
        users: {},
    };

    static styles = css`
        .users-list {
            text-align: center;
        }
        .users-list h1 {
            font-size: 1.5rem;
            margin: 25px auto;
            font-weight: bold;
        }
        .users-list ul {
            padding: 0;
            list-style: none;
        }
        .users-list .user {
            padding: 0.5rem;
            font-size: 1.1rem;
            font-weight: bolder;
        }
    `;

    constructor() {
        super();
        this.users = {}
    }

    render() {
        return html`
            <div class="users-list">
                <h1>Active Users</h1>
                <ul>
                    ${Object.keys(this.users).map(user => html`<app-user name=${user} color=${this.users[user]}></app-user>`)}                                      
                </ul>
            </div>
        `;
    }
}

customElements.define('app-users-list', UsersList);