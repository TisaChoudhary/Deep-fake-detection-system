import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import { detectionService } from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, real: 0, fake: 0 });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await detectionService.getHistory();
      setHistory(data);
      
      // Calculate stats
      const real = data.filter(h => h.prediction === 'Real').length;
      const fake = data.filter(h => h.prediction === 'Fake').length;
      setStats({ total: data.length, real, fake });
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const recentDetections = history.slice(0, 5);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Navbar onLogout={handleLogout} />

      <section className="section">
        <h1>Welcome, {user.name || 'User'}! 👋</h1>
        <p style={{ color: '#b7c2de', fontSize: '1.1rem' }}>
          Monitor your deepfake detection results and analyze media for synthetic signs.
        </p>
      </section>

      <section className="section">
        <h2>Statistics Overview</h2>
        <div className="grid grid-3">
          <StatCard 
            title="Total Detections" 
            value={stats.total} 
            icon="📊"
            color="#7c3aed"
          />
          <StatCard 
            title="Real Media" 
            value={stats.real} 
            icon="✓"
            color="#10b981"
          />
          <StatCard 
            title="Deepfakes Detected" 
            value={stats.fake} 
            icon="⚠️"
            color="#ef4444"
          />
        </div>
      </section>

      <section className="section">
        <div className="grid grid-2" style={{ gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3>Analyze New Media</h3>
            <p style={{ color: '#b7c2de', marginBottom: '1rem' }}>
              Upload an image or video to detect deepfakes using AI
            </p>
            <Link to="/detect" className="btn">Start Detection</Link>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3>Recent Detections</h3>
            {recentDetections.length > 0 ? (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {recentDetections.map((detection) => (
                  <div key={detection.id} style={{
                    padding: '0.8rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.9rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>
                          {detection.file_type.toUpperCase()}
                        </p>
                        <p style={{ margin: '0.3rem 0', color: '#b7c2de', fontSize: '0.85rem' }}>
                          {detection.filename}
                        </p>
                      </div>
                      <div style={{
                        background: detection.prediction === 'Real' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: detection.prediction === 'Real' ? '#10b981' : '#ef4444',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}>
                        {detection.prediction}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#b7c2de', textAlign: 'center', padding: '2rem 0' }}>
                No detections yet. Start by uploading media!
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid grid-2" style={{ gap: '2rem' }}>
          <Link to="/history" className="card" style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer', textDecoration: 'none' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
            <h3>View Full History</h3>
            <p style={{ color: '#b7c2de' }}>All your detection results</p>
          </Link>
          <Link to="/profile" className="card" style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer', textDecoration: 'none' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
            <h3>Profile Settings</h3>
            <p style={{ color: '#b7c2de' }}>Manage account</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;