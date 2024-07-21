import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { Home, List, Mail, User } from 'lucide-react'; // Импортируем иконки из lucide-react

import './Navbar.css'; // Импортируем стили для navbar

const Navbar = () => {
  const [active, setActive] = useState('home'); // Состояние для активного элемента
  const navigate = useNavigate(); // Создаем объект navigate

  const handleHomeClick = () => {
    window.location.reload(); // Перезагружаем страницу
  };

  return (
    <nav className="navbar">
      <div 
        className={`nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={() => {
          handleHomeClick();
          setActive('home');
        }}
      >
        <Home className="nav-icon" />
        <span className="nav-text">Home</span>
      </div>
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
