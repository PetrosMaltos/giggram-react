import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
    tg.setHeaderColor('#ffffff'); // Установите нужный вам цвет здесь
  }, []);

  const onRegister = () => {
    // Действие при нажатии на "Register"
    console.log('Register button clicked');
  };

  const onLogin = () => {
    // Действие при нажатии на "Login"
    console.log('Login button clicked');
  };

  return (
    <div className="App">
      <div className="welcome-screen">
        <h1>Welcome to GigGram!</h1>
        <p>The first freelance platform on Telegram. Earn 100% with zero fees!</p>
        <div className="button-container">
          <button onClick={onRegister} className="btn">Register</button>
          <button onClick={onLogin} className="btn">Login</button>
        </div>
      </div>
    </div>
  );
}

export default App;
