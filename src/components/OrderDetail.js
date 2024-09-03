import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AiFillStar } from 'react-icons/ai';
import { FaDollarSign, FaEye, FaClock, FaCommentDots, FaLock } from 'react-icons/fa';
import './OrderDetail.css';
import { db, auth } from '../firebaseConfig';
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from './Loading';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [response, setResponse] = useState('');
  const [timeAgo, setTimeAgo] = useState('');
  const [userData, setUserData] = useState(null);
  const [responses, setResponses] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [remainingResponses, setRemainingResponses] = useState(5);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        console.error('ID заказа не найден');
        return;
      }

      try {
        const orderRef = doc(db, 'orders', id);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          const orderData = orderSnap.data();
          setOrder(orderData);
          setResponses(orderData.responses || []);

          // Работа с временем создания заказа
          let createdAtDate;

          if (orderData.createdAt instanceof Date) {
            createdAtDate = orderData.createdAt;
          } else if (orderData.createdAt && orderData.createdAt.toDate) {
            createdAtDate = orderData.createdAt.toDate();
          } else {
            createdAtDate = new Date(orderData.createdAt);
          }

          const updateTimer = () => {
            setTimeAgo(formatDistanceToNow(createdAtDate, { addSuffix: true, locale: ru }));
          };

          updateTimer();
          const timer = setInterval(updateTimer, 60000); // Обновляем каждую минуту

          return () => clearInterval(timer);
        } else {
          console.error('Заказ не найден');
        }
      } catch (error) {
        console.error('Ошибка получения данных заказа:', error);
      }
    };

    fetchOrder();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
        fetchUserData(user.uid);
      } else {
        setIsUserLoggedIn(false);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [id]);

  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserData(userData);
        const today = new Date().toISOString().split('T')[0];
        const userResponsesToday = userData.responses.filter((response) => response.date.split('T')[0] === today);
        const remainingResponses = 5 - userResponsesToday.length;
        setRemainingResponses(remainingResponses < 0 ? 0 : remainingResponses);
      } else {
        console.warn('Пользователь не зарегистрирован в базе данных');
      }
    } catch (error) {
      console.error('Ошибка получения данных пользователя:', error);
    }
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = async () => {
    if (userData && response.trim()) {
      if (userData.role !== 'freelancer') {
        alert('Откликаться могут только фрилансеры.');
        return;
      }
      if (remainingResponses <= 0) {
        alert('Вы исчерпали лимит откликов на сегодня.');
        return;
      }
      try {
        const newResponse = {
          userId: userData.uid,
          text: response.trim(),
          createdAt: new Date(),
        };
        const orderRef = doc(db, 'orders', id);
        await updateDoc(orderRef, { responses: arrayUnion(newResponse) });
        setRemainingResponses((prev) => prev - 1);
        setResponses((prevResponses) => [...prevResponses, newResponse]);
        setResponse('');
        alert('Ваш отклик отправлен!');
      } catch (error) {
        console.error('Ошибка отправки отклика:', error);
        alert('Произошла ошибка при отправке отклика. Пожалуйста, попробуйте еще раз.');
      }
    } else {
      alert('Вы должны быть зарегистрированы и написать отклик, чтобы отправить его.');
    }
  };

  const handleAcceptResponse = async (response) => {
    try {
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

      // Обновляем статус отклика и заказа
      await updateDoc(orderRef, { acceptedResponse: response, status: 'in-progress', paymentStatus: 'frozen' });

      // Отправляем сообщение через Telegram-бота
      const freelancer = userMap[response.userId];
      if (freelancer && freelancer.telegramId) {
        const telegramMessage = `Вас пригласили на работу по заказу "${orderData.title}". Пожалуйста, проверьте ваш профиль.`;
        sendTelegramNotification(freelancer.telegramId, telegramMessage);
      } else {
        console.warn('Telegram ID фрилансера не найден');
      }

      alert('Отклик принят, средства заморожены и приглашение отправлено!');
    } catch (error) {
      console.error('Ошибка принятия отклика:', error);
    }
  };

  const sendTelegramNotification = (chatId, message) => {
    const botToken = '7343406335:AAHVkfXRrxJ7ihiCh9KZ8gXSCmegKkOvJJA'; // Replace with your actual bot token
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.ok) {
            console.log('Сообщение успешно отправлено через Telegram!');
        } else {
            console.error('Ошибка отправки сообщения через Telegram:', data);
        }
    })
    .catch(error => {
        console.error('Ошибка при вызове Telegram API:', error);
    });
};

const handleTestButtonClick = () => {
  const testChatId = '7343406335:AAHVkfXRrxJ7ihiCh9KZ8gXSCmegKkOvJJA'; // Replace with the actual chat ID
  const testMessage = 'Это тестовое сообщение от вашего бота!';
  sendTelegramNotification(testChatId, testMessage);
};

  if (!order) {
    return <Loading />;
  }

  return (
    <div className="order-detail">
      <div className="order-info">
        <div className="client-profile">
          <div className="client-avatar">
            {userData?.avatar ? (
              <img src={userData.avatar} alt="Client Avatar" />
            ) : (
              <div className="default-avatar">A</div>
            )}
          </div>
          <div className="client-info">
            <div className="client-name">{userData?.username || 'Неизвестный клиент'}</div>
            <div className="client-reviews">
              <AiFillStar className="star-rating" />
              <span>4.4</span>
            </div>
          </div>
        </div>
        <h1 className="order-title">{order.title}</h1>
        <p className="order-description">{order.description}</p>
        <div className="order-details">
          <div className="order-info-item">
            <FaDollarSign className="order-icon" />
            <span className="order-price">{order.price} руб.</span>
          </div>
          <div className="order-info-item">
            <FaEye className="order-icon" />
            <span className="order-views">{order.views || 0} просмотров</span>
          </div>
          <div className="order-info-item">
            <FaClock className="order-icon" />
            <span className="order-time">{timeAgo}</span>
          </div>
          <div className="order-info-item">
            <FaCommentDots className="order-icon" />
            <span className="order-responses">{responses.length} откликов</span>
          </div>
        </div>
        <div className="order-tags">
          {order.tags && order.tags.length > 0 ? (
            order.tags.map((tag, index) => (
              <span key={index} className="tag"># {tag}</span>
            ))
          ) : (
            <span className="order-tag">Нет тегов</span>
          )}
        </div>
        <div className="divider" />
        <div className="response-section">
          {isUserLoggedIn ? (
            userData?.role === 'freelancer' ? (
              <div className="response-form">
                <div className="response-info">
                  <span>Осталось откликов: {remainingResponses}</span>
                </div>
                <textarea
                  className="response-textarea"
                  placeholder="Напишите ваш отклик здесь..."
                  value={response}
                  onChange={handleResponseChange}
                />
                <button
                  className="response-button"
                  onClick={handleSubmit}
                  disabled={remainingResponses <= 0}
                >
                  Отправить
                </button>
              </div>
            ) : (
              <div className="registration-message">
                <FaLock className="lock-icon" />
                <h2>Вы не можете откликаться на свой заказ</h2>
                <p>Вы не можете откликаться на свой заказ. Пожалуйста, выберите другой заказ.</p>
              </div>
            )
          ) : (
            <div className="registration-message">
              <FaLock className="lock-icon" />
              <h2>Пожалуйста, зарегистрируйтесь</h2>
              <p>Для отправки отклика на этот заказ необходимо зарегистрироваться. Пожалуйста, <a href="/register">зарегистрируйтесь</a> для продолжения.</p>
            </div>
          )}
        </div>
        {userData?.role === 'client' && (
          <div className="responses-list">
            {responses.length > 0 ? (
              responses.map((res, index) => {
                const createdAtDate = res.createdAt.toDate ? res.createdAt.toDate() : new Date(res.createdAt);
                const username = userMap[res.userId]?.username || 'Неизвестный пользователь';
                const avatar = userMap[res.userId]?.avatar || 'default-avatar.png';
                return (
                  <div key={index} className="response-item">
                    <div className="response-header">
                      <img src={avatar} alt="User Avatar" className="response-avatar" />
                      <span className="response-username">{username}</span>
                      <span className="response-date">{formatDistanceToNow(createdAtDate, { addSuffix: true, locale: ru })}</span>
                      <button className="test-button" onClick={handleTestButtonClick}>Отправить тестовое сообщение</button>
                    </div>
                    <div className="response-text">{res.text}</div>
                    {order.acceptedResponse !== res && (
                      <button className="accept-button" onClick={() => handleAcceptResponse(res)}>Пригласить на работу</button>
                    )}
                  </div>
                );
              })
            ) : (
              <p>Нет откликов.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;