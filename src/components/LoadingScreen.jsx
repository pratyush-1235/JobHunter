import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ resume }) => {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('');

  const steps = [
    { icon: '📄', text: 'Parsing resume...' },
    { icon: '🌍', text: 'Fetching jobs from Remotive...' },
    { icon: '🔗', text: 'Fetching from RemoteOK...' },
    { icon: '💼', text: 'Fetching from Arbeitnow...' },
    { icon: '🎯', text: 'Fetching from Jobicy...' },
    { icon: '🤖', text: 'Scoring jobs for you...' },
  ];

  const messages = [
    'Scanning skills...',
    'Extracting experience...',
    'Analyzing education...',
    'Building your match profile...',
    'Almost done...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="mb-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 mb-4 transition-all ${
                i <= step ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <span className="text-3xl">{i <= step ? '✅' : s.icon}</span>
              <span className={i <= step ? 'text-primary font-bold' : 'text-gray-400'}>
                {s.text}
              </span>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-8 h-6">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
