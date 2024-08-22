import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css'; // Import chat styles
import { FaUserCircle, FaPaperPlane } from 'react-icons/fa';

const Chat = () => {
  const { username } = useParams(); // Get username from route parameters
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    { id: 1, sender: 'client', text: 'Привет, у нас встреча сегодня?', time: '10:30' },
    { id: 2, sender: 'freelancer', text: 'Да, во сколько удобно?', time: '10:32' },
    // Add more messages if needed
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sent message:', newMessage);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const { WebApp } = window.Telegram;
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(() => {
        WebApp.BackButton.hide();
        setShowTelegramBackButton(false);
      });
      return () => {
        WebApp.BackButton.hide();
      };
    } else {
      console.error('Telegram WebApp API is not available.');
    }
  }, []);

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="avatar">
          <FaUserCircle size={50} />
        </div>
        <div className="chat-info">
          <h1>Чат с {username}</h1> {/* Display username */}
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
