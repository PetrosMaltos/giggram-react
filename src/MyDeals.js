import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './MyDeals.css';

const MyDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, 'deals'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const dealsData = [];
          querySnapshot.forEach((doc) => {
            dealsData.push({ id: doc.id, ...doc.data() });
          });
          setDeals(dealsData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке сделок:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка сделок...</div>;
  }

  if (deals.length === 0) {
    return <div className="no-deals">Нет доступных сделок.</div>;
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
