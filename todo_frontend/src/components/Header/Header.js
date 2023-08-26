import { Component } from "react";
import style from './Header.module.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { USER_LOGIN } from "../Links";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: undefined
        }
    }

    componentDidMount() {
        console.log("Header component mounted:", Cookies.get('session'), document.cookie);
        this.setState({
            session: Cookies.get('session')
        });
    }

    render() {
        const navMenuBarStatus = this.state.session === undefined;
        console.log("Session status:", navMenuBarStatus, Cookies.get('session'));
        return (
            <div className={style.Header}>
                <div className={style.Title}>
                    <Link to="/">Todo App</Link>
                </div>
                <div className={style.NavigationMenuBox}>
                    <ul className={style.NavigationMenu}>
                        <li><Link to="/about">About</Link></li>
                        {navMenuBarStatus && (<li><Link to={USER_LOGIN}>Login</Link></li>)}
                        {(!navMenuBarStatus) && (<li><Link to="/logout">logout</Link></li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;
