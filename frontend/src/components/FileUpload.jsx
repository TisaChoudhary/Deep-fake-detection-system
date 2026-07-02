// File Upload Component with Drag and Drop
import { useState } from 'react';

const FileUpload = ({ onFileSelect, accept = '*/*', maxSize = 50 }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: isDragging ? '3px dashed #7c3aed' : '2px dashed #404d73',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: isDragging ? 'rgba(124, 58, 237, 0.1)' : 'transparent'
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📁</div>
      <p>Drag and drop your file here, or click to select</p>
      <p style={{ fontSize: '0.9rem', color: '#b7c2de' }}>Max size: {maxSize}MB</p>
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        style={{ display: 'none' }}
        id="file-input"
      />
      <button 
        className="btn" 
        type="button"
        onClick={handleBrowseClick}
      >
        Browse Files
      </button>
    </div>
  );
};

export default FileUpload;
