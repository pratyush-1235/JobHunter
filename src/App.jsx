import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Results from './pages/Results';
import SavedJobs from './pages/SavedJobs';

function App() {
  const [page, setPage] = useState('landing');
  const [resume, setResume] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleResumeUpload = (parsedResume) => {
    setResume(parsedResume);
    setPage('results');
  };

  const handleBrowseAllJobs = () => {
    setResume(null);
    setPage('results');
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={isDarkTheme ? 'bg-dark-bg text-white' : 'bg-white text-dark-bg'}>
      <div className="gradient-mesh"></div>
      <div className="content-wrapper min-h-screen">
        {page === 'landing' && (
          <Landing
            onResumeUpload={handleResumeUpload}
            onBrowseAllJobs={handleBrowseAllJobs}
            isDarkTheme={isDarkTheme}
            onToggleTheme={toggleTheme}
          />
        )}
        {page === 'results' && (
          <Results
            resume={resume}
            onNavigateToSaved={() => setPage('saved')}
            onBackToLanding={() => setPage('landing')}
            isDarkTheme={isDarkTheme}
            onToggleTheme={toggleTheme}
          />
        )}
        {page === 'saved' && (
          <SavedJobs
            onBackToResults={() => setPage('results')}
            isDarkTheme={isDarkTheme}
            onToggleTheme={toggleTheme}
          />
        )}
      </div>
    </div>
  );
}

export default App;
