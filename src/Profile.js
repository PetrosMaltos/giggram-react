import React from 'react';
import './Profile.css';
import Navbar from './components/Navbar';

const Profile = () => {
  const user = {
    name: 'Рики Парк',
    description: 'Дизайнер пользовательских интерфейсов и фронтенд-разработчик',
    skills: ['UI / UX', 'Фронтенд-разработка', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    currentOrders: 5,
    archivedOrders: 12,
    userType: 'Фрилансер'
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="card-container">
          <span className="pro">UPRO</span>
          <img
            className="round"
            src="https://randomuser.me/api/portraits/women/79.jpg"
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
