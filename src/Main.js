import React, { useEffect } from 'react'; // Не забудьте импортировать useEffect
import Navbar from './components/Navbar'; // Импортируем компонент Navbar
import './Main.css'; // Импортируем стили для главной страницы

const Main = () => {
  useEffect(() => {
    // Проверяем наличие Telegram Web App SDK
    if (window.Telegram && window.Telegram.WebApp) {
      // Устанавливаем цвет заголовка
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.setHeaderColor('#000000'); // Черный цвет
    }
  }, []);

  return (
    <div className="main-page">
      <h1>Main Page</h1>
      {/* Добавьте сюда содержание главной страницы */}
      <Navbar /> {/* Добавляем navbar внизу страницы */}
    </div>
  );
};

export default Main;
