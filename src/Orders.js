import React from 'react';
import './Orders.css';

const orders = [
    {
      id: 1,
      title: 'Build a React App',
      price: '$1500',
      status: 'Open',
      creationDate: '2024-07-20',
      estimatedTime: '10',
      hashtag: 'react',
      views: 120,
      responses: 5
    },
    {
      id: 2,
      title: 'Design a Logo',
      price: '$500',
      status: 'Open',
      creationDate: '2024-07-19',
      estimatedTime: '5',
      hashtag: 'logo',
      views: 80,
      responses: 3
    },
    {
      id: 3,
      title: 'SEO Optimization',
      price: '$800',
      status: 'Open',
      creationDate: '2024-07-18',
      estimatedTime: '8',
      hashtag: 'seo',
      views: 150,
      responses: 7
    },
    // Add more orders as needed
  ];
  

  function Orders() {
    return (
      <div className="orders-container">
        <div className="orders-title">Orders</div>
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h2 className="order-title">{order.title}</h2>
            <div className="order-footer">
              <span className="order-price">{order.price}</span>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-meta">
              <div className="order-meta-item">
                <i className="bx bx-calendar"></i>
                <span>Created: {order.creationDate}</span>
              </div>
              <div className="order-meta-item">
                <i className="bx bx-time"></i>
                <span>Estimated Time: {order.estimatedTime} hours</span>
              </div>
              <div className="order-meta-item">
                <i className="bx bx-hashtag"></i>
                <span>#{order.hashtag}</span>
              </div>
              <div className="order-meta-item">
                <i className="bx bx-eye"></i>
                <span>{order.views} Views</span>
              </div>
              <div className="order-meta-item">
                <i className="bx bx-chat"></i>
                <span>{order.responses} Responses</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  

  

export default Orders;
