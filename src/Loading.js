// src/Loading.js
import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-logo"></div>
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Loading;
