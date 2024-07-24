// src/components/AuthPrompt.js
import React from 'react';
import './AuthPrompt.css'; // Путь к файлу CSS

const AuthPrompt = () => {
  return (
    <div className="auth-prompt">
      <h2>Welcome to GigGram!</h2>
      <p>Please sign in or join us to access all features.</p>
      <button className="auth-button sign-in-button">Sign In</button>
      <button className="auth-button join-us-button">Join Us</button>
    </div>
  );
};

export default AuthPrompt;
