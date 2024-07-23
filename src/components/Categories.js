import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaPalette, FaBook } from 'react-icons/fa'; // Importing icons
import './Categories.css'; // Import styles

const CategoriesPage = () => {
  return (
    <div className="categories-page">
      <h1>Explore Categories</h1>
      <div className="categories-list">
        <Link to="/category/web-development" className="category-card">
          <div className="category-icon"><FaCode /></div>
          <div className="category-content">
            <h2>Web Development</h2>
            <p>Find experts to build websites and web apps.</p>
          </div>
        </Link>
        <Link to="/category/graphic-design" className="category-card">
          <div className="category-icon"><FaPalette /></div>
          <div className="category-content">
            <h2>Graphic Design</h2>
            <p>Hire designers for logos, banners, and more.</p>
          </div>
        </Link>
        <Link to="/category/writing-translation" className="category-card">
          <div className="category-icon"><FaBook /></div>
          <div className="category-content">
            <h2>Writing & Translation</h2>
            <p>Get help with content creation and translations.</p>
          </div>
        </Link>
        {/* Add more categories as needed */}
      </div>
    </div>
  );
};

export default CategoriesPage;
