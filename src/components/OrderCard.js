import React from 'react';
import { FaClock, FaDollarSign, FaCommentDots, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './OrderCard.css'; // Import styles

const OrderCard = ({ id, title, description, tags, timeAgo, price, responses, views }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    navigate(`/order/${id}`); // Navigate to order details page
  };

  return (
    <div className="order-card" onClick={handleClick}>
      <h3 className="order-title">{title}</h3>
      <p className="order-description">{description}</p>
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
        {tags.map((tag, index) => (
          <span key={index} className="order-tag"># {tag}</span>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
