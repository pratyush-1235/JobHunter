import React, { useState, useRef } from 'react';
import { useResume } from '../hooks/useResume';

const ResumeUpload = ({ onResumeUpload, onLoading }) => {
  const { uploadResume, loading, error } = useResume();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      alert('Please upload a PDF or DOCX file.');
      return;
    }
    try {
      onLoading?.(true);
      const parsed = await uploadResume(file);
      onResumeUpload(parsed);
    } catch (err) {
      alert('Error parsing resume: ' + err.message);
    } finally {
      onLoading?.(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`glass-card p-12 text-center cursor-pointer transition-all ${dragActive ? 'border-primary bg-primary/10' : 'border-transparent'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="w-full"
        >
          <div className="mb-4 text-4xl">📄</div>
          <h3 className="text-xl font-bold mb-2">Upload Your Resume</h3>
          <p className="text-gray-400 mb-4">Drag and drop your PDF or DOCX file here</p>
          <p className="text-sm text-gray-500">or click to browse</p>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;
