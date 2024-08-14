import React from 'react';
import ProjectCard from './components/ProjectCard';
import './Projects.css';
import Navbar from './components/Navbar'
import { FaSearch } from 'react-icons/fa';

const projectsData = [
  {
    id: 1,
    title: 'Проект А',
    image: 'https://kartinki.pics/uploads/posts/2022-03/thumbs/1646234847_38-kartinkin-net-p-proekt-kartinki-41.jpg',
    authorName: 'Иван Иванов',
    authorAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRmKtuomAZ-EqzmsyrhkfPcY_fSgP0qc90QUjVEFlb7o8QDwq963XQbVGjhnq9WOkjXtU&usqp=CAU',
    description: 'Это описание проекта А. Здесь вы можете узнать, какие задачи решает проект, какие технологии используются и какие цели он преследует.'
  },
  {
    id: 2,
    title: 'Проект Б',
    image: 'https://kartinki.pics/uploads/posts/2022-03/thumbs/1646234847_38-kartinkin-net-p-proekt-kartinki-41.jpg',
    authorName: 'Мария Петрова',
    authorAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRmKtuomAZ-EqzmsyrhkfPcY_fSgP0qc90QUjVEFlb7o8QDwq963XQbVGjhnq9WOkjXtU&usqp=CAU',
    description: 'Это описание проекта Б. В этом проекте рассматриваются особенности и преимущества решения, которое предлагает проект, а также возможные направления развития.'
  },
  {
    id: 3,
    title: 'Проект В',
    image: 'https://kartinki.pics/uploads/posts/2022-03/thumbs/1646234847_38-kartinkin-net-p-proekt-kartinki-41.jpg',
    authorName: 'Александр Смирнов',
    authorAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRmKtuomAZ-EqzmsyrhkfPcY_fSgP0qc90QUjVEFlb7o8QDwq963XQbVGjhnq9WOkjXtU&usqp=CAU',
    description: 'Это описание проекта В. Описание включает в себя ключевые особенности проекта, его уникальные функции и преимущества, которые он предоставляет пользователям.'
  },
];

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      filterOrders(newFilters);
      return newFilters;
    });
  };

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
            name="searchText" 
            onChange={handleInputChange} 
          />
          <button className="search-button">
            <FaSearch className="search-icon" />
          </button>
        </section>


      <section className="projects-list">
        {projectsData.map(project => (
          <ProjectCard
            key={project.id}
            title={project.title}
            image={project.image}
            authorName={project.authorName}
            authorAvatar={project.authorAvatar}
            description={project.description}
          />
        ))}
      </section>
    </div>
  );
};

export default Projects;
