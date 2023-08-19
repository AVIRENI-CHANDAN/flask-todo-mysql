import { Component } from "react";
import style from './Header.module.css';

class Header extends Component {
    render() {
        const currentPath = window.location.pathname;
        const links = [
            (currentPath === "/" || currentPath === "/login" || currentPath === "/about") && (<li><a href="/login">Login</a></li>),
            (currentPath === "/" || currentPath === "/login" || currentPath === "/about") && (<li><a href="/about">About</a></li>),
            (!(currentPath === "/" || currentPath === "/login" || currentPath === "/about")) && (<li><a href="/logout">logout</a></li>)
        ];

        return (
            <div className={style.Header}>
                <div className={style.Title}>
                    <a href="/">Todo App</a>
                </div>
                <div className={style.NavigationMenuBox}>
                    <ul className={style.NavigationMenu}>
                        {links}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;
