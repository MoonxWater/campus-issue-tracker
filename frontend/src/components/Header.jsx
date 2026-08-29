import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle, Plus, LayoutDashboard, Moon, Sun } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="header" style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div className="container header-container flex justify-between items-center" style={{ height: '70px' }}>
        
        <Link to="/" className="logo flex items-center gap-2" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
          <AlertCircle size={28} />
          <h1 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.5px' }}>Campus Tracker</h1>
        </Link>
        
        <nav className="main-nav flex items-center gap-4">
          <Link to="/issues" className="flex items-center gap-2" style={{ color: location.pathname === '/issues' ? 'var(--primary-color)' : 'var(--text-muted)', fontWeight: 600 }}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="flex items-center justify-center"
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--text-muted)',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex'
            }}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {localStorage.getItem('adminPassword') ? (
            <button 
              onClick={() => { localStorage.removeItem('adminPassword'); window.location.reload(); }}
              className="btn btn-outline btn-sm" 
            >
              Admin Logout
            </button>
          ) : (
            <Link to="/admin" className="btn btn-outline btn-sm">
              Admin Login
            </Link>
          )}
          
          <Link to="/create-issue" className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Report Issue</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
