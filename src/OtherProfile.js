import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaShare } from 'react-icons/fa';
import Loading from './components/Loading';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBR-ViuYKvxtuCfPDZwq2DHsHby9B4NPC0',
  authDomain: 'giggram-4aa20.firebaseapp.com',
  projectId: 'giggram-4aa20',
  storageBucket: 'giggram-4aa20.appspot.com',
  messagingSenderId: '299723601231',
  appId: '1:299723601231:web:039f135c8fc9ce541c813a',
  measurementId: 'G-5865DYTVB9',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

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

const OtherProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const placeholderAvatar = 'https://via.placeholder.com/120'; // URL изображения-заглушки

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user with ID:', userId);
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          console.log('User data:', userDoc.data());
          setUser(userDoc.data());
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Error fetching user data');
        console.error('Fetch error:', err);
      }
    };
    fetchUser();
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="card-container">
          <img className="round" src={user.avatar || placeholderAvatar} alt="user" />
          <h3>{user.username}</h3>
          <p>{user.description || 'Нет описания'}</p>
          {/* Заменяем кнопку "Редактировать" на "Сообщение" */}
          <button className="primary" onClick={() => navigate(`/chat/${user.username}`)}>Сообщение</button>
          <button className="primary"><FaShare /></button>
          <div className="rating">
            <h6>Рейтинг</h6>
            <StarRating rating={user.rating} />
          </div>
          <div className="links">
            <Link to={`/user/${userId}/orders`}>Мои Заказы</Link>
            <Link to={`/user/${userId}/services`}>Мои Услуги</Link>
            <Link to={`/user/${userId}/projects`}>Мои проекты</Link>
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

export default OtherProfile;
