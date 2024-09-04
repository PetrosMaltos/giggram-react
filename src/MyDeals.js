import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from './firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import './MyDeals.css';

const MyDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Получаем данные пользователя для определения его роли
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserRole(userData.role);
  
            // Запрашиваем сделки на основе роли
            let q;
            if (userData.role === 'freelancer') {
              q = query(collection(db, 'deals'), where('freelancerId', '==', user.uid));
            } else if (userData.role === 'client') {
              q = query(collection(db, 'deals'), where('clientId', '==', user.uid));
            } else {
              console.error('Неизвестная роль пользователя');
              return;
            }
            
            const querySnapshot = await getDocs(q);
            const dealsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDeals(dealsData);
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке сделок:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDeals();
  }, []);
  
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

  if (loading) {
    return <div className="loading">Загрузка сделок...</div>;
  }

  if (deals.length === 0) {
    return <div className="no-deals">Нет доступных сделок.</div>;
  }

  return (
    <div className="my-deals-page">
      <h1>Сделки</h1>
      <div className="deals-list">
        {deals.map((deal) => (
          <Link to={`/deal/${deal.id}`} key={deal.id} className="deal-item">
            <h2>{deal.title}</h2>
            <p>Статус: {deal.status === 'completed' ? 'Завершена' : 'В процессе'}</p>
            <p>Оплата: {deal.paymentStatus === 'frozen' ? 'Заморожена' : 'Ожидание'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyDeals;
