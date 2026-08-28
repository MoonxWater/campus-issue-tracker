import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <h1>Campus Tracker</h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/issues">Issues</a></li>
            {/* Developer 2 will add routing logic and other links */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
