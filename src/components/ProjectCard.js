import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import './ProjectCard.css';

const ProjectCard = ({ title, image, authorName, authorAvatar, description }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  // Функция для удаления фокуса с кнопки
  const handleMouseDown = (event) => {
    event.preventDefault(); // Отменяет стандартное действие при нажатии на кнопку
  };

  const handleFocus = (event) => {
    event.target.blur(); // Убирает фокус с кнопки сразу после его установки
  };

  return (
    <div className="project-card">
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
        <button 
          className={`like-button ${liked ? 'liked' : ''}`} 
          onClick={handleLikeClick}
          onMouseDown={handleMouseDown} // Применяем обработчик при нажатии на кнопку
          onFocus={handleFocus} // Убирает фокус при его установке
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          <span className="like-count">{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
