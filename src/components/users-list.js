import { LitElement, html, css } from 'lit';

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
        this.users = [
            "Arnold",
            "Mister Mime",
            "Donny Darko",
            "Peter Parker",
            "Vin Diesel",
            "John Doe",
            "Duke Nukem",
            "Dukee Nukee"
        ]
    }

    render() {
        return html`
            <div class="users-list">
                <h1>Active Users</h1>
                <ul>
                    ${this.users.map((user) => html`<li class="user">${user}</li>`)}                                      
                </ul>
            </div>
        `;
    }
}

customElements.define('app-users-list', UsersList);