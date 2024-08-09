import React from 'react';
import { FaDollarSign, FaStar, FaArchive } from 'react-icons/fa'; // Импорт иконок
import { IoDiamond } from 'react-icons/io5';
import './Services.css'; // Импорт стилей

const Services = () => {
  const services = [
    {
      title: 'Бесплатные заказы',
      description: 'Размещайте заказы бесплатно и находите исполнителей без затрат.',
      icon: <FaDollarSign />,
    },
    {
      title: '5 бесплатных откликов в день',
      description: 'Фрилансеры могут бесплатно откликаться на 5 заказов в день.',
      icon: <FaStar />,
    },
    {
      title: 'Автоматическое архивирование',
      description: 'Заказы архивируются автоматически после истечения срока.',
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
          <h2>Неограниченные отклики с <span className="highlight">UnlimitPro</span></h2>
          <p>Снимите лимиты на отклики и взаимодействуйте с фрилансерами без ограничений. Увеличьте охват и вовлеченность прямо сейчас!</p>
          <a href="/subscribe" className="subscribe-button">Оформить подписку</a>
        </div>
      </div>
    </div>
  );
};

export default Services;
