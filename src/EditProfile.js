import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import Loading from './components/Loading';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [telegramUser, setTelegramUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const initTelegram = async () => {
            if (window.Telegram && window.Telegram.WebApp) {
                const tg = window.Telegram.WebApp;
                const user = tg.initDataUnsafe?.user;
                console.log("Данные пользователя Telegram:", user); // Проверка
                if (user) {
                    setTelegramUser(user);
                    setLoading(false);
                } else {
                    console.error("Данные пользователя не найдены");
                    setLoading(false);
                }
            } else {
                console.error("Telegram WebApp API не инициализирован");
                setLoading(false);
            }
        };

        initTelegram();
    }, []); // Этот useEffect будет вызван один раз при монтировании компонента

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Действия по обновлению данных пользователя (если потребуется)
        setLoading(false);
        navigate('/profile');
    };

    if (loading) {
        return <Loading />;
    }

    if (!telegramUser) {
        return <div>Не удалось загрузить данные пользователя Telegram</div>;
    }

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-content">
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="avatar-preview">
                        <img
                            src={telegramUser.photo_url || '/default-avatar.png'}
                            alt="Telegram Avatar"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={telegramUser.username || ''}
                            readOnly
                            placeholder="Имя пользователя"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name">Имя</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={telegramUser.first_name || ''}
                            readOnly
                            placeholder="Имя"
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="primary large">Сохранить</button>
                        <button type="button" className="secondary large" onClick={() => navigate('/profile')}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
