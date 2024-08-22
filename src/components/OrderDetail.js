import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AiFillStar } from 'react-icons/ai';
import { FaDollarSign, FaEye, FaClock, FaCommentDots, FaLock } from 'react-icons/fa';
import './OrderDetail.css';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const OrderDetail = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [response, setResponse] = useState('');
  const [timeAgo, setTimeAgo] = useState('');
  const [showTelegramBackButton, setShowTelegramBackButton] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', id);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          const orderData = orderSnap.data();
          setOrder(orderData);
          const updateTimer = () => {
            const createdAtDate = orderData.createdAt.toDate ? orderData.createdAt.toDate() : new Date(orderData.createdAt);
            setTimeAgo(formatDistanceToNow(createdAtDate, { addSuffix: true, locale: ru }));
          };
          updateTimer();
          const timer = setInterval(updateTimer, 1000); // Обновление каждую секунду
          return () => clearInterval(timer);
        }
      } catch (error) {
        console.error('Ошибка получения данных заказа:', error);
      }
    };
    fetchOrder();
  }, [id]);

  useEffect(() => {
    const incrementViews = async () => {
      if (order) {
        const orderRef = doc(db, 'orders', id);
        try {
          await updateDoc(orderRef, { views: order.views + 1 });
        } catch (error) {
          console.error('Error updating views:', error);
        }
      }
    };
    incrementViews();
  }, [order, id]);

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Ответ отправлен:', response);
  };

  const handleTelegramBackButtonClick = () => {
    setShowTelegramBackButton(false);
  };

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const { WebApp } = window.Telegram;
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(() => {
        WebApp.showAlert("BackButton clicked");
        WebApp.BackButton.hide();
        setShowTelegramBackButton(false);
      });
      WebApp.onEvent('backButtonClicked', () => {
        console.log('Back button was clicked');
      });
      return () => {
        WebApp.BackButton.hide();
      };
    } else {
      console.error('Telegram WebApp API is not available.');
    }
  }, []);

  if (!order) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="order-detail">
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
            <span className="order-price">{order.price} руб.</span>
          </div>
          <div className="order-info-item">
            <FaEye className="order-icon" />
            <span className="order-views">{order.views || 0} просмотров</span>
          </div>
          <div className="order-info-item">
            <FaClock className="order-icon" />
            <span className="order-time">{timeAgo}</span>
          </div>
          <div className="order-info-item">
            <FaCommentDots className="order-icon" />
            <span className="order-responses">{order.responses || 0} откликов</span>
          </div>
        </div>
        <div className="order-tags">
          {order.tags.length > 0 ? (
            order.tags.map((tag, index) => (
              <span key={index} className="tag"># {tag}</span>
            ))
          ) : (
            <span className="order-tag">Нет тегов</span>
          )}
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
        {showTelegramBackButton && (
          <button className="telegram-back-button" onClick={handleTelegramBackButtonClick}>TelegramBack</button>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;