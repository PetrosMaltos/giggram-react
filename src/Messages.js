import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для навигации
import './Messages.css'; // Импорт стилей для сообщений
import { FaUserCircle, FaClock } from 'react-icons/fa';
import Navbar from './components/Navbar';

const chats = [
  { username: 'alicejohnson', name: 'Alice Johnson', lastMessage: 'Привет, мы все еще в планах на сегодня?', time: '10:30' },
  { username: 'bobsmith', name: 'Bob Smith', lastMessage: 'Можешь прислать мне отчет?', time: 'Вчера' },
  { username: 'charliebrown', name: 'Charlie Brown', lastMessage: 'Во сколько мы встречаемся?', time: '2 дня назад' },
];

const Messages = () => {
  const navigate = useNavigate(); // Используем useNavigate для навигации

  const handleChatClick = (username) => {
    navigate(`/chat/${username}`); // Переход на страницу чата
  };

  return (
    <div className="messages-page">
      <Navbar />
      <div className="content">
        <header className="messages-header">
          <h1>Сообщения</h1>
        </header>
        <div className="messages-list">
          {chats.map(chat => (
            <div
              key={chat.username}
              className="message-card"
              onClick={() => handleChatClick(chat.username)} // Обработчик клика для перехода на страницу чата
            >
              <div className="avatar">
                <FaUserCircle size={50} />
              </div>
              <div className="message-details">
                <div className="message-header">
                  <span className="contact-name">{chat.name}</span>
                  <span className="message-time"><FaClock /> {chat.time}</span>
                </div>
                <div className="message-body">
                  <p>{chat.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
