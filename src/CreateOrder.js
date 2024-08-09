import React, { useState, useEffect } from 'react';
import './CreateOrder.css';

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: '',
  });

  useEffect(() => {
    // Настройка кнопки "Назад"
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.BackButton.show();

      const handleBackButtonClick = () => window.history.back();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);

      return () => {
        window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
        window.Telegram.WebApp.BackButton.hide();
      };
    }
  }, []); // Пустой массив зависимостей

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Order created:', formData);
  };

  return (
    <div className="create-order-page">
      <div className="create-order-container">
        <h1>Создать новый заказ</h1>
        <form onSubmit={handleSubmit} className="create-order-form">
          <label>
            Заголовок
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Описание
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Категория
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Цена
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Хэштеги (через запятую)
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="submit-button">Создать заказ</button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
