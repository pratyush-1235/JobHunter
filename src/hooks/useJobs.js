import { useState, useEffect } from 'react';
import { fetchAllJobs } from '../utils/jobFetcher';
import { scoreJob } from '../utils/jobMatcher';

export const useJobs = (resume) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const allJobs = await fetchAllJobs();
        if (resume) {
          const scoredJobs = allJobs.map((job) => ({
            ...job,
            score: scoreJob(resume, job),
          }));
          setJobs(scoredJobs.sort((a, b) => b.score - a.score));
        } else {
          setJobs(allJobs);
        }
      } catch (err) {
        setError(err.message);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [resume]);

  return { jobs, loading, error };
};
