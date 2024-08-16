import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css'; // Импорт стилей для чата
import { FaUserCircle, FaPaperPlane } from 'react-icons/fa';

const Chat = () => {
  const { username } = useParams(); // Получаем username из параметров маршрута
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    { id: 1, sender: 'client', text: 'Привет, у нас встреча сегодня?', time: '10:30' },
    { id: 2, sender: 'freelancer', text: 'Да, во сколько удобно?', time: '10:32' },
    // Добавьте больше сообщений по необходимости
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Отправлено сообщение:', newMessage);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // Настройка кнопки "Назад"
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
  }, [id]);

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="avatar">
          <FaUserCircle size={50} />
        </div>
        <div className="chat-info">
          <h1>Чат с {username}</h1> {/* Отображаем username */}
        </div>
      </header>
      <div className="chat-messages">
        {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="message-header">
                <span className="message-sender">
                {msg.sender === 'client' ? 'Фрилансер:' : 'Вы:'}
                </span>
            </div>
            <p>{msg.text}</p>
            <span className="message-time">{msg.time}</span>
            </div>
        ))}
        </div>
      <form onSubmit={handleSendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Напишите сообщение..."
        />
        <button type="submit"><FaPaperPlane /></button>
      </form>
    </div>
  );
};

export default Chat;
