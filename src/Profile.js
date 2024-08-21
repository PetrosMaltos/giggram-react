import React, { useEffect, useState, useMemo } from 'react';
import './Profile.css';
import Navbar from './components/Navbar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { getUserData, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const StarRating = React.memo(({ rating = 1 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon key={i} icon={faStar} className={i < rating ? 'star filled' : 'star'} />
    ));
  }, [rating]);

  return (
    <div className="star-rating">
      {stars}
      <span className="rating-number">{rating}</span>
    </div>
  );
});

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const defaultAvatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6H5umYvUEMFo5Z1UKj7Qc5F0jwdMMV0Mpjw&s";
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
        try {
          const userData = await getUserData(currentUser.uid);
          setUser(userData || {});
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.error("User is not authenticated");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="card-container">
          <span className="pro">
            <FontAwesomeIcon icon={faStar} className="pro-icon" /> PRO
          </span>
          {loading ? (
            <Skeleton circle={true} height={100} width={100} />
          ) : (
            <img className="round" src={user?.avatar || defaultAvatarUrl} alt="user" />
          )}
          <h3>{loading ? <Skeleton width={150} /> : (user?.username || 'Загрузка...')}</h3>
          <p>{loading ? <Skeleton count={3} /> : (user?.description || 'Описание загружается...')}</p>
          <div className="button-group">
            <button className="primary large" onClick={() => navigate('/editprofile')} disabled={loading}>Редактировать</button>
            <button className="primary large" disabled={loading}>
              <FontAwesomeIcon icon={faShareAlt} />
            </button>
          </div>
          <div className="rating">
            <h6>Рейтинг</h6>
            {loading ? <Skeleton width={100} /> : <StarRating rating={user?.rating || 0} />}
          </div>
          <div className="links">
            <a href="/orders">Мои заказы</a>
            <a href="/projects">Мои проекты</a>
            <a href="/services">Мои услуги</a>
          </div>
          <div className="skills">
            <h6>Навыки</h6>
            <ul>
              {loading ? <Skeleton count={3} /> : (
                user?.skills?.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))
                ) : (
                  <li>Навыки загружаются...</li>
                )
              )}
            </ul>
          </div>
          <div className="user-info">
            <h6>Дополнительная информация</h6>
            <div className="info-item">
              <span>Архивные заказы:</span> {loading ? <Skeleton width={100} /> : (user?.archivedOrders !== undefined ? user.archivedOrders : 'Отсутствуют')}
            </div>
            <div className="info-item">
              <span>Роль:</span> {loading ? <Skeleton width={100} /> : (user?.userType || 'Отсутствует')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
