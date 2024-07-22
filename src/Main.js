import React from 'react';
import OrderCard from './components/OrderCard'; // Импортируем компонент OrderCard
import Categories from './components/Categories'; // Импортируем компонент Categories
import LogoAnimation from './components/LogoAnimation'; // Импортируем анимацию логотипа
import Navbar from './components/Navbar'; // Импортируем компонент Navbar
import './Main.css'; // Импортируем стили для главной страницы

const Main = () => {
  const orders = [
    {
      title: 'Web Development Project',
      description: 'Build a modern website for a local business.',
      tags: ['Web Development'],
      timeAgo: '2 days',
      price: '500',
      responses: '10',
      rating: '4.5',
    },
    {
      title: 'Logo Design',
      description: 'Create a unique logo for a startup company.',
      tags: ['Design'],
      timeAgo: '1 day',
      price: '150',
      responses: '5',
      rating: '4.0',
    },
    // Добавьте больше заказов по необходимости
  ];

  return (
    <div className="main-page">
      <Navbar /> {/* Добавляем компонент Navbar */}
      <header className="main-header">
        <LogoAnimation />
        <h1>Welcome to GigGram</h1>
        <p>The best platform for freelancers. Keep 99% of your earnings and support charitable causes!</p>
      </header>

      <section className="search-section">
        <input type="text" placeholder="Search for orders" className="search-input" />
        <button className="search-button">Search</button>
      </section>

      <section className="featured-orders-section">
        <h2>New Orders</h2>
        <div className="orders-list">
          {orders.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2>Categories</h2>
        <Categories /> {/* Используем компонент Categories */}
      </section>

      <section className="services-section">
        <h2>Services</h2>
        <div className="services-list">
          {/* Ваши услуги */}
        </div>
      </section>

      <footer className="main-footer">
        <button className="get-started-button">Get Started 🚀</button>
        <button className="become-freelancer-button">Become a Freelancer</button>
      </footer>
    </div>
  );
};

export default Main;
