import { LitElement, html, css } from 'lit';

export class Login extends LitElement {
    static properties = {
        users: {},
        _value: { attribute: false }
    }

    static styles = css`
        .login-container {
            margin: 0 auto;
            padding: 10px;
            background: var(--theme-dark);
        }
        .login-container h1 {
            padding-top: 5px;
            text-align: center;
            font-size: 2rem;
            font-weight: 300;
            line-height: 42px
        }
        .login-page {
            width: 360px;
            padding: 2% 0 0;
            margin: auto;
        }
        .form {
            margin: 0 auto 100px;
            padding: 45px;
            max-width: 360px;
            position: relative;
            z-index: 1;
            background: white;
            box-shadow: 
                0 0 20px 0 rgba(0, 0, 0, 0.2), 
                0 5px 5px 0 rgba(0, 0, 0, 0.24);
            text-align: center;
        }
        .form input {
            width: 100%;
            margin: 0 0 15px;
            padding: 15px;
            border: 0;
            outline: 0;
            box-sizing: border-box;
            background: #f2f2f2;
            font-size: 14px;
        }
        .form button {
            text-transform: uppercase;
            outline: 0;
            background: #5491ca;
            width: 100%;
            border: 0;
            padding: 15px;
            color: white;
            font-size: 14px;
            -webkit-transition: all 0.3 ease;
            transition: all 0.3 ease;
            cursor: pointer;
        }
        .form button:hover {
            background: #4689c8;
        }
        .message {
            padding-bottom: 10px;
            font-size: 16px;
            color: #434752;
        }

        @media only screen and (min-width: 992px) {
            .login-container {
                height: 800px;
                width: 80%;
                padding: auto;
            }
            .login-container h1 {
                padding-top: 80px;
                font-size: 3rem;
                line-height: 20px;
            }
            .login-page {
                padding: 5% 0 0;
            }
        }
    `;

    constructor() {
        super();
        this._value = "";
    }

    render() {
        return html`
            <div class="login-container">
                <h1>Welcome to Smart Chat Application</h1>
                <div class="login-page">
                    <div class="form">
                        <div class="login-form">
                            <p class="message">Please enter your name for the chat:</p>
                            <input type="text" 
                                   placeholder="name" 
                                   .value="${this._value}" 
                                   @input="${this._onInput}" 
                                   @keyup="${this._onKeyUp}"/>
                            <button @click="${this._onClick}">enter</button>                       
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    _onInput = (e) => this._value = e.target.value;

    _onClick() {
        this._dispatchLoginEvent();
    }

    _onKeyUp(e) {
        console.log(Object.keys(this.users));
        if (e.key === 'Enter')
            this._dispatchLoginEvent();
    }

    _dispatchLoginEvent() {
        let event = new CustomEvent('loginSubmit', {
            detail: { loginName: this._value },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }
}

customElements.define('app-login', Login);