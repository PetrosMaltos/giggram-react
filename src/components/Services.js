import React from 'react';
import { FaClock, FaArchive, FaDollarSign, FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import icons
import { IoDiamond } from "react-icons/io5";
import './Services.css'; // Import styles

const Services = () => {
  const services = [
    {
      title: 'Free Order Placement',
      description: 'Post your orders without any cost. Reach out to freelancers easily.',
      icon: <FaDollarSign />,
    },
    {
      title: '5 Free Responses Per Day',
      description: 'Freelancers can respond to up to 5 orders per day for free.',
      icon: <FaStar />,
    },
    {
      title: 'Automatic Archiving',
      description: 'Orders are automatically archived after their expiration time.',
      icon: <FaArchive />,
    },
  ];

  return (
    <div className="services-page">
      <div className="services-list">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <div className="service-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="subscription-banner">
        <div className="subscription-overlay"></div>
        <div className="subscription-content">
          <div className="subscription-icon">
            <IoDiamond />
          </div>
          <h2>Unlock Unlimited Responses with <span className="highlight">UnlimitPro</span></h2>
          <p>Remove daily response limits and enjoy unrestricted interactions with freelancers. Maximize your reach and engagement now!</p>
          <a href="/subscribe" className="subscribe-button">Upgrade Now</a>
        </div>
      </div>
    </div>
  );
};

export default Services;
