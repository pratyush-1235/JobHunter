import React, { useState } from 'react';
import ResumeUpload from '../components/ResumeUpload';

const Landing = ({
  onResumeUpload,
  onBrowseAllJobs,
  isDarkTheme,
  onToggleTheme,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary font-mono">ResumeMatch Jobs</h1>
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition"
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 font-mono">
              Upload your resume.
              <br />
              <span className="text-primary">Discover remote jobs made for you.</span>
            </h2>
            <p className="text-gray-400 text-lg">No signup. No fees. Pure browser magic.</p>
          </div>

          <ResumeUpload onResumeUpload={onResumeUpload} onLoading={setLoading} />

          {loading && (
            <div className="text-center mt-8">
              <div className="inline-block">
                <div className="animate-spin text-3xl">⚙️</div>
              </div>
              <p className="text-gray-400 mt-2">Parsing your resume...</p>
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={onBrowseAllJobs}
              className="text-primary hover:text-primary/80 transition text-sm font-bold"
            >
              Or skip upload and browse all jobs →
            </button>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>100% in-browser. Your resume is never uploaded to any server.</p>
      </footer>
    </div>
  );
};

export default Landing;
