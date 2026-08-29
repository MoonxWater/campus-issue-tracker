import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'campusadmin') {
      localStorage.setItem('adminPassword', password);
      navigate('/issues');
    } else {
      setError('Invalid admin password');
    }
  };

  return (
    <div className="page admin-login-page flex justify-center items-center" style={{ minHeight: '60vh' }}>
      <div className="card w-full" style={{ maxWidth: '400px' }}>
        <div className="flex justify-center mb-6">
          <div style={{ background: 'var(--background-color)', padding: '16px', borderRadius: '50%' }}>
            <Lock size={32} style={{ color: 'var(--primary-color)' }} />
          </div>
        </div>
        <h2 className="text-center" style={{ marginBottom: '8px' }}>Admin Login</h2>
        <p className="text-center" style={{ marginBottom: '24px' }}>Enter the password to access admin privileges.</p>
        
        {error && (
          <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-6">
            <input 
              type="password" 
              className="form-input" 
              placeholder="Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
