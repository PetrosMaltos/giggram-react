import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { AiFillStar } from 'react-icons/ai';
import { FaEye, FaClock, FaLock } from 'react-icons/fa';
import ScrollToTop from './ScrollToTop';
import './ProjectPage.css';
import { ru } from 'date-fns/locale';

const ProjectPage = ({ projects = [], isAuthenticated }) => {
  const { id } = useParams();

  // Проверка наличия данных о проектах
  if (!Array.isArray(projects)) {
    return <div>Данные о проектах недоступны</div>;
  }

  const project = projects.find(project => project.id === parseInt(id, 10));

  if (!project) {
    return <div>Проект не найден</div>;
  }

  const [response, setResponse] = useState('');

  useEffect(() => {
    // Setup "Back" button
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

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Комментарий отправлен:', response);
  };

  return (
    <div className="project-detail">
      <ScrollToTop />
      <div className="project-info">
        <div className="project-image1">
          <img src={project.image} alt={project.title} />
        </div>
        <div className="client-profile">
          <div className="client-avatar" />
          <div className="client-info">
            <div className="client-name">Имя клиента</div>
            <div className="client-reviews">
              <AiFillStar className="star-rating" />
              <span>4.4</span>
            </div>
          </div>
        </div>
        <h1 className="project-title">{project.title}</h1>
        <p className="project-description">{project.description}</p>
          <div className="project-tags">
            {project.tags && project.tags.length > 0 && (
              <div className="tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
      </div>
      <div className="divider" />
      <div className="response-section">
        {isAuthenticated ? (
          <div className="response-form">
            <textarea
              className="response-textarea"
              placeholder="Напишите ваш комментарий здесь..."
              value={response}
              onChange={handleResponseChange}
            />
            <button className="response-button" onClick={handleSubmit}>Отправить Комментарий</button>
          </div>
        ) : (
          <div className="registration-message">
            <FaLock className="lock-icon" />
            <h2>Пожалуйста, зарегистрируйтесь</h2>
            <p>Для отправки отклика на этот проект необходимо зарегистрироваться. Пожалуйста, <a href="/register">зарегистрируйтесь</a> для продолжения.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
