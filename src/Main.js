// Main.js
import React from 'react';
import './Main.css';

function Main() {
  const handleResetClick = () => {
    localStorage.clear(); // Очистка всего localStorage
    window.location.reload(); // Перезагрузка страницы, чтобы отобразить изменения
  };

  return (
    <div className="main-content">
      <h1>Main Content</h1>
      <p>Welcome to the main area of the application.</p>
      <button className="btn btn-reset" onClick={handleResetClick}>Reset</button>
      {/* Add more content or components here */}
    </div>
  );
}

export default Main;
