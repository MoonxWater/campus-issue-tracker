import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Search, CheckCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="page home-page flex flex-col items-center justify-center text-center" style={{ minHeight: '75vh' }}>
      
      <div className="badge badge-open mb-4" style={{ padding: '6px 14px', fontSize: '13px' }}>
        v1.0 Now Live
      </div>
      
      <h1 style={{ fontSize: '3rem', maxWidth: '800px', color: 'var(--text-color)', marginBottom: '1rem', letterSpacing: '-1px' }}>
        A Better Way to Manage <span style={{ color: 'var(--primary-color)' }}>Campus Issues</span>
      </h1>
      
      <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Spotted a broken elevator, a leaky pipe, or internet downtime? Report it instantly and track the resolution progress in real-time.
      </p>
      
      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/create-issue" className="btn btn-primary btn-lg">
          Report an Issue
        </Link>
        <Link to="/issues" className="btn btn-outline btn-lg">
          View Issues
        </Link>
      </div>
      
      <div className="grid mt-8" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1000px', textAlign: 'left' }}>
        <div className="card">
          <ShieldAlert size={32} style={{ color: 'var(--danger-color)', marginBottom: '1rem' }} />
          <h3>Fast Reporting</h3>
          <p>Submit campus maintenance or IT issues in seconds with exact locations and details.</p>
        </div>
        <div className="card">
          <Search size={32} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
          <h3>Real-time Tracking</h3>
          <p>Follow the status of your reports from "Open" to "In Progress" and finally "Resolved".</p>
        </div>
        <div className="card">
          <CheckCircle size={32} style={{ color: 'var(--success-color)', marginBottom: '1rem' }} />
          <h3>Better Campus</h3>
          <p>Help the facility management team prioritize tasks and improve campus life for everyone.</p>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
