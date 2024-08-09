import React from 'react';
import OrderCard from './components/OrderCard';
import Categories from './components/Categories';
import LogoAnimation from './components/LogoAnimation';
import Navbar from './components/Navbar';
import Services from './components/Services';
import AuthPrompt from './components/auth/Login';
import { FaSearch } from 'react-icons/fa';
import './Main.css';

const Main = () => {
  const orders = [
    {
      title: 'Веб-разработка',
      description: 'Создайте современный сайт для бизнеса.',
      tags: ['Веб-разработка', 'Front-End'],
      timeAgo: '1 мин.',
      price: '500',
      responses: '10',
      views: 134,
    },
    {
      title: 'Дизайн логотипа',
      description: 'Создайте уникальный логотип для стартапа.',
      tags: ['Дизайн', 'Брендинг'],
      timeAgo: '10 сек.',
      price: '150 тыс.',
      responses: '5',
      views: 328,
    },
  ];

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
        <div className="orders-list">
          {orders.map((order, index) => (
            <OrderCard key={index} {...order} />
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
