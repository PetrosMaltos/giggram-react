import React from 'react';
import './Profile.css';
import Navbar from './components/Navbar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaShare } from "react-icons/fa";
import { useUser } from './UserContext';
import Loading from './components/Loading';
import { useNavigate, Link } from 'react-router-dom';

const StarRating = React.memo(({ rating = 1 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <FontAwesomeIcon key={i} icon={faStar} className={i < rating ? 'star filled' : 'star'} />
  ));
  return (
    <div className="star-rating">
      {stars}
      <span className="rating-number">{rating}</span>
    </div>
  );
});

const Profile = () => {
  const { user } = useUser(); // Получаем контекст пользователя
  const navigate = useNavigate();
  const placeholderAvatar = 'https://via.placeholder.com/120'; // URL изображения-заглушки

  // Используем URL аватарки из базы данных или заглушку
  const avatarUrl = user && user.avatar ? user.avatar : placeholderAvatar;

  if (!user) {
    return <Loading />;
  }

  const handleEditClick = () => {
    navigate('/editprofile');
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="card-container">
          <img className="round" src={avatarUrl} alt="user" />
          <h3>{user.username}</h3>
          <p>{user.description || 'Нет описания'}</p>
          <button className="primary" onClick={handleEditClick}>Редактировать</button>
          <button className="primary" onClick={handleEditClick}><FaShare /></button>
          <div className="rating">
            <h6>Рейтинг</h6>
            <StarRating rating={user.rating} />
          </div>
          <div className="links">
            <Link to="/my-orders">Мои Заказы</Link>
            <Link to="/my-services">Мои Услуги</Link>
            <Link to="/my-projects">Мои проекты</Link>
          </div>
          <div className="skills">
            <h6>Навыки</h6>
            <ul>
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <li>Навыки не указаны</li>
              )}
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
