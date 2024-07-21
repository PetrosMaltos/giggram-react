import React from 'react';
import './WelcomeScreen.css'; // Не забудь создать соответствующий CSS файл

const WelcomeScreen = ({ onContinue }) => {
  return (
    <div class="welcome-screen">
  <div class="welcome-content">
    <img src="/images/logo_without_bg.png" alt="GigGram Logo" class="welcome-logo" />
    <h1 class="welcome-title">Welcome to GigGram! 🎉</h1>
    <p class="welcome-description">
      The first freelance platform on Telegram where freelancers keep 99% of their earnings. 💰 The remaining 1% is donated to charitable causes. ❤️
    </p>
    <div class="project-info">
      <h2>About Us 🧐</h2>
      <p>GigGram is the first freelance platform on Telegram. We charge no fees—freelancers keep 99% of their earnings, and 1% is donated to charitable foundations. Experience the freedom and support of working with us. 🙌</p>
    </div>
    <button class="welcome-button">Get Started 🚀</button>
  </div>
</div>

  );
};

export default WelcomeScreen;
