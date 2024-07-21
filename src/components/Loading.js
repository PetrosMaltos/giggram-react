// src/Loading.js
import React from 'react';
import './Loading.css'; // Импортируем стили для страницы загрузки

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading;
