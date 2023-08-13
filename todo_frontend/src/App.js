import style from './App.module.css';
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
