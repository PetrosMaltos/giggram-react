import React, { useEffect } from 'react';
import './WelcomeScreen.css'; // Импортируем стили для WelcomeScreen
import LogoAnimation from './components/LogoAnimation'; // Импортируем анимацию логотипа

const WelcomeScreen = () => {
  useEffect(() => {
    // Устанавливаем стили для body и html только для этого компонента
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#e0e0e0';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh'; // Полная высота экрана

    return () => {
      // Сброс стилей, когда компонент демонтируется
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.fontFamily = '';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/main'; // Перенаправляем на главную страницу
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <LogoAnimation />
        <h1 className="welcome-title">Welcome to GigGram!</h1>
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
