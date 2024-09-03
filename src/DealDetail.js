import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Loading from './components/Loading';
import './DealDetail.css';

const DealDetail = () => {
  const { dealId } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const dealRef = doc(db, 'deals', dealId);
        const dealSnap = await getDoc(dealRef);
        if (dealSnap.exists()) {
          setDeal(dealSnap.data());
        } else {
          console.error('Сделка не найдена');
        }
      } catch (error) {
        console.error('Ошибка при получении данных сделки:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [dealId]);

  const handleCompleteDeal = async () => {
    if (!deal) return;

    try {
      const dealRef = doc(db, 'deals', dealId);
      await updateDoc(dealRef, {
        status: 'completed',
        paymentStatus: 'released',
      });
      alert('Сделка завершена, средства выпущены.');
    } catch (error) {
      console.error('Ошибка при завершении сделки:', error);
    }
  };

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
    return <Loading />;
  }

  if (!deal) {
    return <div>Сделка не найдена</div>;
  }

  return (
    <div className="deal-detail">
      <h1>Детали сделки</h1>
      <div className="deal-info">
        <p><strong>Статус сделки:</strong> {deal.status}</p>
        <p><strong>Статус оплаты:</strong> {deal.paymentStatus}</p>
        <p><strong>Заказ:</strong> {deal.orderTitle}</p>
        <p><strong>Фрилансер:</strong> {deal.freelancerName}</p>
        <p><strong>Описание работы:</strong> {deal.description}</p>
      </div>
      {deal.status === 'in-progress' && (
        <button onClick={handleCompleteDeal}>Завершить сделку</button>
      )}
    </div>
  );
};

export default DealDetail;
