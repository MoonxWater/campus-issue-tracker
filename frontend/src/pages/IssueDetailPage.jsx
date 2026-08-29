import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { issueService } from '../services';
import { ArrowLeft, MapPin, Calendar, Clock, Tag } from 'lucide-react';

const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true);
        const data = await issueService.getIssueById(id);
        setIssue(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching issue:', err);
        // Fallback demo data
        if (err.message.includes('Network error') || err.message.includes('fetch')) {
          setIssue({ 
            id: id, 
            title: 'Sample Issue View', 
            description: 'This is a sample description because the backend is not connected. If the backend was working, this would show the details for issue ' + id, 
            location: 'Campus Ground', 
            category: 'Maintenance', 
            status: 'Open', 
            priority: 'High', 
            created_at: new Date().toISOString() 
          });
        } else {
          setError('Failed to load issue details.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'open') return <span className="badge badge-open">Open</span>;
    if (s === 'in progress') return <span className="badge badge-progress">In Progress</span>;
    if (s === 'resolved' || s === 'closed') return <span className="badge badge-resolved">{status}</span>;
    return <span className="badge">{status || 'Unknown'}</span>;
  };

  if (loading) {
    return <div className="flex justify-center items-center" style={{ minHeight: '50vh' }}>Loading issue details...</div>;
  }

  if (error || !issue) {
    return (
      <div className="card text-center" style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ color: 'var(--danger-color)' }}>Error</h3>
        <p>{error || 'Issue not found'}</p>
        <button onClick={() => navigate('/issues')} className="btn btn-primary mt-4">Back to Issues</button>
      </div>
    );
  }

  return (
    <div className="page issue-detail-page">
      <div className="mb-6">
        <Link to="/issues" className="flex items-center gap-2" style={{ color: 'var(--text-muted)', display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      <div className="card" style={{ padding: '40px' }}>
        <div className="flex justify-between items-start mb-6 border-b pb-6" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              {getStatusBadge(issue.status)}
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-color)' }}>{issue.priority || 'Normal'} Priority</span>
            </div>
            <h1 style={{ fontSize: '28px', margin: 0 }}>{issue.title}</h1>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              <Calendar size={16} />
              <span>Reported: {new Date(issue.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              <Clock size={16} />
              <span>{new Date(issue.created_at).toLocaleTimeString()}</span>
            </div>
            
            {localStorage.getItem('adminPassword') && (
              <div className="flex gap-2 mt-4">
                <Link to={`/issues/${id}/edit`} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>
                  Edit
                </Link>
                <button 
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this issue?')) {
                      try {
                        await issueService.deleteIssue(id);
                        navigate('/issues');
                      } catch (err) {
                        alert(err.message || 'Failed to delete issue');
                      }
                    }
                  }} 
                  className="btn" 
                  style={{ padding: '6px 12px', fontSize: '13px', background: 'var(--danger-color)', color: 'white' }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8 mb-8" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
          <div className="flex items-center gap-3">
            <div style={{ background: 'var(--background-color)', padding: '10px', borderRadius: '8px' }}>
              <MapPin size={20} style={{ color: 'var(--primary-color)' }} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Location</div>
              <div style={{ fontWeight: 500 }}>{issue.location}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div style={{ background: 'var(--background-color)', padding: '10px', borderRadius: '8px' }}>
              <Tag size={20} style={{ color: 'var(--primary-color)' }} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Category</div>
              <div style={{ fontWeight: 500 }}>{issue.category || 'General'}</div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Description</h3>
          <div style={{ lineHeight: '1.8', color: 'var(--text-color)', background: 'var(--background-color)', padding: '24px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
            {issue.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;
