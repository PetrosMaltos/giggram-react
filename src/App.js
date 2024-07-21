// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import Main from './Main';
import Loading from './components/Loading'; // Импортируем компонент Loading

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симулируем задержку загрузки
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 секунды задержки

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/main" element={<Main />} />
          {/* Добавьте другие маршруты здесь */}
        </Routes>
      )}
    </Router>
  );
};

export default App;
