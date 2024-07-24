import React from 'react';
import OrderCard from './components/OrderCard';
import Categories from './components/Categories';
import LogoAnimation from './components/LogoAnimation';
import Navbar from './components/Navbar';
import { FaSearch } from 'react-icons/fa'; // Import search icon
import './Main.css';

const Main = () => {
  const orders = [
    {
      title: 'Web Development Project',
      description: 'Build a modern website for a local business.',
      tags: ['Web Development'],
      timeAgo: '1 minute',
      price: '500',
      responses: '10',
      views: 134,
    },
    {
      title: 'Logo Design',
      description: 'Create a unique logo for a startup company.',
      tags: ['Design'],
      timeAgo: '10 seconds',
      price: '150',
      responses: '5',
      views: 328,
    },
    // Add more orders as needed
  ];

  return (
    <div className="main-page">
      <Navbar />
      <header className="main-header">
        <LogoAnimation />
        <h1><span className="gradient-text">GigGram</span>: Your Freelance Hub</h1>
        <p>Find great projects and connect with clients easily.</p>
      </header>

      <section className="search-section">
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
        <h2>Services</h2>
        <div className="services-list">
          {/* Your services */}
        </div>
      </section>

      <footer className="main-footer">
        <button className="get-started-button">Get Started</button>
        <button className="become-freelancer-button">Join Us</button>
      </footer>
    </div>
  );
};

export default Main;
