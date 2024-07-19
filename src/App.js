import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
    tg.setHeaderColor('#000000'); // Установите нужный вам цвет здесь
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
    <ul>
      <li>💼 Post and find freelance jobs with ease.</li>
      <li>🔍 Discover talented freelancers from various fields.</li>
      <li>💬 Communicate seamlessly within Telegram.</li>
      <li>⚡ Quick and easy payment processing.</li>
      <li>🚀 Boost your career and grow your business.</li>
    </ul>
    <div className="button-container">
      <button className="btn btn-got-it">Got it</button>
    </div>
  </div>
</div>
  );
}

export default App;
