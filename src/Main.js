import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderCard from './components/OrderCard';
import Categories from './components/Categories';
import LogoAnimation from './components/LogoAnimation';
import Navbar from './components/Navbar';
import Services from './components/Services';
import AuthPrompt from './components/auth/Login';
import { FaSearch } from 'react-icons/fa';
import ordersData from './components/ordersData'; // Импортируем данные заказов
import './Main.css';

const Main = () => {
  const navigate = useNavigate(); // Используем useNavigate для навигации

  const handleCardClick = (id) => {
    navigate(`/orders/${id}`); // Переход на страницу деталей заказа
  };

  const isLoggedIn = false; // Для управления видимостью AuthPrompt

  return (
    <div className="main-page">
      <Navbar />
      <header className="main-header">
        <LogoAnimation />
        <h1 className="header-title">
          <span className="gradient-text">GigGram</span>: Ваш Центр Фриланса
        </h1>
        <p>Найдите проекты и соединитесь с клиентами.</p>
      </header>

      <section className="search-section-main">
        <input type="text" placeholder="Искать заказы или @пользователей" className="search-input" />
        <button className="search-button">
          <FaSearch className="search-icon" />
        </button>
      </section>

      <section className="featured-orders-section">
        <h2>Новые заказы</h2>
        <div className="main-list">
          {ordersData.map((order) => (
            <div key={order.id} onClick={() => handleCardClick(order.id)}> {/* Добавляем обработчик клика */}
              <OrderCard {...order} />
            </div>
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2>Категории</h2>
        <Categories />
      </section>

      <section className="services-section">
        <h2>Услуги и Цены</h2>
        <Services />
      </section>
    </div>
  );
};

export default Main;
