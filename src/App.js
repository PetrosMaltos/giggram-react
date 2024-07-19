import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import './App.css';


const tg = window.Telegram.WebApp;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    tg.ready();
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
  };

  const handleResetClick = () => {
    localStorage.removeItem('gotItClicked');
    setShowWelcome(true);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App">
      {showWelcome ? (
        <div className="welcome-screen">
          <img src="/images/logo_without_bg.png" className="logo" />
          <h1 className="fade-in gradient-text">Welcome to GigGram!</h1>
          <p className="fade-in">The first freelance platform on Telegram. Earn 100% with zero fees!</p>
          <ul className="fade-in">
            <li>💼 Post and find freelance jobs with ease.</li>
            <li>🔍 Discover talented freelancers from various fields.</li>
            <li>💬 Communicate seamlessly within Telegram.</li>
            <li>⚡ Quick and easy payment processing.</li>
          </ul>
          <div className="button-container fade-in">
            <button className="btn btn-got-it" onClick={handleGotItClick}>Got it</button>
          </div>
        </div>
      ) : (
        <div>
          {/* Основной контент вашего приложения */}
        </div>
      )}
    </div>
  );
}

export default App;
