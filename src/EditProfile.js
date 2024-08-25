import React, { useState } from 'react';
import './EditProfile.css';
import { useNavigate } from 'react-router-dom';
import { updateUserData, uploadAvatar, auth, getUserData } from './firebaseConfig'; // Добавляем auth и getUserData
import { useUser } from './UserContext';
import imageCompression from 'browser-image-compression';

const EditProfile = () => {
    const { user, setUser } = useUser(); // Получаем контекст
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(file, options);
            setAvatarFile(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
        }
    };

    const handleSkillsChange = (e) => {
        const skillsString = e.target.value;
        const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
        setUser({ ...user, skills: skillsArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let avatarUrl = user.avatar;
            if (avatarFile) {
                avatarUrl = await uploadAvatar(avatarFile, auth.currentUser.uid);
            }
            await updateUserData(auth.currentUser.uid, { ...user, avatar: avatarUrl });
        
            // Обновление данных о пользователе
            const updatedUserData = await getUserData(auth.currentUser.uid);
            setUser(updatedUserData); // Обновляем состояние в контексте
        
            navigate('/profile');
        } catch (error) {
            console.error("Failed to update user profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-content">
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="avatar-preview">
                        <img
                            src={user.avatar || '/default-avatar.png'}
                            alt="Avatar"
                            className="round"
                        />
                        <input type="file" onChange={handleAvatarChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={user.username || ''}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Имя пользователя"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Описание</label>
                        <textarea
                            id="description"
                            name="description"
                            value={user.description || ''}
                            onChange={(e) => setUser({ ...user, description: e.target.value })}
                            placeholder="Описание"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills">Навыки</label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={user.skills.join(', ')} // Объединяем массив в строку
                            onChange={handleSkillsChange} // Обрабатываем изменения
                            placeholder="Навыки (через запятую)"
                        />
                    </div>
                    <button type="submit" className="primary large">Сохранить</button>
                    <button type="button" className="secondary large" onClick={() => navigate('/profile')}>Отмена</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
