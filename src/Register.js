import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Импортируйте db из firebaseConfig
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './Register.css'; // Замените на ваш путь к CSS-файлу

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Дополнительное поле для имени пользователя
  const navigate = useNavigate();
  const defaultAvatarUrl = "https://miro.medium.com/v2/resize:fit:720/1*W35QUSvGpcLuxPo3SRTH4w.png"; // URL дефолтного аватара

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Добавление данных пользователя в коллекцию "users"
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        username: username, // Добавляем имя пользователя
        avatar: defaultAvatarUrl, // Добавляем дефолтный аватар
        createdAt: new Date()
      });
      navigate('/profile'); // Перенаправление на страницу профиля после успешной регистрации
    } catch (error) {
      console.error('Ошибка регистрации:', error.message);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Имя пользователя" required />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />
            </div>
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
        <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
      </div>
    </div>
  );
};

export default Register;