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
import CreateOrder from './CreateOrder'
import Login from './components/auth/Login';

const App = () => {

  const orders = [
    {
      id: 1,
      title: 'Проект веб-разработки',
      description: 'Превратите ваши идеи в реальность с этим эксклюзивным предложением! Получите профессиональную поддержку для вашего проекта с индивидуальными решениями и непревзойденным качеством. Действуйте сейчас!',
      tags: ['Веб-разработка', 'Front-End'],
      timeAgo: '1 минута назад',
      price: '100',
      responses: '12',
      views: 134,
      category: 'Веб-разработка',
    },
    {
      id: 2,
      title: 'Проект на Java',
      description: 'Превратите ваши идеи в реальность с этим эксклюзивным предложением! Получите профессиональную поддержку для вашего проекта с индивидуальными решениями и непревзойденным качеством. Действуйте сейчас!',
      tags: ['Веб-разработка', 'Front-End'],
      timeAgo: '1 минута назад',
      price: '5000',
      responses: '11',
      views: 144,
      category: 'Веб-разработка',
    },
    {
      id: 3,
      title: 'Игра на Python',
      description: 'Превратите ваши идеи в реальность с этим эксклюзивным предложением! Получите профессиональную поддержку для вашего проекта с индивидуальными решениями и непревзойденным качеством. Действуйте сейчас!',
      tags: ['Веб-разработка', 'Front-End'],
      timeAgo: '1 минута назад',
      price: '50',
      responses: '10',
      views: 382,
      category: 'Веб-разработка',
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
      fetchOrders(); // Загрузка заказов при старте приложения
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
          <Route path="/create" element={<CreateOrder />} />
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
