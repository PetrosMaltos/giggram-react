import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const defaultAvatarUrl = "https://miro.medium.com/v2/resize:fit:720/1*W35QUSvGpcLuxPo3SRTH4w.png";

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        avatar: defaultAvatarUrl,
        createdAt: new Date()
      });
      navigate('/profile');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Этот email уже используется. Пожалуйста, используйте другой email.');
      } else if (error.code === 'permission-denied') {
        setErrorMessage('Недостаточно прав для выполнения этой операции.');
      } else {
        setErrorMessage('Ошибка регистрации: ' + error.message);
      }
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
      </div>
    </div>
  );
};

export default Register;
