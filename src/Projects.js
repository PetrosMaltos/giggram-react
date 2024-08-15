import React from 'react';
import ProjectCard from './components/ProjectCard';
import { Link } from 'react-router-dom';
import './Projects.css';
import Navbar from './components/Navbar';
import { FaSearch } from 'react-icons/fa';
// Projects.js
import { projectsData } from './components/projectData'; // Убедитесь, что путь правильный


  // ... More projects

const Projects = () => {
  return (
    <div className="projects-page">
      <Navbar />
      <header className="projects-header">
        <h1>Проекты</h1>
      </header>
      <section className="search-section3">
        <input 
          type="text" 
          placeholder="Поиск проектов..." 
          className="search-input" 
        />
        <button className="search-button">
          <FaSearch className="search-icon" />
        </button>
      </section>

      <section className="projects-list">
        {projectsData.map(project => (
          <div 
            key={project.id} 
            style={{ textDecoration: 'none' }} // Убираем подчеркивание у ссылок
          >
             <ProjectCard
              id={project.id}
              title={project.title}
              image={project.image}
              authorName={project.authorName}
              authorAvatar={project.authorAvatar}
              description={project.description}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Projects;
