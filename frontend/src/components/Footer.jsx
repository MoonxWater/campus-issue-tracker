import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>&copy; {new Date().getFullYear()} Campus Issue Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
