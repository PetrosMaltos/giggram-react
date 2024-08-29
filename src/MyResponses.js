import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { getResponses, auth } from './firebaseConfig';
import './MyResponses.css';

const MyResponses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);  // Для отображения загрузки

  useEffect(() => {
    const fetchResponses = async () => {
      const user = auth.currentUser;
      
      if (!user) {
        console.error("User is not authenticated");
        // Возможно, перенаправление на страницу входа или отображение сообщения
        return;
      }

      try {
        const data = await getResponses();
        console.log("Loaded Responses: ", data);
        setResponses(data);
      } catch (error) {
        console.error("Error fetching responses: ", error);
      } finally {
        setLoading(false);  // Остановка индикатора загрузки
      }
    };
    
    fetchResponses();
  }, []);

  return (
    <div className="my-responses-page">
      <Navbar />
      <div className="my-responses-content">
        <h2>Мои Отклики</h2>
        {loading ? (
          <p>Загрузка...</p> // Индикатор загрузки
        ) : (
          <div className="responses-list">
            {responses.length > 0 ? (
              responses.map((response, index) => (
                <div key={index} className="response-card">
                  <h3>Проект: {response.projectName}</h3>
                  <p>Отклик: {response.message}</p>
                  <p>Дата: {new Date(response.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>Нет откликов для отображения.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResponses;
