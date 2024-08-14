import React, { useState } from 'react';
import { FaClock, FaCommentDots, FaEye, FaChevronDown, FaChevronUp, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { FaRubleSign } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom'; // Импортируем хук useNavigate
import './OrderCard.css'; // Импортируем стили

const OrderCard = ({ id, title, description, tags = [], timeAgo, price, responses, views, isAssigned }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const navigate = useNavigate(); // Инициализируем navigate

  const handleCardClick = () => {
    if (id) {
      navigate(`/orders/${id}`); // Перенаправляем на страницу с деталями заказа
    } else {
      console.error('Order id is missing'); // Логируем ошибку, если id отсутствует
    }
  };

  const toggleDescription = (event) => {
    event.stopPropagation(); // Предотвращаем всплытие события клика
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="order-card" onClick={handleCardClick}>
      <div className="order-header">
      <div className={`order-status ${isAssigned ? 'assigned' : 'not-assigned'}`}>
          {isAssigned ? <FaUserCheck /> : <FaUserTimes />}
          <span>{isAssigned ? 'Исполнитель выбран' : 'Исполнитель не выбран'}</span>
        </div>
        <h3 className="order-title">{title}</h3>
      </div>
      <p className={`order-description ${isDescriptionExpanded ? 'expanded' : 'collapsed'}`}>
        {description}
      </p>
      <button className="toggle-description" onClick={toggleDescription}>
        {isDescriptionExpanded ? <FaChevronUp /> : <FaChevronDown />}
        {isDescriptionExpanded ? 'Скрыть' : 'Больше'}
      </button>
      <div className="order-info">
        <div className="order-info-item">
          <FaRubleSign className="order-icon" />
          <span className="order-price">{price} руб.</span>
        </div>
        <div className="order-info-item">
          <FaEye className="order-icon" />
          <span className="order-views">{views} просмотров</span>
        </div>
        <div className="order-info-item">
          <FaClock className="order-icon" />
          <span className="order-time">{timeAgo} назад</span>
        </div>
        <div className="order-info-item">
          <FaCommentDots className="order-icon" />
          <span className="order-responses">{responses} откликов</span>
        </div>
      </div>
      <div className="order-tags">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <span key={index} className="order-tag"># {tag}</span>
          ))
        ) : (
          <span className="order-tag">Нет тегов</span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
