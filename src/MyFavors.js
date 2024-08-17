import React, { useState, useEffect } from 'react';
import FavorCard from './components/FavorCard';
import './MyFavors.css';

const MyFavors = () => {
  const services = [
    { id: 1, title: 'Услуга 1', description: 'Описание услуги 1', category: 'Категория 1' },
    { id: 2, title: 'Услуга 2', description: 'Описание услуги 2', category: 'Категория 2' },
    // Добавьте больше данных услуг
  ];

  useEffect(() => {
    // Настройка кнопки "Назад"
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
    <div className="my-services-page">
      <header>
        <h1>Мои Услуги</h1>
      </header>
      <div className="services-list">
        {services.map(service => (
          <FavorCard 
            key={service.id}
            title={service.title}
            description={service.description}
            category={service.category}
          />
        ))}
      </div>
    </div>
  );
};

export default MyFavors;
