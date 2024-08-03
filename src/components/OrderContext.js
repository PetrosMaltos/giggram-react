// src/components/OrderContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Здесь вы можете загрузить данные заказов
  useEffect(() => {
    // Пример загрузки данных
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
