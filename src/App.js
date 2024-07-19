import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Main from './Main';
import './App.css';

// Добавьте эту строку, чтобы получить доступ к Telegram WebApp
const tg = window.Telegram.WebApp;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    tg.ready(); // Инициализация WebApp
    tg.setHeaderColor('#000000'); // Установите нужный вам цвет здесь

    // Check if "Got it" was already clicked
    const gotItClicked = localStorage.getItem('gotItClicked');
    if (gotItClicked) {
      setShowWelcome(false);
    }

    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGotItClick = () => {
    localStorage.setItem('gotItClicked', 'true');
    setShowWelcome(false);
    navigate('/main'); // Redirect to main content
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App">
      {showWelcome ? (
        <div className="welcome-screen">
          <img src="/images/logo_without_bg.png" className="logo" alt="Logo" />
          <h1 className="welcome-h1 gradient-text">Welcome to GigGram!</h1>
          <p className="welcome-p">The first freelance platform on Telegram. Earn 100% with zero fees!</p>
          <ul className="welcome-ul">
            <li className="welcome-li">💼 Post and find freelance jobs with ease.</li>
            <li className="welcome-li">🔍 Discover talented freelancers from various fields.</li>
            <li className="welcome-li">💬 Communicate seamlessly within Telegram.</li>
            <li className="welcome-li">⚡ Quick and easy payment processing.</li>
          </ul>
          <div className="button-container">
            <button className="btn btn-got-it" onClick={handleGotItClick}>Got it</button>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/main" element={<Main />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
