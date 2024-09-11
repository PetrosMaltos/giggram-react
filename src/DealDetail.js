import React, { useState } from 'react';
import './DealDetail.css';

const DealDetail = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ['Заказ', 'Оплата', 'Работа', 'Отзыв'];

  const dealInfo = {
    title: 'Название заказа',
    price: '1000 ₽',
    customer: 'Иван Иванов',
    performer: 'Алексей Петров',
    deadlines: '10 дней',
    reward: 5000, // Пример вознаграждения
  };

  // Вычисление вознаграждения с учетом комиссии 10%
  const commission = 0.1;
  const rewardWithCommission = (dealInfo.reward * (1 - commission)).toFixed(2);

  const requirements = "Требования к заказу: Необходимо разработать дизайн для веб-приложения с учетом всех современных тенденций. Важно учитывать пользовательский опыт и сделать интерфейс интуитивно понятным.";

  const progress = 50; // Пример процента выполнения задания

  const files = [
    { name: 'Дизайн-макет.pdf', url: '#' },
    { name: 'Техническое задание.docx', url: '#' },
  ];

  return (
    <div className="deal-container">
      <h1 className="main-title">{dealInfo.title}</h1>

      {/* Этапы */}
      <div className="steps-nav">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${currentStep === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentStep(index + 1)}
          >
            {step}
          </div>
        ))}
      </div>

      
      {/* Информационный блок */}
      <div className="deal-info">
        <h2 className="deal-title">Информация о заказе</h2>
        <div className="deal-details">
          <div className="detail-item">
            <span className="detail-label">Цена:</span> {dealInfo.price}
          </div>
          <div className="detail-item">
            <span className="detail-label">Заказчик:</span> {dealInfo.customer}
          </div>
          <div className="detail-item">
            <span className="detail-label">Исполнитель:</span> {dealInfo.performer}
          </div>
          <div className="detail-item">
            <span className="detail-label">Сроки:</span> {dealInfo.deadlines}
          </div>
          <div className="detail-item">
            <span className="detail-label">Вознаграждение:</span> 
            <span className="reward-amount"> {rewardWithCommission} ₽</span>
          </div>
        </div>
      </div>

      {/* Описание заказа */}
      <div className="deal-requirements">
        <h2 className="requirements-title">Описание заказа</h2>
        <p className="requirements-text">{requirements}</p>
      </div>

      {/* Прикрепленные файлы */}
      <div className="files">
        <h2 className="files-title">Прикрепленные файлы</h2>
        <ul className="files-list">
          {files.map((file, index) => (
            <li key={index}>
              <a href={file.url} className="file-link">{file.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Кнопка Приступить */}
      <div className="start-button-container">
        <button className="start-button">Приступить</button>
      </div>
    </div>
  );
};

export default DealDetail;
