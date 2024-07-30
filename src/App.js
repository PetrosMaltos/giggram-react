// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import Main from './Main';
import Loading from './components/Loading'; // Импортируем компонент Loading
import Categories from './components/Categories'; // Импортируем страницу категорий
import Services from './components/Services'; // Импортируем страницу Services
import Orders from './Orders';
import Messages from './Messages';
import Profile from './Profile';


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем наличие Telegram Web App SDK
    if (window.Telegram && window.Telegram.WebApp) {
      // Устанавливаем цвет заголовка
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.setHeaderColor('#000000'); // Черный цвет
    }

    // Симулируем задержку загрузки
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 2 секунды задержки

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/main" element={<Main />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/services" element={<Services />} /> {/* Добавляем маршрут для Services */}
          {/* Добавьте другие маршруты здесь */}
        </Routes>
      )}
    </Router>
  );
};

export default App;
