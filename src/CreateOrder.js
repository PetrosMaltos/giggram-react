import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateOrder.css';
import { FaRegClipboard, FaTag, FaDollarSign, FaListUl, FaRegEdit } from 'react-icons/fa';
import axios from 'axios';

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.setHeaderColor('#000000');
    }
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.BackButton.show();
      const handleBackButtonClick = () => window.history.back();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/orders', formData)
      .then(response => {
        console.log('Order created:', response.data);
        
        // Save the new order to localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        savedOrders.push(response.data); // Add the new order to localStorage
        localStorage.setItem('orders', JSON.stringify(savedOrders));

        // Navigate to the orders page or show confirmation
        navigate('/orders');
      })
      .catch(error => {
        console.error('Error creating order:', error);
      });
  };

  return (
    <div className="create-order-page">
      <div className="create-order-container">
        <h1><FaRegClipboard /> Создать новый заказ</h1>
        <form onSubmit={handleSubmit} className="create-order-form">
          <label>
            <FaRegEdit /> Заголовок
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <FaListUl /> Описание
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <FaTag /> Категория
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <FaDollarSign /> Цена
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <FaTag /> Хэштеги (через запятую)
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="submit-button">Создать заказ!</button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
