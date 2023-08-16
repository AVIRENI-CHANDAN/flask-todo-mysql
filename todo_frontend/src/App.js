import style from './App.module.css';
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div className={style.App}>
        <div className={style.AppHeader}>
          <Header />
        </div>
        <div className={style.AppContent}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
        <div className={style.FooterBox}>
          <footer className={style.Footer}>
            <p className={style.FooterText}>Copyright © 2023 Todo Application. All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
