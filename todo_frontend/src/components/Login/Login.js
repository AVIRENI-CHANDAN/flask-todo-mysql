import { Component } from "react";
import style from './Login.module.css';
import { USER_LOGIN } from "../Links";
import { Navigate } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            next: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (label_classes.includes(style.ActiveLabel) && (this.state[event.target.name] === "")) {
            label_classes.splice(label_classes.indexOf(style.ActiveLabel));
        }
        event.target.labels[0].className = label_classes.join(' ');
    }

    async handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        console.log("Form data:", formData);
        try {
            const response = await fetch(USER_LOGIN, {
                method: 'POST',
                body: formData
            });
            if (response.redirected) {
                console.log(response);
                const redirectUrlObject = new URL(response.url);
                console.log("Thew reidrection path:", redirectUrlObject.pathname, redirectUrlObject);
                this.setState({
                    next: redirectUrlObject.pathname
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            this.state.next === "" ?
                (<div className={style.Login}>
                    <form className={style.LoginForm} onSubmit={this.handleSubmit}>
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
                </div>) : (<Navigate to={this.state.next} />)
        );
    }
}

export default Login;
