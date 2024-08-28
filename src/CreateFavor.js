import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { FaRegClipboard, FaTag, FaDollarSign, FaListUl, FaRegEdit } from 'react-icons/fa';

const CreateFavor = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category, price, tags } = formData;
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    const newFavor = {
      title,
      description,
      category,
      price: parseFloat(price), // Преобразуем цену в число
      tags: tagsArray.length > 0 ? tagsArray : ['Без тэгов'], // Добавляем "Без тэгов" если тэги отсутствуют
      views: 0,
      responses: 0,
      createdAt: Timestamp.now(), // Записываем текущее время
    };

    try {
      await addDoc(collection(db, 'favors'), newFavor);
      navigate('/favors'); // Перенаправление на страницу заказов
    } catch (error) {
      console.error('Ошибка создания услуги:', error);
    }
  };

  useEffect(() => {
    // Setup "Back" button
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.BackButton.show();
      const handleBackButtonClick = () => window.history.back();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
      return () => {
        window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
        window.Telegram.WebApp.BackButton.hide();
      };
    }
    return () => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.BackButton.hide();
      }
    };
  }, []);

  return (
    <div className="create-order-page">
      <div className="create-order-container">
        <h1><FaRegClipboard /> Создать новую услугу</h1>
        <form onSubmit={handleSubmit} className="create-order-form">
          <label>
            <FaRegEdit /> Заголовок
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
          </label>
          <label>
            <FaListUl /> Описание
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </label>
          <label>
            <FaTag /> Категория
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
          </label>
          <label>
            <FaDollarSign /> Цена
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
          </label>
          <label>
            <FaTag /> Хэштеги (через запятую)
            <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} />
          </label>
          <button type="submit" className="submit-button">Создать услугу!</button>
        </form>
      </div>
    </div>
  );
};

export default CreateFavor;