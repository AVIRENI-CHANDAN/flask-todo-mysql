import style from './App.module.css';
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { ABOUT_PATH, BASE_PATH, USER_HOME, USER_LOGIN, USER_LOGOUT } from './components/Links';
import Logout from './components/Logout/Logout'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			access_token: undefined
		};
		this.toggleRefresh = this.toggleRefresh.bind(this);
	}

	componentDidMount() {
		this.setState({ access_token: localStorage.getItem("access_token") });
	}

	toggleRefresh() {
		const access_token = localStorage.getItem("access_token");
		this.setState({ access_token: access_token });
	}

	render() {
		return (
			<div className={style.App}>
				<BrowserRouter>
					<div className={style.AppHeader}>

						<div className={style.Header}>
							<div className={style.Title}>
								<Link to={BASE_PATH}>Todo App</Link>
							</div>
							<div className={style.NavigationMenuBox}>
								<ul className={style.NavigationMenu}>
									<li><Link to={ABOUT_PATH}>About</Link></li>
									{!this.state.access_token && <li><Link to={USER_LOGIN}>Login</Link></li>}
									{this.state.access_token && <li><Link to={USER_LOGOUT}>logout</Link></li>}
								</ul>
							</div>
						</div>

					</div>
					<div className={style.AppContent}>
						<Routes>
							<Route path={BASE_PATH} element={<Home updateParent={this.toggleRefresh} />} />
							<Route path={USER_LOGIN} element={<Login updateParent={this.toggleRefresh} />} />
							<Route path={USER_HOME} element={<Dashboard updateParent={this.toggleRefresh} />} />
							<Route path={USER_LOGOUT} element={<Logout updateParent={this.toggleRefresh} />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
					<div className={style.FooterBox}>
						<footer className={style.Footer}>
							<p className={style.FooterText}>Copyright © 2023 Todo Application. All rights reserved.</p>
						</footer>
					</div>
				</BrowserRouter>
			</div>
		);
	}

}

export default App;
