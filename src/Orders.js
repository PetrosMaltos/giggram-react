import React from 'react';
import './Orders.css';

const orders = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Need a full-stack developer to build a responsive website.',
    price: '$1500',
    status: 'Open',
    responses: 5,
    views: 120,
    postedAgo: '2 hours ago',
    hashtag: '#webdev',
  },
  {
    id: 2,
    title: 'Graphic Design',
    description: 'Looking for a designer to create a company logo and branding.',
    price: '$500',
    status: 'Open',
    responses: 2,
    views: 85,
    postedAgo: '1 day ago',
    hashtag: '#design',
  },
  {
    id: 3,
    title: 'SEO Optimization',
    description: 'Need an expert to improve website SEO and increase traffic.',
    price: '$800',
    status: 'Open',
    responses: 8,
    views: 200,
    postedAgo: '3 hours ago',
    hashtag: '#seo',
  },
  // Add more orders as needed
];

function Orders() {
  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <h2 className="order-title">{order.title}</h2>
          <p className="order-description">{order.description}</p>
          <div className="order-footer">
            <span className="order-price">{order.price}</span>
            <span className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          <div className="order-meta">
            <div className="order-meta-item">
              <i className="bx bx-comment-detail"></i>
              <span>{order.responses} Responses</span>
            </div>
            <div className="order-meta-item">
              <i className="bx bx-show"></i>
              <span>{order.views} Views</span>
            </div>
            <div className="order-meta-item">
              <i className="bx bx-time"></i>
              <span>{order.postedAgo}</span>
            </div>
            <div className="order-meta-item">
              <i className="bx bx-hashtag"></i>
              <span>{order.hashtag}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
