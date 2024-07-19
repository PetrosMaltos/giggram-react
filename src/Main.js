import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css'; // Импортируйте CSS файл для стилизации, если нужно

function Main() {
  const navigate = useNavigate();

  const handleResetClick = () => {
    localStorage.clear(); // Удаляет все данные из localStorage
    navigate('/'); // Перенаправляет обратно на главный экран
  };

  return (
    <div className="main">
      <h1>Main Content</h1>
      <p>Welcome to the main area of the application.</p>
      <button className="btn btn-reset" onClick={handleResetClick}>Reset All Data</button>
    </div>
  );
}

export default Main;
