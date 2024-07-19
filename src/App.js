// src/App.js
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import './App.css';

const tg = window.Telegram.WebApp;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    tg.ready();
    tg.setHeaderColor('#000000'); // Установите нужный вам цвет здесь

    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const onRegister = () => {
    console.log('Register button clicked');
  };

  const onLogin = () => {
    console.log('Login button clicked');
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App">
      <div className="welcome-screen">
        <h1 className="fade-in gradient-text">Welcome to GigGram!</h1>
        <p className="fade-in">The first freelance platform on Telegram. Earn 100% with zero fees!</p>
        <ul className="fade-in">
          <li>💼 Post and find freelance jobs with ease.</li>
          <li>🔍 Discover talented freelancers from various fields.</li>
          <li>💬 Communicate seamlessly within Telegram.</li>
          <li>⚡ Quick and easy payment processing.</li>
          <li>🚀 Boost your career and grow your business.</li>
        </ul>
        <div className="button-container fade-in">
          <button className="btn btn-got-it">Got it</button>
        </div>
      </div>
    </div>
  );
}

export default App;
