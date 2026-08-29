import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { HomePage, IssuesPage, IssueDetailPage, CreateIssuePage, NotFoundPage, AdminLoginPage, EditIssuePage } from './pages';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

/**
 * App Component - Root Component & Routing Foundation
 * 
 * Provides layout wrapping and route resolution foundation for the Campus Issue Tracker.
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="/issues/:id" element={<IssueDetailPage />} />
          <Route path="/issues/:id/edit" element={<EditIssuePage />} />
          <Route path="/create-issue" element={<CreateIssuePage />} />
          <Route path="/report" element={<CreateIssuePage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Analytics />
    </Router>
  );
}

export default App;
