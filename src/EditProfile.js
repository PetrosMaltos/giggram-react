import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const EditProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(currentUser.username || '');
  const [description, setDescription] = useState(currentUser.description || '');

  const handleSave = () => {
    // Сохраните обновления в Firebase
    navigate('/profile');
  };

  return (
    <div className="edit-profile-page">
      <h2>Редактировать Профиль</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default EditProfile;
