import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { issueService } from '../services';

const EditIssuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'General',
    priority: 'Normal',
    status: 'Open'
  });

  useEffect(() => {
    // Basic admin check
    if (!localStorage.getItem('adminPassword')) {
      navigate('/admin');
      return;
    }

    const fetchIssue = async () => {
      try {
        setLoading(true);
        const data = await issueService.getIssueById(id);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          location: data.location || '',
          category: data.category || 'General',
          priority: data.priority || 'Normal',
          status: data.status || 'Open'
        });
        setError(null);
      } catch (err) {
        setError('Failed to load issue details.');
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await issueService.updateIssue(id, formData);
      navigate(`/issues/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update issue. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center" style={{ minHeight: '50vh' }}>Loading issue data...</div>;
  }

  return (
    <div className="page edit-issue-page flex justify-center">
      <div className="card w-full" style={{ maxWidth: '700px' }}>
        <h1 style={{ marginBottom: '8px' }}>Edit Issue</h1>
        <p style={{ marginBottom: '24px' }}>Update the details, priority, or status of this issue.</p>
        
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
              value={formData.title} 
              onChange={handleChange} 
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="location">Location <span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" 
              id="location" 
              name="location" 
              className="form-input" 
              value={formData.location} 
              onChange={handleChange} 
              disabled={saving}
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
                disabled={saving}
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
                disabled={saving}
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="form-group w-full">
              <label className="form-label" htmlFor="status">Status</label>
              <select 
                id="status" 
                name="status" 
                className="form-select" 
                value={formData.status} 
                onChange={handleChange}
                disabled={saving}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
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
              value={formData.description} 
              onChange={handleChange}
              disabled={saving}
            ></textarea>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-outline btn-md" disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-md" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIssuePage;
