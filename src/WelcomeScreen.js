import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/main'); // Перенаправляем на главную страницу
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <img src="/images/logo_without_bg.png" alt="GigGram Logo" className="welcome-logo" />
        <h1 className="welcome-title">Welcome to GigGram! 🎉</h1>
        <p className="welcome-description">
          The first freelance platform on Telegram where freelancers keep 99% of their earnings. 💰 The remaining 1% is donated to charitable causes. ❤️
        </p>
        <div className="project-info">
          <h2>About Us 🧐</h2>
          <p>GigGram is the first freelance platform on Telegram. We charge no fees—freelancers keep 99% of their earnings, and 1% is donated to charitable foundations. Experience the freedom and support of working with us. 🙌</p>
        </div>
        <button className="welcome-button" onClick={handleGetStarted}>Get Started 🚀</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
