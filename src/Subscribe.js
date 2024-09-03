import React, { useState } from 'react';
import './Subscribe.css';
import { FaCheckCircle } from 'react-icons/fa';

const Subscribe = () => {
  const [activePlan, setActivePlan] = useState('monthly');

  const handlePlanChange = (plan) => {
    setActivePlan(plan);
  };

  return (
    <div className="subscribe-page">
      <div className="subscribe-container">
        <h1 className="subscribe-title">Выберите план подписки</h1>
        <div className="subscription-options">
          <div
            className={`subscription-option ${activePlan === 'monthly' ? 'active' : ''}`}
            onClick={() => handlePlanChange('monthly')}
          >
            <h2>Месячная подписка</h2>
            <div className="price">990 руб.</div>
            <div className="option-description">Получите доступ к основным функциям.</div>
          </div>
          <div
            className={`subscription-option ${activePlan === 'yearly' ? 'active' : ''}`}
            onClick={() => handlePlanChange('yearly')}
          >
            <h2>Годовая подписка</h2>
            <div className="price">3950 руб.</div>
            <div className="discount">-45% Скидка</div>
            <div className="option-description">Получите доступ ко всем функциям и уникальным привилегиям.</div>
          </div>
        </div>
        <button className="subscribe-button">Оформить подписку</button>
        <div className="subscription-benefits">
          <h3>Что вы получите:</h3>
          <ul>
            <li><FaCheckCircle /> Откликайтесь без лимитов</li>
            <li><FaCheckCircle /> Приоритетная поддержка</li>
            <li><FaCheckCircle /> Эксклюзивные функции</li>
            <li><FaCheckCircle /> Пониженная коммисия</li>
            <li><FaCheckCircle /> Запрашивайте услуги</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
