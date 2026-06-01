const fetchRemotive = async () => {
  try {
    const response = await fetch('https://remotive.com/api/remote-jobs?limit=100');
    const data = await response.json();
    return (data.jobs || []).map((job, idx) => ({
      id: `remotive-${idx}`,
      title: job.title || '',
      company: job.company_name || '',
      url: job.url || '',
      tags: job.tag_keys || [],
      jobType: 'full-time',
      salary: job.salary ? `${job.salary}` : '',
      location: job.job_from_anywhere_in_country ? 'Worldwide' : job.candidate_required_location || 'Remote',
      source: 'Remotive',
      postedAt: job.published_at || new Date().toISOString(),
      isInternship: (job.title || '').toLowerCase().includes('intern'),
      isFresher: (job.title || '').toLowerCase().includes('junior') || (job.title || '').toLowerCase().includes('entry'),
    }));
  } catch (error) {
    console.error('Error fetching from Remotive:', error);
    return [];
  }
};

const fetchRemoteOK = async () => {
  try {
    const response = await fetch('https://remoteok.com/api', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const data = await response.json();
    return (data.slice(1) || []).map((job, idx) => ({
      id: `remoteok-${idx}`,
      title: job.title || '',
      company: job.company || '',
      url: job.url || '',
      tags: (job.tags || []).split(',').map((t) => t.trim()),
      jobType: job.jobType || 'full-time',
      salary: job.salary ? `${job.salary}` : '',
      location: 'Remote',
      source: 'RemoteOK',
      postedAt: job.date || new Date().toISOString(),
      isInternship: (job.title || '').toLowerCase().includes('intern'),
      isFresher: (job.title || '').toLowerCase().includes('junior') || (job.title || '').toLowerCase().includes('entry'),
    }));
  } catch (error) {
    console.error('Error fetching from RemoteOK:', error);
    return [];
  }
};

const fetchArbeitnow = async () => {
  try {
    const response = await fetch('https://arbeitnow.com/api/job-board-api');
    const data = await response.json();
    return (data.data || []).map((job, idx) => ({
      id: `arbeitnow-${idx}`,
      title: job.title || '',
      company: job.company_name || '',
      url: job.url || '',
      tags: job.tags || [],
      jobType: 'full-time',
      salary: job.salary ? `${job.salary}` : '',
      location: job.job_type === 'Remote' ? 'Remote' : job.location || 'Remote',
      source: 'Arbeitnow',
      postedAt: job.posted_at || new Date().toISOString(),
      isInternship: (job.title || '').toLowerCase().includes('intern'),
      isFresher: (job.title || '').toLowerCase().includes('junior') || (job.title || '').toLowerCase().includes('entry'),
    }));
  } catch (error) {
    console.error('Error fetching from Arbeitnow:', error);
    return [];
  }
};

const fetchJobicy = async () => {
  try {
    const response = await fetch('https://jobicy.com/api/v2/remote-jobs?count=50&geo=worldwide');
    const data = await response.json();
    return (data.jobs || []).map((job, idx) => ({
      id: `jobicy-${idx}`,
      title: job.jobTitle || '',
      company: job.companyName || '',
      url: job.jobLink || '',
      tags: job.jobTags || [],
      jobType: job.jobType || 'full-time',
      salary: job.salary ? `${job.salary}` : '',
      location: job.jobGeo || 'Remote',
      source: 'Jobicy',
      postedAt: job.postedOn || new Date().toISOString(),
      isInternship: (job.jobTitle || '').toLowerCase().includes('intern'),
      isFresher: (job.jobTitle || '').toLowerCase().includes('junior') || (job.jobTitle || '').toLowerCase().includes('entry'),
    }));
  } catch (error) {
    console.error('Error fetching from Jobicy:', error);
    return [];
  }
};

const deduplicateJobs = (jobs) => {
  const seen = new Set();
  return jobs.filter((job) => {
    const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const fetchAllJobs = async () => {
  const results = await Promise.allSettled([
    fetchRemotive(),
    fetchRemoteOK(),
    fetchArbeitnow(),
    fetchJobicy(),
  ]);

  const jobs = results
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value);

  return deduplicateJobs(jobs);
};
