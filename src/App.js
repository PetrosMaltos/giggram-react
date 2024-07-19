import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Main from './Main';
import './App.css';

const tg = window.Telegram.WebApp;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    tg.ready();
    tg.setHeaderColor('#000000'); // Установите нужный вам цвет здесь

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
        <Routes>
          <Route path="/main" element={<Main />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
