import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { issueService } from '../services';
import { MapPin, Clock, AlertTriangle, Plus } from 'lucide-react';

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = await issueService.getIssues();
      // Ensure we always have an array
      setIssues(Array.isArray(data) ? data : (data.issues || []));
      setError(null);
    } catch (err) {
      console.error('Failed to fetch issues:', err);
      // Fallback data for demonstration if backend is down
      if (err.message.includes('Network error') || err.message.includes('fetch')) {
        setError('Could not connect to the backend server. Showing sample data instead.');
        setIssues([
          { id: '1', title: 'Broken Elevator in Library', description: 'Main elevator on ground floor is out of service.', location: 'Main Library', category: 'Maintenance', status: 'Open', priority: 'High', created_at: new Date().toISOString() },
          { id: '2', title: 'Wi-Fi down in Student Center', description: 'No internet connection in the cafe area.', location: 'Student Center', category: 'IT', status: 'In Progress', priority: 'Urgent', created_at: new Date(Date.now() - 86400000).toISOString() },
          { id: '3', title: 'Leaky faucet in Restroom', description: 'Women\'s restroom sink is leaking continuously.', location: 'Building A, 2nd Floor', category: 'Plumbing', status: 'Resolved', priority: 'Normal', created_at: new Date(Date.now() - 172800000).toISOString() }
        ]);
      } else {
        setError('An error occurred while fetching issues.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'open') return <span className="badge badge-open">Open</span>;
    if (s === 'in progress') return <span className="badge badge-progress">In Progress</span>;
    if (s === 'resolved' || s === 'closed') return <span className="badge badge-resolved">{status}</span>;
    return <span className="badge">{status || 'Unknown'}</span>;
  };

  return (
    <div className="page issues-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 style={{ marginBottom: '8px' }}>Issue Dashboard</h1>
          <p style={{ margin: 0 }}>Track and manage all campus facility and IT reports.</p>
        </div>
        <Link to="/create-issue" className="btn btn-primary">
          <Plus size={18} />
          Report Issue
        </Link>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '16px', borderRadius: '8px', color: '#b91c1c', marginBottom: '24px' }}>
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} />
            <strong>Note:</strong> {error}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center" style={{ minHeight: '300px' }}>
          <p>Loading issues...</p>
        </div>
      ) : issues.length === 0 ? (
        <div className="card text-center" style={{ padding: '60px 20px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>No issues found</h3>
          <p>Everything looks good on campus! Or you can be the first to report something.</p>
          <Link to="/create-issue" className="btn btn-primary mt-4">Report an Issue</Link>
        </div>
      ) : (
        <div className="grid">
          {issues.map(issue => (
            <Link to={`/issues/${issue.id || issue._id}`} key={issue.id || issue._id} className="card flex flex-col" style={{ color: 'inherit' }}>
              <div className="flex justify-between items-center mb-4">
                {getStatusBadge(issue.status)}
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{issue.priority || 'Normal'} Priority</span>
              </div>
              
              <h3 style={{ fontSize: '18px', marginBottom: '8px', marginTop: 0 }}>{issue.title}</h3>
              <p style={{ fontSize: '14px', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {issue.description}
              </p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
                <div className="flex items-center gap-2 mb-2" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  <MapPin size={14} />
                  <span>{issue.location}</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  <Clock size={14} />
                  <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
