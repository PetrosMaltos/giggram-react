import React from 'react';
import './Messages.css'; // Импорт стилей для сообщений
import { FaUserCircle, FaClock } from 'react-icons/fa';
import Navbar from './components/Navbar';

const chats = [
  { id: 1, name: 'Alice Johnson', lastMessage: 'Привет, мы все еще в планах на сегодня?', time: '10:30' },
  { id: 2, name: 'Bob Smith', lastMessage: 'Можешь прислать мне отчет?', time: 'Вчера' },
  { id: 3, name: 'Charlie Brown', lastMessage: 'Во сколько мы встречаемся?', time: '2 дня назад' },
];

const Messages = () => {
  return (
    <div className="messages-page">
      <Navbar />
      <div className="content">
        <header className="messages-header">
          <h1>Сообщения</h1>
        </header>
        <div className="messages-list">
          {chats.map(chat => (
            <div key={chat.id} className="message-card">
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
