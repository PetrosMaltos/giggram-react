// src/components/auth/Login.js
import React, { useEffect } from 'react';
import './Auth.css'; // Стили для авторизации

const Login = () => {
  useEffect(() => {
    // Инициализация Telegram кнопки после монтирования компонента
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.setHeaderColor('#000000'); // Установка цвета заголовка

      window.Telegram.WebApp.BackButton.hide(); // Скрыть кнопку "Назад" на странице входа

      const handleTelegramLogin = () => {
        window.Telegram.WebApp.sendData('login');
      };

      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?7';
      script.async = true;
      script.onload = () => {
        window.TelegramLoginWidget = {
          id: 'login-widget',
          bot: 'your_bot_username',
          size: 'large',
          radius: 10,
          authUrl: 'https://yourdomain.com/auth', // URL для авторизации
          requestAccess: 'write',
          onAuth: (user) => {
            console.log('Authenticated user:', user);
            // Перенаправление или обработка пользователя после успешной авторизации
          },
        };

        window.TelegramLoginWidget.init();
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="auth-container">
      <h1>Login with Telegram</h1>
      <div id="login-widget" style="width: 100%; height: 100%;"></div>
      <p>Use the button above to log in with Telegram.</p>
    </div>
  );
};

export default Login;
