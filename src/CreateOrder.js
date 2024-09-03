import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './CreateOrder.css';
import { FaRegClipboard, FaTag, FaDollarSign, FaListUl, FaRegEdit } from 'react-icons/fa';

const categories = [
  'Веб-дизайн',
  'Разработка сайтов',
  'Графический дизайн',
  'Копирайтинг',
  'Маркетинг',
  'SEO-оптимизация',
  'Разработка приложений',
  'Переводы'
];

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const auth = getAuth(); // Инициализация auth

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category, price, tags } = formData;
  
    // Basic validation
    if (!title || !description || !category || !price || isNaN(price) || parseFloat(price) <= 0) {
      setError('Пожалуйста, заполните все поля корректно.');
      return;
    }
  
    // Получите текущего пользователя
    const user = auth.currentUser;
    if (!user) {
      setError('Ошибка авторизации. Пожалуйста, войдите в систему.');
      return;
    }
  
    const newOrder = {
      title,
      description,
      category,
      price: parseFloat(price),
      tags: tags.split(',').map(tag => tag.trim()),
      views: 0,
      responses: [],
      createdAt: Timestamp.now(),
      clientId: user.uid,  // Добавление clientId
    };
  
    try {
      await addDoc(collection(db, 'orders'), newOrder);
      setSuccess('Заказ успешно создан!');
      setTimeout(() => navigate('/orders'), 1500); // Redirect after 1.5 seconds
    } catch (error) {
      setError('Ошибка создания заказа. Попробуйте еще раз.');
      console.error('Ошибка создания заказа:', error);
    }
  };

  useEffect(() => {
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
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="category-select"
            >
              <option value="" disabled>Выберите категорию</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            <FaDollarSign /> Цена
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
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
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="submit-button">Создать заказ!</button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
