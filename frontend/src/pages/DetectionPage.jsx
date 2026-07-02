import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import ProgressLoader from '../components/ProgressLoader';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import { detectionService } from '../services/api';

const DetectionPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
    setResult(null);
  };

  const handleDetect = async (e) => {
    e.preventDefault();
    if (!file) {
      setToast({ message: 'Please select a file', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      let detectionResult;
      if (mediaType === 'image') {
        detectionResult = await detectionService.detectImage(file);
      } else {
        detectionResult = await detectionService.detectVideo(file);
      }
      
      setResult(detectionResult);
      setToast({ message: 'Detection completed successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: error.error || 'Detection failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;
    // TODO: Implement PDF report download
    setToast({ message: 'Report download feature coming soon', type: 'info' });
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Navbar onLogout={handleLogout} />
      
      <ProgressLoader isLoading={loading} message="Analyzing media..." />

      <div className="grid grid-2" style={{ gap: '2rem' }}>
        {/* Upload Section */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2>Upload Media for Detection</h2>
          <form onSubmit={handleDetect}>
            <select 
              className="input" 
              value={mediaType} 
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

            <FileUpload 
              onFileSelect={handleFileSelect}
              accept={mediaType === 'image' ? 'image/*' : 'video/*'}
              maxSize={mediaType === 'image' ? 10 : 100}
            />

            {file && <p style={{ marginTop: '1rem', color: '#10b981' }}>✓ {file.name}</p>}
            
            <button className="btn" type="submit" disabled={loading || !file}>
              {loading ? 'Analyzing...' : 'Run Detection'}
            </button>
          </form>
        </div>

        {/* Preview & Results Section */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2>Preview & Results</h2>
          
          {preview && (
            <div style={{
              width: '100%',
              maxHeight: '300px',
              marginBottom: '1rem',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.3)'
            }}>
              {mediaType === 'image' ? (
                <img src={preview} alt="preview" style={{ width: '100%', height: 'auto' }} />
              ) : (
                <video src={preview} style={{ width: '100%', height: 'auto' }} />
              )}
            </div>
          )}

          {result && (
            <div style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '1.2rem', borderRadius: '12px' }}>
              <h3>Detection Result</h3>
              
              <div style={{ margin: '1rem 0' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Prediction:</strong>
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  color: result.prediction === 'Fake' ? '#ef4444' : '#10b981',
                  fontWeight: 'bold'
                }}>
                  {result.prediction}
                </p>
              </div>

              <div style={{ margin: '1rem 0' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Confidence: {result.confidence}%</strong>
                </p>
                <div style={{
                  width: '100%',
                  height: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${result.confidence}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${result.confidence > 80 ? '#ef4444' : '#f59e0b'}, ${result.confidence > 80 ? '#dc2626' : '#d97706'})`
                  }} />
                </div>
              </div>

              <div style={{ margin: '1rem 0' }}>
                <p><strong>Processing Time:</strong> {result.processing_time}s</p>
              </div>

              <div style={{ margin: '1rem 0' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong>AI Explanation:</strong></p>
                <p style={{ color: '#b7c2de', fontSize: '0.95rem' }}>
                  {result.explanation}
                </p>
              </div>

              <button className="btn" onClick={downloadReport} style={{ marginTop: '1rem' }}>
                Download Report
              </button>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DetectionPage;