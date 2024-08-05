// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import Main from './Main';
import Loading from './components/Loading';
import Categories from './components/Categories';
import Services from './components/Services';
import Orders from './Orders';
import Messages from './Messages';
import OrderDetail from './components/OrderDetail';
import Profile from './Profile';
import { useOrderStore } from './store';
import Login from './components/auth/Login';


const App = () => {

  const orders = [
    {
      id: 1,
      title: 'Web Development Project',
      description: 'Transform your ideas into reality with this exclusive offer! Get expert support for your project, with tailored solutions and unmatched quality. Act now!',
      tags: ['Web Development', 'Front-End'],
      timeAgo: '1 minute',
      price: '100',
      responses: '12',
      views: 134,
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'Java Project',
      description: 'Transform your ideas into reality with this exclusive offer! Get expert support for your project, with tailored solutions and unmatched quality. Act now!',
      tags: ['Web Development', 'Front-End'],
      timeAgo: '1 minute',
      price: '5000',
      responses: '11',
      views: 144,
      category: 'Web Development',
    },
    {
      id: 3,
      title: 'Game on Python',
      description: 'Transform your ideas into reality with this exclusive offer! Get expert support for your project, with tailored solutions and unmatched quality. Act now!',
      tags: ['Web Development', 'Front-End'],
      timeAgo: '1 minute',
      price: '50',
      responses: '10',
      views: 382,
      category: 'Web Development',
    },
    
    // Добавьте другие заказы здесь
  ];
  

  const [loading, setLoading] = useState(true);
  const { fetchOrders } = useOrderStore(state => ({
    fetchOrders: state.fetchOrders,
  }));

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.setHeaderColor('#000000');
    }

    const timer = setTimeout(() => {
      setLoading(false);
      fetchOrders(); // Загрузите заказы при старте приложения
    }, 2000);

    return () => clearTimeout(timer);
  }, [fetchOrders]);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail orders={orders} />} />
          <Route path="/main" element={<Main />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/services" element={<Services />} />
          <Route path="/auth" element={<Login />} /> {/* Обновленный путь */}
        </Routes>
      )}
    </Router>
  );
};

export default App;
