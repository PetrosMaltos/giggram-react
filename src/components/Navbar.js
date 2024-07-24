// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Импортируем useLocation для получения текущего пути
import { Home, List, Mail, User } from 'lucide-react'; // Импортируем иконки из lucide-react
import './Navbar.css'; // Импортируем стили для navbar

const Navbar = () => {
  const location = useLocation(); // Получаем текущий путь

  const getActiveTab = () => {
    switch (location.pathname) {
      case '/orders':
        return 'orders';
      case '/messages':
        return 'messages';
      case '/profile':
        return 'profile';
      default:
        return 'home';
    }
  };

  const [active, setActive] = useState(getActiveTab()); // Устанавливаем активный элемент на основе текущего пути

  useEffect(() => {
    setActive(getActiveTab()); // Обновляем активный элемент при изменении пути
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <Link 
        to="/main" 
        className={`nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={() => setActive('home')}
      >
        <Home className="nav-icon" />
        <span className="nav-text">Home</span>
      </Link>
      <Link 
        to="/orders" 
        className={`nav-item ${active === 'orders' ? 'active' : ''}`}
        onClick={() => setActive('orders')}
      >
        <List className="nav-icon" />
        <span className="nav-text">Orders</span>
      </Link>
      <Link 
        to="/messages" 
        className={`nav-item ${active === 'messages' ? 'active' : ''}`}
        onClick={() => setActive('messages')}
      >
        <Mail className="nav-icon" />
        <span className="nav-text">Messages</span>
      </Link>
      <Link 
        to="/profile" 
        className={`nav-item ${active === 'profile' ? 'active' : ''}`}
        onClick={() => setActive('profile')}
      >
        <User className="nav-icon" />
        <span className="nav-text">Profile</span>
      </Link>
    </nav>
  );
};

export default Navbar;
