import React from 'react';
import JobCard from './JobCard';

const SavedJobsList = ({ jobs, resume }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No saved jobs yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job, idx) => (
        <JobCard
          key={job.id}
          job={job}
          resume={resume}
          index={idx}
        />
      ))}
    </div>
  );
};

export default SavedJobsList;
