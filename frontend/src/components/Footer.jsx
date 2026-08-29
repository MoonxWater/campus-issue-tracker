import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" style={{ background: 'var(--footer-bg)', color: 'var(--footer-text)', padding: '2rem 0', marginTop: 'auto' }}>
      <div className="container footer-container text-center">
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Campus Issue Tracker. Built to keep our campus amazing.</p>
      </div>
    </footer>
  );
};

export default Footer;
