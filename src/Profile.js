import React from 'react';
import './Profile.css';
import Navbar from './components/Navbar';

const Profile = () => {
  const user = {
    name: 'Ricky Park',
    description: 'User interface designer and front-end developer',
    skills: ['UI / UX', 'Front End Development', 'HTML', 'CSS', 'JavaScript', 'React', 'Node'],
    currentOrders: 5,
    archivedOrders: 12,
    userType: 'Freelancer'
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="card-container">
          <span className="pro">UPRO</span>
          <img
            className="round"
            src="https://randomuser.me/api/portraits/women/79.jpg"
            alt="user"
          />
          <h3>{user.name}</h3>
          <p>{user.description}</p>
          {user.currentOrders > 0 && (
            <div className="active-orders">
              <a href="/active-orders">Active Orders ({user.currentOrders})</a>
            </div>
          )}
          <div className="button-group">
            <button className="primary">Message</button>
            <button className="primary ghost">Following</button>
          </div>
          <div className="skills">
            <h6>Skills</h6>
            <ul>
              {user.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="user-info">
            <h6>Additional Information</h6>
            <div className="info-item">
              <span>Archived Orders:</span> {user.archivedOrders}
            </div>
            <div className="info-item">
              <span>Role:</span> {user.userType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
