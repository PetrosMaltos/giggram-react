// Main.js
import React, { useState } from 'react';
import { LuHome, LuList, LuMessageSquare, LuUser, LuSettings } from 'react-icons/lu'; // Пример использования других иконок
import { GrUserExpert } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import './Main.css';
import Orders from './Orders';

function Main() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <h1>Main Content</h1>
            <p>Welcome to the main area of the application.</p>
          </div>
        );
      case 'orders':
        return <Orders />;
      case 'messages':
        return (
          <div>
            <h1>Messages</h1>
            <p>Check your messages here.</p>
          </div>
        );
      case 'experts':
        return (
          <div>
            <h1>Experts</h1>
            <p>Find experts here.</p>
          </div>
        );
      case 'profile':
        return (
          <div>
            <h1>Profile</h1>
            <p>Manage your profile here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      <div className="content">
        {renderContent()}
      </div>
      <div className="navbar">
        <div 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <LuHome className="nav-icon" />
          <span className="nav-text">Home</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <LuList className="nav-icon" />
          <span className="nav-text">Orders</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <LuMessageSquare className="nav-icon" />
          <span className="nav-text">Messages</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'experts' ? 'active' : ''}`}
          onClick={() => setActiveTab('experts')}
        >
          <GrUserExpert className="nav-icon" />
          <span className="nav-text">Experts</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaRegUserCircle className="nav-icon" />
          <span className="nav-text">Profile</span>
        </div>
      </div>
    </div>
  );
}

export default Main;
