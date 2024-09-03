import React, { useState, useEffect } from 'react';
import { db, doc, getDoc } from './firebaseConfig'; // Импортируем необходимые функции и объекты
import './components/DealDetail.css'; // Подключаем стили

const DealDetail = ({ match }) => {
  const [deal, setDeal] = useState(null); // Локальное состояние для сделки
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    const orderId = match.params.id; // Получаем ID сделки из URL
    const fetchDeal = async () => {
      try {
        const dealRef = doc(db, 'deals', orderId); // Ссылка на документ сделки в коллекции 'deals'
        const docSnap = await getDoc(dealRef); // Получаем данные сделки

        if (docSnap.exists()) {
          setDeal(docSnap.data()); // Устанавливаем данные сделки в состояние
        } else {
          console.log('No such deal found!');
        }
      } catch (error) {
        console.error('Error fetching deal:', error);
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchDeal();
  }, [match.params.id]);

  if (loading) {
    return <div>Loading...</div>; // Если сделка загружается, показываем сообщение о загрузке
  }

  if (!deal) {
    return <div>Deal not found.</div>; // Если сделка не найдена, показываем сообщение
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
    <div className="deal-detail">
      <h1>Сделка #{match.params.id}</h1>
      <div className="deal-info">
        <p><strong>Заказчик:</strong> {deal.clientName}</p>
        <p><strong>Фрилансер:</strong> {deal.freelancerName}</p>
        <p><strong>Описание:</strong> {deal.description}</p>
        <p><strong>Статус:</strong> {deal.status}</p>
      </div>
      <div className="deal-actions">
        <button>Завершить заказ</button>
        <button>Отправить сообщение</button>
      </div>
    </div>
  );
};

export default DealDetail;
