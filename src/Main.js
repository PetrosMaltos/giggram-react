import React from 'react';
import Navbar from './components/Navbar'; // Импортируем компонент Navbar
import './Main.css'; // Импортируем стили для главной страницы

const Main = () => {
  return (
    <div className="main-page">
      <h1>Main Page</h1>
      {/* Добавьте сюда содержание главной страницы */}
      <Navbar /> {/* Добавляем navbar внизу страницы */}
    </div>
  );
};

export default Main;
