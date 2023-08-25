import { Component } from "react";
import style from './Header.module.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        const currentPath = window.location.pathname;
        const navMenuBarStatus = (currentPath === "/" || currentPath === "/login" || currentPath === "/about");

        return (
            <div className={style.Header}>
                <div className={style.Title}>
                    <Link to="/">Todo App</Link>
                </div>
                <div className={style.NavigationMenuBox}>
                    <ul className={style.NavigationMenu}>
                        {navMenuBarStatus && (<li><Link to="/login">Login</Link></li>)}
                        {navMenuBarStatus && (<li><Link to="/about">About</Link></li>)}
                        {(!navMenuBarStatus) && (<li><Link to="/logout">logout</Link></li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;
