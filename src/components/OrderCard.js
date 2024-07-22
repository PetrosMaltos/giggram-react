// components/OrderCard.js
import React from 'react';
import { FaClock, FaDollarSign, FaCommentDots, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Импортируем хук useNavigate
import './OrderCard.css'; // Подключаем стили

const OrderCard = ({ id, title, description, tags, timeAgo, price, responses, rating }) => {
  const navigate = useNavigate(); // Инициализируем navigate

  const handleClick = () => {
    navigate(`/order/${id}`); // Переход на страницу с деталями заказа
  };

  return (
    <div className="order-card" onClick={handleClick}>
      <h3 className="order-title">{title}</h3>
      <p className="order-description">{description}</p>
      <div className="order-info">
        <div className="order-info-item">
          <FaClock className="order-icon" />
          <span className="order-time">{timeAgo} ago</span>
        </div>
        <div className="order-info-item">
          <FaDollarSign className="order-icon" />
          <span className="order-price">${price}</span>
        </div>
        <div className="order-info-item">
          <FaCommentDots className="order-icon" />
          <span className="order-responses">{responses} responses</span>
        </div>
        <div className="order-info-item">
          <FaStar className="order-icon" />
          <span className="order-rating">{rating} / 5</span>
        </div>
      </div>
      <div className="order-tags">
        {tags.map((tag, index) => (
          <span key={index} className="order-tag"># {tag}</span>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
