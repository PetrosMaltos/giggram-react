import React, { useEffect } from 'react';

const TelegramLogin = ({ onAuth }) => {
  useEffect(() => {
    window.TelegramLoginWidget = {
      dataOnauth: (user) => onAuth(user),
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.setAttribute('data-telegram-login', 'GigGram_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-auth-url', 'YOUR_AUTH_URL');
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    document.getElementById('telegram-login-container').appendChild(script);
  }, [onAuth]);

  return <div id="telegram-login-container"></div>;
};

export default TelegramLogin;