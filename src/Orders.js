import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link here
import OrderCard from './components/OrderCard';
import { FaSearch, FaAngleDown, FaAngleUp, FaPlus } from 'react-icons/fa';
import Navbar from './components/Navbar';
import ordersData from './components/ordersData'; // Импортируем данные заказов
import './Orders.css';

const Orders = () => {
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
  const [filteredOrders, setFilteredOrders] = useState(ordersData); // Используем данные из ordersData

  useEffect(() => {
    filterOrders(filters); // Фильтрация при изменении фильтров
  }, [filters]);

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
      filterOrders(newFilters);
      return newFilters;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      filterOrders(newFilters);
      return newFilters;
    });
  };

  const filterOrders = (filters) => {
    const { searchIn, time, searchText, priceFrom, priceTo, categories } = filters;
    const lowerSearchText = searchText.toLowerCase();

    const newFilteredOrders = ordersData.filter(order => {
      const matchesCategory = !categories.length || categories.includes(order.category);
      const matchesSearchIn = !searchIn.length || searchIn.some(search => order.tags.includes(search));
      const matchesTime = !time.length || time.includes(order.timeAgo.toLowerCase());
      const matchesSearchText = !searchText || [order.title, order.description, ...order.tags].some(text => text.toLowerCase().includes(lowerSearchText));
      const matchesPrice = (priceFrom === '' || parseFloat(order.price) >= parseFloat(priceFrom)) &&
        (priceTo === '' || parseFloat(order.price) <= parseFloat(priceTo));

      return matchesCategory && matchesSearchIn && matchesTime && matchesSearchText && matchesPrice;
    });

    setFilteredOrders(newFilteredOrders);
  };

  const handleCreateOrderClick = () => {
    window.location.href = '/create';
  };

  return (
    <div className="orders-page">
      <Navbar />
      <div className="search-filters-container">
        <header className="orders-header">
          <h1>Заказы ({filteredOrders.length})</h1>
        </header>

        <section className="search-section">
          <input 
            type="text" 
            placeholder="Поиск заказов..." 
            className="search-input" 
            name="searchText" 
            onChange={handleInputChange} 
          />
          <button className="search-button">
            <FaSearch className="search-icon" />
          </button>
        </section>
        
        <section className="filter-section">
          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            Фильтры {showFilters ? <FaAngleUp /> : <FaAngleDown />}
          </button>

          <div className={`filters ${showFilters ? 'show' : 'hide'}`}>
            <div className="filter-group">
              <h3>Искать в</h3>
              <label>
                <input type="checkbox" name="searchIn" value="tags" onChange={handleCheckboxChange} /> Теги
              </label>
              <label>
                <input type="checkbox" name="searchIn" value="titles" onChange={handleCheckboxChange} /> Названия
              </label>
              <label>
                <input type="checkbox" name="searchIn" value="descriptions" onChange={handleCheckboxChange} /> Описания
              </label>
            </div>

            <div className="filter-group">
              <h3>Категории</h3>
              <div className="category-list">
                <label>
                  <input type="checkbox" name="categories" value="Веб-разработка" onChange={handleCheckboxChange} /> Веб-разработка
                </label>
                <label>
                  <input type="checkbox" name="categories" value="Графический дизайн" onChange={handleCheckboxChange} /> Графический дизайн
                </label>
                <label>
                  <input type="checkbox" name="categories" value="Копирайтинг" onChange={handleCheckboxChange} /> Копирайтинг
                </label>
                {showMore && (
                  <>
                    <label>
                      <input type="checkbox" name="categories" value="Цифровой маркетинг" onChange={handleCheckboxChange} /> Цифровой маркетинг
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="SEO-услуги" onChange={handleCheckboxChange} /> SEO-услуги
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Разработка мобильных приложений" onChange={handleCheckboxChange} /> Разработка мобильных приложений
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Видеомонтаж" onChange={handleCheckboxChange} /> Видеомонтаж
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Виртуальная помощь" onChange={handleCheckboxChange} /> Виртуальная помощь
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="UX/UI дизайн" onChange={handleCheckboxChange} /> UX/UI дизайн
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Ввод данных" onChange={handleCheckboxChange} /> Ввод данных
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Услуги перевода" onChange={handleCheckboxChange} /> Услуги перевода
                    </label>
                  </>
                )}
                <button className="more-button" onClick={() => setShowMore(!showMore)}>
                  {showMore ? 'Скрыть <' : 'Больше >'}
                </button>
              </div>
            </div>

            <div className="filter-group">
              <h3>Ценовой диапазон</h3>
              <div className="price-filter">
                <input 
                  type="number" 
                  name="priceFrom" 
                  placeholder="От" 
                  onChange={handleInputChange} 
                />
                <input 
                  type="number" 
                  name="priceTo" 
                  placeholder="До" 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="filter-group">
              <h3>Время</h3>
              <label>
                <input type="checkbox" name="time" value="newest" onChange={handleCheckboxChange} /> Новейшие
              </label>
              <label>
                <input type="checkbox" name="time" value="oldest" onChange={handleCheckboxChange} /> Старейшие
              </label>
            </div>
          </div>
        </section>

        <div className='create-favor-button-container'>
        <button className="create-favor-button" onClick={handleCreateOrderClick}>
          <FaPlus className="create-favor-icon" /> Создать свой заказ
        </button>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.length ? filteredOrders.map(order => (
          <OrderCard 
            key={order.id}
            id={order.id}
            title={order.title}
            description={order.description}
            tags={order.tags}
            timeAgo={order.timeAgo}
            price={order.price}
            responses={order.responses}
            views={order.views}
            isAssigned={order.isAssigned}
          />
        )) : <p>Нет доступных заказов</p>}
      </div>
    </div>
  );
};

export default Orders;
