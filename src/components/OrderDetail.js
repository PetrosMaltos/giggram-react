import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { AiFillStar } from 'react-icons/ai';
import { FaDollarSign, FaEye, FaClock, FaCommentDots, FaLock } from 'react-icons/fa';
import ScrollToTop from './ScrollToTop'; // Убедитесь, что этот компонент импортирован
import './OrderDetail.css'; // Добавьте стили для компонента
import { ru } from 'date-fns/locale'; // Импортируем русскую локализацию


const OrderDetail = ({ orders = [], isAuthenticated }) => {
  const { id } = useParams();

  // Проверка наличия данных о заказах
  if (!Array.isArray(orders)) {
    return <div>Данные о заказах недоступны</div>;
  }

  const order = orders.find(order => order.id === parseInt(id));

  if (!order) {
    return <div>Заказ не найден</div>;
  }

  const [response, setResponse] = useState('');

  useEffect(() => {
    // Настройка кнопки "Назад"
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.BackButton.show();

      const handleBackButtonClick = () => window.history.back();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);

    }
  }, [id]);

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Ответ отправлен:', response);
  };

 // Примеры дат
 const exampleDate = '2024-08-02T22:55:00Z';
 const exampleExpiry = '2024-08-10T22:55:00Z';

 // Форматирование дат
 const formattedDate = format(parseISO(exampleDate), 'dd MMMM yyyy, HH:mm', { locale: ru });
 const formattedExpiry = format(parseISO(exampleExpiry), 'dd MMMM yyyy, HH:mm', { locale: ru });


  return (
    <div className="order-detail">
      <ScrollToTop />
      <div className="order-info">
        <div className="client-profile">
          <div className="client-avatar" />
          <div className="client-info">
            <div className="client-name">Имя клиента</div>
            <div className="client-reviews">
              <AiFillStar className="star-rating" />
              <span>4.4</span>
            </div>
          </div>
        </div>
        <h1 className="order-title">{order.title}</h1>
        <p className="order-description">{order.description}</p>
        <div className="order-details">
          <div className="order-info-item">
            <FaDollarSign className="order-icon" />
            <span>{order.price} руб</span>
          </div>
          <div className="order-info-item">
            <FaEye className="order-icon" />
            <span>{order.views} просмотров</span>
          </div>
          <div className="order-info-item">
            <FaClock className="order-icon" />
            <span>{order.timeAgo} назад</span>
          </div>
          <div className="order-info-item">
            <FaCommentDots className="order-icon" />
            <span>{order.responses} откликов</span>
          </div>
          <div className="order-date">
            Дата заказа: {formattedDate}
          </div>
          <div className="order-expiry">
            Срок окончания: {formattedExpiry}
          </div>
          <div className="order-tags">
            {order.tags && order.tags.length > 0 && (
              <div className="tags">
                {order.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="response-section">
        {isAuthenticated ? (
          <div className="response-form">
            <textarea
              className="response-textarea"
              placeholder="Напишите ваш ответ здесь..."
              value={response}
              onChange={handleResponseChange}
            />
            <button className="response-button" onClick={handleSubmit}>Отправить ответ</button>
          </div>
        ) : (
          <div className="registration-message">
            <FaLock className="lock-icon" />
            <h2>Пожалуйста, зарегистрируйтесь</h2>
            <p>Для отправки отклика на этот заказ необходимо зарегистрироваться. Пожалуйста, <a href="/register">зарегистрируйтесь</a> для продолжения.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
