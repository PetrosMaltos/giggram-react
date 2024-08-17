import React, { useState, useEffect } from 'react';
import OrderCard from './components/OrderCard';
import './MyOrders.css';

const MyOrders = () => {
  const orders = [
    { id: 1, title: 'Заказ 1', description: 'Описание заказа 1', tags: ['тег1', 'тег2'], timeAgo: '1 час назад', price: '500' },
    { id: 2, title: 'Заказ 2', description: 'Описание заказа 2', tags: ['тег3', 'тег4'], timeAgo: '2 часа назад', price: '1000' },
    // Добавьте больше данных заказов
  ];

  useEffect(() => {
    // Настройка кнопки "Назад"
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.BackButton.show();

      const handleBackButtonClick = () => window.history.back();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);

    }

  }, []);

  return (
    <div className="my-orders-page">
      <header>
        <h1>Мои Заказы</h1>
      </header>
      <div className="orders-list">
        {orders.map(order => (
          <OrderCard 
            key={order.id}
            title={order.title}
            description={order.description}
            tags={order.tags}
            timeAgo={order.timeAgo}
            price={order.price}
          />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
