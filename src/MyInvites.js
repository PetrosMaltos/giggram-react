import React, { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Loading from './components/Loading';
import './MyInvites.css';

const MyInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchInvites = async (userId) => {
      try {
        const invitesRef = collection(db, 'invites');
        const q = query(invitesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const invitesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInvites(invitesList);
      } catch (error) {
        console.error('Ошибка при получении приглашений:', error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        getDoc(userRef).then((userSnap) => {
          if (userSnap.exists()) {
            setUserData(userSnap.data());
            fetchInvites(user.uid);
          } else {
            console.warn('Пользователь не найден в базе данных');
          }
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAccept = async (inviteId) => {
    try {
      const navigate = useNavigate();
      const inviteRef = doc(db, 'invites', inviteId); // Ссылка на документ приглашения
      await updateDoc(inviteRef, {
        status: 'accepted', // Обновляем статус на "accepted"
      });

      // Перенаправляем пользователя на страницу сделки
      navigate(`/deal/${inviteId}`);
    } catch (error) {
      console.error('Ошибка при принятии приглашения:', error);
    }
  };

  const handleReject = (inviteId) => {
    console.log(`Отклонено приглашение с ID: ${inviteId}`);
    // Можно добавить логику для отклонения приглашения
  };

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <div className="no-invites-message">Вы не авторизованы</div>;
  }

  useEffect(() => {
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
    <div className="my-invites-container">
      <div className="invites-header">
        <h1>Мои приглашения</h1>
      </div>
      {invites.length > 0 ? (
        <ul className="invites-list">
          {invites.map(invite => (
            <li key={invite.id} className="invite-item">
              <h2 className="invite-item-title">{invite.projectTitle}</h2>
              <p className="invite-item-message">{invite.message}</p>
              <p className="invite-item-status">Статус: {invite.status}</p>
              <div className="invite-actions">
                <FaCheck 
                  className="action-icon accept-icon" 
                  onClick={() => handleAccept(invite.id)} 
                />
                <FaTimes 
                  className="action-icon reject-icon" 
                  onClick={() => handleReject(invite.id)} 
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-invites-message">У вас нет приглашений</div>
      )}
    </div>
  );
};

export default MyInvites;
