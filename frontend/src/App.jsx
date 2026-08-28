import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { HomePage, IssuesPage, IssueDetailPage, CreateIssuePage, NotFoundPage } from './pages';
import './App.css';

/**
 * App Component - Root Component & Routing Foundation
 * 
 * Provides layout wrapping and route resolution foundation for the Campus Issue Tracker.
 */
function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Simple, robust client-side routing resolution
  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath === '/issues') {
      return <IssuesPage />;
    }
    if (currentPath.startsWith('/issues/')) {
      return <IssueDetailPage />;
    }
    if (currentPath === '/create-issue' || currentPath === '/report') {
      return <CreateIssuePage />;
    }
    return <NotFoundPage />;
  };

  return (
    <Layout>
      {renderRoute()}
    </Layout>
  );
}

export default App;
