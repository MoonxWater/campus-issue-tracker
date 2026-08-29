import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { HomePage, IssuesPage, IssueDetailPage, CreateIssuePage, NotFoundPage } from './pages';
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
          <Route path="/create-issue" element={<CreateIssuePage />} />
          <Route path="/report" element={<CreateIssuePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
