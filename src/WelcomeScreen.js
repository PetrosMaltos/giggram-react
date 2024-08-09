import React, { useEffect } from 'react';
import './WelcomeScreen.css'; // Импортируем стили для WelcomeScreen
import LogoAnimation from './components/LogoAnimation'; // Импортируем анимацию логотипа

const WelcomeScreen = () => {
  useEffect(() => {
    // Устанавливаем стили для body и html только для этого компонента
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "'Montserrat', sans-serif";
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
        <h1 className="welcome-title">Добро пожаловать в GigGram!</h1>
        <p className="welcome-description">
          Первая платформа фриланса в Telegram, где фрилансеры сохраняют 99% своих доходов. 💰 Оставшийся 1% перечисляется на благотворительность ❤️
        </p>
        <div className="project-info">
          <h2>О нас 🧐</h2>
          <p>GigGram - это первая платформа фриланса в Telegram. Мы не взимаем комиссий — фрилансеры сохраняют 99% своих доходов, а 1% перечисляется в благотворительные фонды. Оцените свободу и поддержку работы с нами. 🙌</p>
        </div>
        <button className="welcome-button" onClick={handleGetStarted}>Начать 🚀</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
