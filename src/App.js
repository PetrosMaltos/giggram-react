import React, { useEffect } from 'react';
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
import ScrollToTop from './components/ScrollToTop';
import BackButton from './components/BackButton';

const App = () => {
  const orders = [
    { 
      id: 1, 
      title: 'Web Development Project', 
      description: 'Build a modern website with responsive design and high performance. Includes front-end and back-end development, SEO optimization, and more.', 
      tags: ['Web Development'], 
      timeAgo: '1 minute', 
      price: '500', 
      responses: '10', 
      views: 134 
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

      // Устанавливаем обработчик кнопки "Назад"
      window.Telegram.WebApp.onEvent('backButtonClicked', () => {
        window.history.back();
      });
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
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail orders={orders} />} />
            <Route path="/main" element={<Main />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
