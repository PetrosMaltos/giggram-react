// src/pages/CategoriesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css'; // Подключаем стили

const CategoriesPage = () => {
  return (
    <div className="categories-page">
      <div className="categories-list">
        {/* Пример категорий */}
        <Link to="/category/web-development" className="category-card">
          <h2>Web Development</h2>
          <p>Find experts to build websites and web apps.</p>
        </Link>
        <Link to="/category/graphic-design" className="category-card">
          <h2>Graphic Design</h2>
          <p>Hire designers for logos, banners, and more.</p>
        </Link>
        <Link to="/category/writing-translation" className="category-card">
          <h2>Writing & Translation</h2>
          <p>Get help with content creation and translations.</p>
        </Link>
        {/* Добавьте больше категорий по необходимости */}
      </div>
    </div>
  );
};

export default CategoriesPage;
