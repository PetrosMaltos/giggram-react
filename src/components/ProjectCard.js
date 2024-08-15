import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации
import './ProjectCard.css';

const ProjectCard = ({ id, title, image, authorName, authorAvatar, description }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Предотвращаем переход по ссылке
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="project-card">
      <Link to={`/projects/${id}`} style={{ textDecoration: 'none' }}>
        <div className="project-image-wrapper">
          <img src={image} alt={title} className="project-image" />
        </div>
        <div className="project-details">
          <div className="author-info">
            <img src={authorAvatar} alt={authorName} className="author-avatar" />
            <p className="author-name">{authorName}</p>
          </div>
          <h2 className="project-title">{title}</h2>
          <p className="project-description">{description}</p>
        </div>
      </Link>
      <button 
        className={`like-button ${liked ? 'liked' : ''}`} 
        onClick={handleLikeClick}
      >
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        <span className="like-count">{likeCount}</span>
      </button>
    </div>
  );
};

export default ProjectCard;
