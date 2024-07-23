// src/pages/CategoriesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css'; // Подключаем стили

const CategoriesPage = () => {
  return (
    <div className="categories-page">
      <h1>Explore Categories</h1>
      <div className="categories-list">
        {/* Пример категорий */}
        <Link to="/category/web-development" className="category-card">
          <div className="category-content">
            <h2>Web Development</h2>
            <p>Find experts to build websites and web apps.</p>
          </div>
        </Link>
        <Link to="/category/graphic-design" className="category-card">
          <div className="category-content">
            <h2>Graphic Design</h2>
            <p>Hire designers for logos, banners, and more.</p>
          </div>
        </Link>
        <Link to="/category/writing-translation" className="category-card">
          <div className="category-content">
            <h2>Writing & Translation</h2>
            <p>Get help with content creation and translations.</p>
          </div>
        </Link>
        {/* Добавьте больше категорий по необходимости */}
      </div>
    </div>
  );
};

export default CategoriesPage;
