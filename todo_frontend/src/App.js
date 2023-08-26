import style from './App.module.css';
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { BASE_PATH, USER_HOME, USER_LOGIN } from './components/Links';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    this.setState({ loaded: true });
  }
  componentDidUpdate() {
    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }
  }
  toogleRefresh = () => {
    console.log("Parent update triggered");
    this.setState({ loaded: !this.state.loaded });
  }

  render() {
    return (
      <div className={style.App}>
        <BrowserRouter>
          <div className={style.AppHeader}>
            {this.state.loaded && (
              <Header />
            )}
          </div>
          <div className={style.AppContent}>
            <Routes>
              <Route path={BASE_PATH} element={<Home />} />
              <Route path={USER_LOGIN} element={<Login updateParent={this.toogleRefresh} />} />
              <Route path={USER_HOME} element={<Dashboard />} />
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
