import React from 'react';
import OrderCard from './components/OrderCard';
import Categories from './components/Categories';
import LogoAnimation from './components/LogoAnimation';
import Navbar from './components/Navbar';
import Services from './components/Services';
import AuthPrompt from './components/auth/AuthPrompt'; // Путь должен совпадать с именем файла
import { FaSearch } from 'react-icons/fa';
import './Main.css';

const Main = () => {
  const orders = [
    {
      title: 'Web Development Project',
      description: 'Build a modern website for a local business.',
      tags: ['Web Development', 'Front-End'],
      timeAgo: '1 minute',
      price: '500',
      responses: '10',
      views: 134,
    },
    {
      title: 'Logo Design',
      description: 'Create a unique logo for a startup company.',
      tags: ['Design', 'Branding'],
      timeAgo: '10 seconds',
      price: '150',
      responses: '5',
      views: 328,
    },
    // Add more orders as needed
  ];

  // Temporary state for showing AuthPrompt
  const isLoggedIn = false; // Change this to control visibility

  return (
    <div className="main-page">
      <Navbar />
      <header className="main-header">
        <LogoAnimation />
        <h1><span className="gradient-text">GigGram</span>: Your Freelance Hub</h1>
        <p>Find great projects and connect with clients easily.</p>
      </header>

      <section className="search-section-main">
        <input type="text" placeholder="Search for orders or @users" className="search-input" />
        <button className="search-button">
          <FaSearch className="search-icon" />
        </button>
      </section>

      <section className="featured-orders-section">
        <h2>New orders</h2>
        <div className="orders-list">
          {orders.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2>Categories</h2>
        <Categories />
      </section>

      <section className="services-section">
        <h2>Services and Prices</h2>
        <Services />
      </section>

    </div>
  );
};

export default Main;
