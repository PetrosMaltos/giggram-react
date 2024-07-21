// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Импортируем основной компонент приложения

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Используем только App, который содержит Router */}
  </React.StrictMode>
);
