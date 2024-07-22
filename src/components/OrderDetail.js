// components/OrderDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();

  // Вы можете использовать id для загрузки данных заказа
  // Пока что просто отображаем ID заказа
  return (
    <div className="order-detail">
      <h1>Order Detail Page</h1>
      <p>Details for order ID: {id}</p>
      {/* Здесь можно добавить больше информации о заказе */}
    </div>
  );
};

export default OrderDetail;
