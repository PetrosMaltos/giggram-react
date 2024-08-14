import React, { useState } from 'react';
import FavorCard from './components/FavorCard';
import { FaSearch, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Navbar from './components/Navbar';
import { FaPlus } from 'react-icons/fa';
import './Favors.css';

const Favors = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [filters, setFilters] = useState({
    searchIn: [],
    time: [],
    searchText: '',
    priceFrom: '',
    priceTo: '',
    categories: [],
  });
  
  const [favors, setFavors] = useState([
    {
      id: 1,
      title: 'Проект по веб-разработке',
      tags: ['Веб-разработка', 'Front-End'],
      price: '100 руб.',
      responses: '12',
      category: 'Веб-разработка',
      imagePaths: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5y_CQNi9oiqn96_0204tGgLQuUxigGKLe1w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0LfS9nSDlbx3oQvpOr2fLG_GTc0ccSkgQ3prAYBFIet8kx2VYEpa-0-40-KWargwSgI&usqp=CAU'
      ],  
    },
    {
      id: 2,
      title: 'Проект на Java',
      tags: ['Веб-разработка', 'Front-End'],
      price: '5000 руб.',
      responses: '11',
      category: 'Веб-разработка',
      imagePaths: [
        'https://www.interfax.ru/ftproot/photos/photostory/2019/07/09/week4_700.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9MDifd0N-WyXhDj_yT0Xa4V8y5KWZHJimA&s'
      ],
  
    },
    // Добавьте больше заказов по мере необходимости
  ]);
  
  const [filteredFavors, setFilteredFavors] = useState(favors);

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev };
      if (name === 'categories') {
        newFilters.categories = newFilters.categories.includes(value)
          ? newFilters.categories.filter(cat => cat !== value)
          : [...newFilters.categories, value];
      } else {
        newFilters[name] = newFilters[name].includes(value)
          ? newFilters[name].filter(item => item !== value)
          : [...(Array.isArray(newFilters[name]) ? newFilters[name] : []), value];
      }
      filterFavors(newFilters);
      return newFilters;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      filterFavors(newFilters);
      return newFilters;
    });
  };

  const filterFavors = (filters) => {
    const { searchIn, time, searchText, priceFrom, priceTo, categories } = filters;
    const lowerSearchText = searchText.toLowerCase();

    const newFilteredFavors = favors.filter(favor => {
      const matchesCategory = !categories.length || categories.includes(favor.category);
      const matchesSearchIn = !searchIn.length || searchIn.some(search => favor.tags.includes(search));
      const matchesTime = !time.length || time.includes(favor.timeAgo.toLowerCase());
      const matchesSearchText = !searchText || [favor.title, favor.description, ...favor.tags].some(text => text.toLowerCase().includes(lowerSearchText));
      const matchesPrice = (priceFrom === '' || parseFloat(favor.price) >= parseFloat(priceFrom)) &&
        (priceTo === '' || parseFloat(favor.price) <= parseFloat(priceTo));

      return matchesCategory && matchesSearchIn && matchesTime && matchesSearchText && matchesPrice;
    });

    setFilteredFavors(newFilteredFavors);
  };

  const handleCreateFavorClick = () => {
    window.location.href = '/create';
  };

  return (
    <div className="favors-page">
      <Navbar />
      <div className="search-filters-container">
        <header className="favors-header">
          <h1>Услуги ({filteredFavors.length})</h1>
        </header>

        <section className="search-section2">
          <input 
            type="text" 
            placeholder="Поиск услуг..." 
            className="search-input" 
            name="searchText" 
            onChange={handleInputChange} 
          />
          <button className="search-button">
            <FaSearch className="search-icon" />
          </button>
        </section>
        <div className='create-favor-button-container'>
        <button className="create-favor-button" onClick={handleCreateFavorClick}>
          <FaPlus className="create-favor-icon" /> Создать свою услугу
        </button>
        </div>
      </div>

      <section className="favors-list-section">
        <div className="favors-list">
          {filteredFavors.map((favor) => (
            <FavorCard key={favor.id} {...favor} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Favors;
