import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle, Plus, LayoutDashboard } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="header" style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div className="container header-container flex justify-between items-center" style={{ height: '70px' }}>
        
        <Link to="/" className="logo flex items-center gap-2" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
          <AlertCircle size={28} />
          <h1 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.5px' }}>Campus Tracker</h1>
        </Link>
        
        <nav className="main-nav flex items-center gap-6">
          <Link to="/issues" className="flex items-center gap-2" style={{ color: location.pathname === '/issues' ? 'var(--primary-color)' : 'var(--text-muted)', fontWeight: 600 }}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          
          <Link to="/create-issue" className="btn btn-primary">
            <Plus size={18} />
            <span>Report Issue</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
