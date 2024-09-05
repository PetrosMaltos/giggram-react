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
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const dealDoc = doc(db, 'deals', dealId);
        const dealSnapshot = await getDoc(dealDoc);
        if (dealSnapshot.exists()) {
          setDeal(dealSnapshot.data());
        } else {
          setError('Сделка не найдена.');
        }
      } catch (error) {
        setError('Ошибка загрузки сделки.');
        console.error('Ошибка загрузки сделки:', error);
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

  const handleFreezeFunds = async () => {
    if (!deal) return;

    try {
      const dealRef = doc(db, 'deals', dealId);
      await updateDoc(dealRef, {
        paymentStatus: 'frozen',
      });
      alert('Средства заморожены.');
    } catch (error) {
      console.error('Ошибка при заморозке средств:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!deal) {
    return <div>Сделка не найдена</div>;
  }

  return (
    <div className="deal-detail">
      <div className="deal-info">
        <p><strong>Статус сделки:</strong> {deal.status}</p>
        <p><strong>Статус оплаты:</strong> {deal.paymentStatus}</p>
        <p><strong>Заказ:</strong> {deal.orderTitle}</p>
        <p><strong>Фрилансер:</strong> {deal.freelancerName}</p>
        <p><strong>Описание работы:</strong> {deal.description}</p>
      </div>

      <div className="deal-steps">
        {deal.paymentStatus === 'not-frozen' && (
          <button onClick={handleFreezeFunds}>Заморозить средства</button>
        )}
        {deal.status === 'in-progress' && (
          <div className="work-phase">
            <h2>Работа</h2>
            <p>Здесь заказчик и фрилансер могут обмениваться файлами и сообщениями.</p>
            {/* Добавить функциональность для обмена файлами */}
          </div>
        )}
        {deal.status === 'in-progress' && (
          <button onClick={handleCompleteDeal}>Завершить сделку</button>
        )}
      </div>
    </div>
  );
};

export default DealDetail;
