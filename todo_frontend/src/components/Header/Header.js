import { Component } from "react";
import style from './Header.module.css';

class Header extends Component {
    render() {
        return (
            <div className={style.Header}>
                <div className={style.Title}>
                    <a href="/">Todo App</a>
                </div>
                <div className={style.NavigationMenuBox}>
                    <ul className={style.NavigationMenu}>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;
