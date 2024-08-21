import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import Main from './Main';
import Loading from './components/Loading';
import Categories from './components/Categories';
import Services from './components/Services';
import Orders from './Orders';
import Messages from './Messages';
import Chat from './components/Chat';
import OrderDetail from './components/OrderDetail';
import Profile from './Profile';
import { useOrderStore } from './store';
import CreateOrder from './CreateOrder';
import Favors from './Favors';
import Projects from './Projects';
import Specialists from './Specialists';
import Settings from './Settings';
import ProjectPage from './components/ProjectPage';
import { projectsData } from './components/projectData';
import Help from './Help';
import MyOrders from './MyOrders';
import MyProjects from './MyProjects';
import MyFavors from './MyFavors';
import { ordersData } from './components/ordersData'; // Импортируем данные заказов
import Login from './Login';
import Register from './Register';
import EditProfile from './EditProfile';

const App = () => {
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
          <Route path="/orders" element={<Orders orders={ordersData} />} />
          <Route path="/orders/:id" element={<OrderDetail orders={ordersData} />} />
          <Route path="/create" element={<CreateOrder />} />
          <Route path="/main" element={<Main />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/favors" element={<Favors />} />
          <Route path="/chat/:username" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/services" element={<Services />} />
          <Route path="/specialists" element={<Specialists />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects/:id" element={<ProjectPage projects={projectsData} isAuthenticated={true} />} />
          <Route path="/help" element={<Help />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/my-favors" element={<MyFavors />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
