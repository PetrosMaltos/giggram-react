import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AiFillStar } from 'react-icons/ai';
import { FaDollarSign, FaEye, FaClock, FaCommentDots, FaLock } from 'react-icons/fa';
import './OrderDetail.css';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from './Loading';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [response, setResponse] = useState('');
  const [timeAgo, setTimeAgo] = useState('');
  const [userData, setUserData] = useState(null);
  const [responses, setResponses] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', id);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          const orderData = orderSnap.data();
          setOrder(orderData);
          setResponses(orderData.responses || []);
          const updateTimer = () => {
            const createdAtDate = orderData.createdAt.toDate ? orderData.createdAt.toDate() : new Date(orderData.createdAt);
            setTimeAgo(formatDistanceToNow(createdAtDate, { addSuffix: true, locale: ru }));
          };
          updateTimer();
          const timer = setInterval(updateTimer, 1000); // Обновление каждую секунду
          return () => clearInterval(timer);
        }
      } catch (error) {
        console.error('Ошибка получения данных заказа:', error);
      }
    };
    
    const handleAcceptResponse = async (response) => {
      try {
        const orderRef = doc(db, 'orders', id);
        await updateDoc(orderRef, {
          acceptedResponse: response,
          status: 'in-progress',
          paymentStatus: 'frozen',
        });
        alert('Отклик принят, средства заморожены!');
      } catch (error) {
        console.error('Ошибка принятия отклика:', error);
      }
    };
    
    // В интерфейсе:
    {responses.map((res, index) => (
      <div key={index} className="response-item">
        <p>{res.text}</p>
        <button onClick={() => handleAcceptResponse(res)}>Принять отклик</button>
      </div>
    ))}
    

    const fetchUserData = async (userId) => {
      try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.warn('Пользователь не зарегистрирован в базе данных');
        }
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
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

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = async () => {
    if (userData && response.trim()) {
      try {
        const newResponse = {
          userId: userData.uid, // Замените на правильное поле `uid`
          text: response.trim(),
          createdAt: new Date(), // добавить метку времени
        };
  
        // Отладочная информация больше не нужна, но оставим её для проверки
        if (!newResponse.userId) {
          console.error('userId is missing:', userData);
        }
        if (!newResponse.text) {
          console.error('text is missing:', response);
        }
  
        // Проверяем, что все поля определены
        if (!newResponse.userId || !newResponse.text) {
          throw new Error('Некоторые данные отклика отсутствуют.');
        }
  
        const orderRef = doc(db, 'orders', id);
        await updateDoc(orderRef, {
          responses: arrayUnion(newResponse)
        });
  
        setResponses(prevResponses => [...prevResponses, newResponse]);
        setResponse('');
        alert('Ваш отклик отправлен!');
      } catch (error) {
        console.error('Ошибка отправки отклика:', error);
        alert('Произошла ошибка при отправке отклика. Пожалуйста, попробуйте еще раз.');
      }
    } else {
      if (!userData) {
        console.error('userData is null:', userData);
      }
      if (!response.trim()) {
        console.error('Response is empty:', response);
      }
      alert('Вы должны быть зарегистрированы и написать отклик, чтобы отправить его.');
    }
  };
  

  if (!order) {
    return <Loading />;
  }

  return (
    <div className="order-detail">
      <div className="order-info">
        <div className="client-profile">
          <div className="client-avatar" />
          <div className="client-info">
            <div className="client-name">Имя клиента</div>
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
            <div className="response-form">
              <textarea
                className="response-textarea"
                placeholder="Напишите ваш отклик здесь..."
                value={response}
                onChange={handleResponseChange}
              />
              <button className="response-button" onClick={handleSubmit}>Отправить</button>
            </div>
          ) : (
            <div className="registration-message">
              <FaLock className="lock-icon" />
              <h2>Пожалуйста, зарегистрируйтесь</h2>
              <p>Для отправки отклика на этот заказ необходимо зарегистрироваться. Пожалуйста, <a href="/register">зарегистрируйтесь</a> для продолжения.</p>
            </div>
          )}
        </div>
        <div className="responses-list">
          {responses.length > 0 && responses.map((res, index) => (
            <div key={index} className="response-item">
              <p>{res.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;