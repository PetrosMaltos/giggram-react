import React, { useState } from 'react';
import { FaClock, FaDollarSign, FaCommentDots, FaEye, FaChevronDown, FaChevronUp, FaUserCheck, FaUserTimes } from 'react-icons/fa';
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
        <h3 className="order-title">{title}</h3>
        <div className={`order-status ${isAssigned ? 'assigned' : 'not-assigned'}`}>
          {isAssigned ? <FaUserCheck /> : <FaUserTimes />}
          <span>{isAssigned ? 'Assigned' : 'Not Assigned'}</span>
        </div>
      </div>
      <p className={`order-description ${isDescriptionExpanded ? 'expanded' : 'collapsed'}`}>
        {description}
      </p>
      <button className="toggle-description" onClick={toggleDescription}>
        {isDescriptionExpanded ? <FaChevronUp /> : <FaChevronDown />}
        {isDescriptionExpanded ? 'Show less' : 'Show more'}
      </button>
      <div className="order-info">
        <div className="order-info-item">
          <FaDollarSign className="order-icon" />
          <span className="order-price">${price}</span>
        </div>
        <div className="order-info-item">
          <FaEye className="order-icon" />
          <span className="order-views">{views} views</span>
        </div>
        <div className="order-info-item">
          <FaClock className="order-icon" />
          <span className="order-time">{timeAgo} ago</span>
        </div>
        <div className="order-info-item">
          <FaCommentDots className="order-icon" />
          <span className="order-responses">{responses} responses</span>
        </div>
      </div>
      <div className="order-tags">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <span key={index} className="order-tag"># {tag}</span>
          ))
        ) : (
          <span className="order-tag">No tags</span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
