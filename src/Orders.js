import React, { useState } from 'react';
import OrderCard from './components/OrderCard';
import { FaSearch, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Navbar from './components/Navbar';
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
  const [orders, setOrders] = useState([
    {
      title: 'Web Development Project',
      description: 'Build a modern website for a local business.',
      tags: ['Web Development', 'Front-End'],
      timeAgo: '1 minute',
      price: '500',
      responses: '10',
      views: 134,
      categories: 'Web Development',
    },
    // Add more orders as needed
  ]);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (name === 'categories') {
        const newCategories = [...newFilters.categories];
        if (newCategories.includes(value)) {
          newFilters.categories = newCategories.filter(category => category !== value);
        } else {
          newFilters.categories.push(value);
        }
      } else {
        if (!Array.isArray(newFilters[name])) {
          newFilters[name] = [];
        }

        if (newFilters[name].includes(value)) {
          newFilters[name] = newFilters[name].filter(item => item !== value);
        } else {
          newFilters[name].push(value);
        }
      }

      console.log('Updated Filters:', newFilters);  // Debugging line
      filterOrders(newFilters);

      return newFilters;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      filterOrders(newFilters);
      return newFilters;
    });
  };

  const filterOrders = (filters) => {
    const { searchIn, time, searchText, priceFrom, priceTo, categories } = filters;

    const newFilteredOrders = orders.filter(order => {
      const matchesCategory = categories.length === 0 || categories.includes(order.category);
      const matchesSearchIn = searchIn.length === 0 || searchIn.some(search => order.tags.includes(search));
      const matchesTime = time.length === 0 || time.includes(order.timeAgo.toLowerCase());
      const matchesSearchText = searchText ? 
        order.title.toLowerCase().includes(searchText.toLowerCase()) ||
        order.description.toLowerCase().includes(searchText.toLowerCase()) ||
        order.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
        : true;
      const matchesPrice = (priceFrom === '' || parseFloat(order.price) >= parseFloat(priceFrom)) &&
        (priceTo === '' || parseFloat(order.price) <= parseFloat(priceTo));

      return matchesCategory && matchesSearchIn && matchesTime && matchesSearchText && matchesPrice;
    });

    console.log('Filtered Orders:', newFilteredOrders);  // Debugging line
    setFilteredOrders(newFilteredOrders);
  };

  return (
    <div className="orders-page">
      <Navbar />
      <div className="search-filters-container">
        <header className="orders-header">
          <h1>Orders (325)</h1>
        </header>

        <section className="search-section">
          <input 
            type="text" 
            placeholder="Search for orders or @users" 
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
            Filters {showFilters ? <FaAngleUp /> : <FaAngleDown />}
          </button>

          <div className={`filters ${showFilters ? 'show' : 'hide'}`}>
            <div className="filter-group">
              <h3>Search In</h3>
              <label>
                <input type="checkbox" name="searchIn" value="tags" onChange={handleCheckboxChange} /> Tags
              </label>
              <label>
                <input type="checkbox" name="searchIn" value="titles" onChange={handleCheckboxChange} /> Titles
              </label>
              <label>
                <input type="checkbox" name="searchIn" value="descriptions" onChange={handleCheckboxChange} /> Descriptions
              </label>
            </div>

            <div className="filter-group">
              <h3>Categories</h3>
              <div className="category-list">
                <label>
                  <input type="checkbox" name="categories" value="Web Development" onChange={handleCheckboxChange} /> Web Development
                </label>
                <label>
                  <input type="checkbox" name="categories" value="Graphic Design" onChange={handleCheckboxChange} /> Graphic Design
                </label>
                <label>
                  <input type="checkbox" name="categories" value="Content Writing" onChange={handleCheckboxChange} /> Content Writing
                </label>
                {showMore && (
                  <>
                    <label>
                      <input type="checkbox" name="categories" value="Digital Marketing" onChange={handleCheckboxChange} /> Digital Marketing
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="SEO Services" onChange={handleCheckboxChange} /> SEO Services
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Mobile App Development" onChange={handleCheckboxChange} /> Mobile App Development
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Video Editing" onChange={handleCheckboxChange} /> Video Editing
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Virtual Assistance" onChange={handleCheckboxChange} /> Virtual Assistance
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="UX/UI Design" onChange={handleCheckboxChange} /> UX/UI Design
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Data Entry" onChange={handleCheckboxChange} /> Data Entry
                    </label>
                    <label>
                      <input type="checkbox" name="categories" value="Translation Services" onChange={handleCheckboxChange} /> Translation Services
                    </label>
                  </>
                )}
                <button className="more-button" onClick={() => setShowMore(!showMore)}>
                  {showMore ? 'Hide <' : 'More >'}
                </button>
              </div>
            </div>

            <div className="filter-group">
              <h3>Price Range</h3>
              <div className="price-filter">
                <input 
                  type="number" 
                  name="priceFrom" 
                  placeholder="From" 
                  onChange={handleInputChange} 
                />
                <input 
                  type="number" 
                  name="priceTo" 
                  placeholder="To" 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="filter-group margin-bottom-20">
              <h3>Time</h3>
              <label>
                <input type="checkbox" name="time" value="newest" onChange={handleCheckboxChange} /> Newest
              </label>
              <label>
                <input type="checkbox" name="time" value="oldest" onChange={handleCheckboxChange} /> Oldest
              </label>
            </div>
          </div>
        </section>
      </div>

      <section className="orders-list-section">
        <div className="orders-list">
          {filteredOrders.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Orders;
