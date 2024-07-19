import React, { useState } from 'react';
import { LuHome, LuPackage, LuMessageSquare, LuUser, LuBriefcase } from "react-icons/lu";
import './Main.css';

function Main() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="main-container">
      <div className="content">
        <h1>Main Content</h1>
        <p>Welcome to the main area of the application.</p>
        {/* Добавьте сюда контент главной страницы */}
      </div>
      <div className="navbar">
        <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <LuHome className="nav-icon" />
          <span className="nav-text">Home</span>
        </div>
        <div className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
          <LuPackage className="nav-icon" />
          <span className="nav-text">Orders</span>
        </div>
        <div className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
          <LuMessageSquare className="nav-icon" />
          <span className="nav-text">Messages</span>
        </div>
        <div className={`nav-item ${activeTab === 'spec' ? 'active' : ''}`} onClick={() => setActiveTab('spec')}>
          <LuBriefcase className="nav-icon" />
          <span className="nav-text">Spec</span>
        </div>
        <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
          <LuUser className="nav-icon" />
          <span className="nav-text">Profile</span>
        </div>
      </div>
    </div>
  );
}

export default Main;
