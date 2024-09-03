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

  const handleAcceptResponse = async (responseId) => {
    try {
      const response = responses.find(res => res.id === responseId);
      const orderRef = doc(db, 'orders', id);
      const orderSnap = await getDoc(orderRef);
      const orderData = orderSnap.data();
  
      if (!orderData) {
        console.error('Данные заказа не найдены');
        return;
      }
  
      const inviteRef = doc(db, 'invites', `${orderData.clientId}_${response.userId}_${id}`);
      await setDoc(inviteRef, {
        userId: response.userId,
        projectTitle: orderData.title,
        message: `Вы были приглашены на работу по заказу "${orderData.title}"`,
        status: 'Pending',
        orderId: id,
        createdAt: new Date()
      });
  
      // Отправляем сообщение через Telegram-бота
      const freelancer = userMap[response.userId];
      if (freelancer && freelancer.telegramId) {
        const telegramMessage = `Вас пригласили на работу по заказу "${orderData.title}". Пожалуйста, проверьте ваш профиль.`;
        sendTelegramNotification(freelancer.telegramId, telegramMessage);
      } else {
        console.warn('Telegram ID фрилансера не найден');
      }
  
      // Обновляем статус отклика и заказа
      await updateDoc(orderRef, { acceptedResponse: response, status: 'in-progress', paymentStatus: 'frozen' });
      alert('Отклик принят, средства заморожены и приглашение отправлено!');
    } catch (error) {
      console.error('Ошибка принятия отклика:', error);
    }
  };
  
  

  const handleReject = (inviteId) => {
    // Логика отклонения приглашения
    console.log(`Отклонено приглашение с ID: ${inviteId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <div className="no-invites-message">Вы не авторизованы</div>;
  }

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
