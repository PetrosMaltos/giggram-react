import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaDollarSign, FaCommentDots, FaEye, FaLock, FaArrowLeft } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { format, parseISO } from 'date-fns';
import ScrollToTop from './ScrollToTop';
import './OrderDetail.css';

const OrderDetail = ({ orders, isAuthenticated }) => {
  const { id } = useParams();
  const order = orders.find(order => order.id === parseInt(id));
  
  const [response, setResponse] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'; // Prevent scroll restoration
    }
  
    window.scrollTo(0, 0); // Scroll to top
  
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'; // Restore default behavior on unmount
      }
    };
  }, []);

  

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Response submitted:', response);
  };

  const handleBackClick = () => {
    window.history.back(); // Возврат на предыдущую страницу
  };

  if (!order) {
    return <div>Order not found</div>;
  }

  // Example dates
  const exampleDate = '2024-08-02T22:55:00Z';
  const exampleExpiry = '2024-08-10T22:55:00Z';

  // Format dates
  const formattedDate = format(parseISO(exampleDate), 'dd MMMM yyyy, HH:mm');
  const formattedExpiry = format(parseISO(exampleExpiry), 'dd MMMM yyyy, HH:mm');

  return (
    <div className="order-detail">
      <ScrollToTop />
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft className="back-icon" />
        <span>Back</span>
      </button>
      <div className="order-info">
        <div className="client-profile">
          <div className="client-avatar" />
          <div className="client-info">
            <div className="client-name">Client Name</div>
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
            <span>${order.price}</span>
          </div>
          <div className="order-info-item">
            <FaEye className="order-icon" />
            <span>{order.views} views</span>
          </div>
          <div className="order-info-item">
            <FaClock className="order-icon" />
            <span>{order.timeAgo} ago</span>
          </div>
          <div className="order-info-item">
            <FaCommentDots className="order-icon" />
            <span>{order.responses} responses</span>
          </div>
          <div className="order-date">
            Order Date: {formattedDate}
          </div>
          <div className="order-expiry">
            Expiry: {formattedExpiry}
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
              placeholder="Write your response here..."
              value={response}
              onChange={handleResponseChange}
            />
            <button className="response-button" onClick={handleSubmit}>Submit Response</button>
          </div>
        ) : (
          <div className="registration-message">
            <FaLock className="lock-icon" />
            <h2>Please Register to Submit a Response</h2>
            <p>You need to be registered to submit a response to this order. Please <a href="/register">register</a> to continue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
