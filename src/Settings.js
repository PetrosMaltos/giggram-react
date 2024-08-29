import React, { useState } from 'react';
import './Settings.css';
import Navbar from './components/Navbar';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [theme, setTheme] = useState('dark'); // Тема по умолчанию
  const [openSection, setOpenSection] = useState(null); // Для отслеживания открытой секции
  const navigate = useNavigate();

  const handleThemeChange = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleSection = (section) => {
    setOpenSection(prevSection => prevSection === section ? null : section);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Перенаправление на страницу входа после выхода
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error);
    }
  };

  return (
    <div className={`settings-container ${theme}`}>
      <Navbar />
      <h1 className="settings-title">Настройки</h1>
      <div className={`settings-section ${openSection === 'account' ? 'open' : ''}`}>
        <h2 className="section-title" onClick={() => toggleSection('account')}>Аккаунт</h2>
        <div className="settings-content">
          <div className="setting-item">
            <span className="setting-label">Профиль</span>
            <button className="setting-button">Редактировать профиль</button>
          </div>
          <div className="setting-item">
            <span className="setting-label">Безопасность</span>
            <button className="setting-button">Изменить пароль</button>
          </div>
          <div className="setting-item">
            <span className="setting-label">Выйти из аккаунта</span>
            <button className="logout-button" onClick={handleLogout}>Выйти</button>
          </div>
        </div>
      </div>
      <div className={`settings-section ${openSection === 'notifications' ? 'open' : ''}`}>
        <h2 className="section-title" onClick={() => toggleSection('notifications')}>Уведомления</h2>
        <div className="settings-content">
          <div className="setting-item">
            <span className="setting-label">Push-уведомления</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <span className="setting-label">Email-уведомления</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
      <div className={`settings-section ${openSection === 'privacy' ? 'open' : ''}`}>
        <h2 className="section-title" onClick={() => toggleSection('privacy')}>Конфиденциальность</h2>
        <div className="settings-content">
          <div className="setting-item">
            <span className="setting-label">Показывать статус онлайн</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
      <div className={`settings-section ${openSection === 'subscription' ? 'open' : ''}`}>
        <h2 className="section-title" onClick={() => toggleSection('subscription')}>Подписка</h2>
        <div className="settings-content">
          <div className="setting-item">
            <span className="setting-label">Текущий план</span>
            <span className="setting-value">Бесплатный</span>
          </div>
          <div className="setting-item">
            <span className="setting-label">Обновить</span>
            <button className="setting-button">Выбрать план</button>
          </div>
        </div>
      </div>
      <div className={`settings-section ${openSection === 'theme' ? 'open' : ''}`}>
        <h2 className="section-title" onClick={() => toggleSection('theme')}>Тема</h2>
        <div className="settings-content">
          <div className="setting-item">
            <span className="setting-label">Тёмный режим</span>
            <label className="switch">
              <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeChange} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;