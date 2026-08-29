import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { issueService } from '../services';

const CreateIssuePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'General',
    priority: 'Normal'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.location) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await issueService.createIssue(formData);
      navigate('/issues');
    } catch (err) {
      console.error('Error creating issue:', err);
      // If backend is not available, simulate success for demonstration
      if (err.message.includes('Network error') || err.message.includes('fetch')) {
        alert('Simulated success (Backend not connected). Navigating to dashboard.');
        navigate('/issues');
      } else {
        setError(err.message || 'Failed to create issue. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page create-issue-page flex justify-center">
      <div className="card w-full" style={{ maxWidth: '700px' }}>
        <h1 style={{ marginBottom: '8px' }}>Report an Issue</h1>
        <p style={{ marginBottom: '24px' }}>Help us keep the campus in top shape by reporting any problems.</p>
        
        {error && (
          <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Issue Title <span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              className="form-input" 
              placeholder="e.g. Broken projector in Room 101" 
              value={formData.title} 
              onChange={handleChange} 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="location">Location <span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" 
              id="location" 
              name="location" 
              className="form-input" 
              placeholder="e.g. Main Library, 2nd Floor" 
              value={formData.location} 
              onChange={handleChange} 
              disabled={loading}
            />
          </div>

          <div className="flex-responsive">
            <div className="form-group w-full">
              <label className="form-label" htmlFor="category">Category</label>
              <select 
                id="category" 
                name="category" 
                className="form-select" 
                value={formData.category} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="General">General</option>
                <option value="Maintenance">Maintenance</option>
                <option value="IT">IT & Tech</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Safety">Safety & Security</option>
              </select>
            </div>
            
            <div className="form-group w-full">
              <label className="form-label" htmlFor="priority">Priority</label>
              <select 
                id="priority" 
                name="priority" 
                className="form-select" 
                value={formData.priority} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-8">
            <label className="form-label" htmlFor="description">Description <span style={{color: 'red'}}>*</span></label>
            <textarea 
              id="description" 
              name="description" 
              className="form-textarea" 
              rows="5" 
              placeholder="Please provide details about the issue..." 
              value={formData.description} 
              onChange={handleChange}
              disabled={loading}
            ></textarea>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-outline btn-md" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-md" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssuePage;
