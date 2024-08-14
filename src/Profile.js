import React from 'react';
import './Profile.css';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const avatarUrl = "https://www.ajc.org/sites/default/files/inline-images/Term%208%20-%20Pepe%20the%20FrogInline-300xflex.jpg"; 

  const user = {
    name: 'Рики Парк',
    description: 'Дизайнер пользовательских интерфейсов и фронтенд-разработчик',
    skills: ['UI / UX', 'Фронтенд-разработка', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    currentOrders: 5,
    archivedOrders: 12,
    userType: 'Фрилансер',
    avatar: avatarUrl
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="card-container">
          <span className="pro">
            <FontAwesomeIcon icon={faStar} className="pro-icon" /> PRO
          </span>
          <img
            className="round"
            src={user.avatar}
            alt="user"
          />
          <h3>{user.name}</h3>
          <p>{user.description}</p>
          {user.currentOrders > 0 && (
            <div className="active-orders">
              <a href="/active-orders">Активные заказы ({user.currentOrders})</a>
            </div>
          )}
          <div className="button-group">
            <button className="primary">Сообщение</button>
            <button className="primary ghost">Вы подписаны</button>
          </div>
          <div className="skills">
            <h6>Навыки</h6>
            <ul>
              {user.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="user-info">
            <h6>Дополнительная информация</h6>
            <div className="info-item">
              <span>Архивные заказы:</span> {user.archivedOrders}
            </div>
            <div className="info-item">
              <span>Роль:</span> {user.userType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
