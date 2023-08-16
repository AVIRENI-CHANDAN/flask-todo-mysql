import { Component } from "react";
import style from './Login.module.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleInputFocus(event) {
        const label_classes = event.target.labels[0].className.split(' ').filter((cls) => cls !== "");
        if (!label_classes.includes(style.ActiveLabel)) {
            label_classes.push(style.ActiveLabel);
        }
        event.target.labels[0].className = label_classes.join(' ');
    }

    handleInputBlur(event) {
        const label_classes = event.target.labels[0].className.split(' ').filter((cls) => cls !== "");
        // console.log("Input blur: value:", this.state[event.target.name]);
        if (label_classes.includes(style.ActiveLabel) && (this.state[event.target.name] === "")) {
            label_classes.splice(label_classes.indexOf(style.ActiveLabel));
        }
        event.target.labels[0].className = label_classes.join(' ');
    }

    render() {
        return (
            <div className={style.Login}>
                <form method="post" className={style.LoginForm}>
                    <div className={style.FormField}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onInput={this.handleInputChange} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} value={this.state.username} />
                    </div>
                    <div className={style.FormField}>
                        <input type="password" name="password" id="password" onInput={this.handleInputChange} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} value={this.state.password} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className={style.FormField}>
                        <button type="submit" className={style.Btn}>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
