import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <WelcomeScreen />
    </Router>
  </React.StrictMode>
);
