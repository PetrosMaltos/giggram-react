import React, { useState } from 'react';
import './Settings.css'; // Импорт CSS файла для стилей
import Navbar from './components/Navbar';

const Settings = () => {
    const [theme, setTheme] = useState('dark'); // Тема по умолчанию

    const handleThemeChange = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={`settings-container ${theme}`}>
            <Navbar />
            <h1 className="settings-title">Настройки</h1>
            <div className="settings-section">
                <h2 className="section-title">Аккаунт</h2>
                <div className="setting-item">
                    <span className="setting-label">Профиль</span>
                    <button className="setting-button">Редактировать профиль</button>
                </div>
                <div className="setting-item">
                    <span className="setting-label">Безопасность</span>
                    <button className="setting-button">Изменить пароль</button>
                </div>
            </div>
            <div className="settings-section">
                <h2 className="section-title">Уведомления</h2>
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
            <div className="settings-section">
                <h2 className="section-title">Конфиденциальность</h2>
                <div className="setting-item">
                    <span className="setting-label">Показывать статус онлайн</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                
            </div>
            <div className="settings-section">
                <h2 className="section-title">Подписка</h2>
                <div className="setting-item">
                    <span className="setting-label">Текущий план</span>
                    <span className="setting-value">Бесплатный</span>
                </div>
                <div className="setting-item">
                    <span className="setting-label">Обновить</span>
                    <button className="setting-button">Выбрать план</button>
                </div>
            </div>
            <div className="settings-section-theme">
                <h2 className="section-title">Тема</h2>
                <div className="setting-item">
                    <span className="setting-label">Тёмный режим</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={theme === 'dark'}
                            onChange={handleThemeChange}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;
