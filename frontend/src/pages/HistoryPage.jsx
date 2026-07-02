import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { detectionService } from '../services/api';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await detectionService.getHistory();
      setHistory(data);
    } catch (error) {
      setToast({ message: 'Failed to load history', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      await detectionService.deleteHistory(id);
      setHistory(history.filter(h => h.id !== id));
      setToast({ message: 'Entry deleted successfully', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to delete entry', type: 'error' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  // Filter history
  let filteredHistory = history;
  
  if (filter !== 'all') {
    filteredHistory = filteredHistory.filter(h => h.prediction === filter);
  }
  
  if (search) {
    filteredHistory = filteredHistory.filter(h => 
      h.filename.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Navbar onLogout={handleLogout} />

      <section className="section">
        <h2>Detection History</h2>
        <p style={{ color: '#b7c2de' }}>View and manage your past deepfake detection results</p>
      </section>

      {/* Filters */}
      <section className="section">
        <div className="grid grid-2" style={{ gap: '1rem' }}>
          <input 
            className="input"
            type="text"
            placeholder="Search by filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Results</option>
            <option value="Real">Real Only</option>
            <option value="Fake">Fake Only</option>
          </select>
        </div>
      </section>

      {/* History List */}
      <section className="section">
        {loading ? (
          <p style={{ textAlign: 'center', color: '#b7c2de' }}>Loading history...</p>
        ) : filteredHistory.length === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#b7c2de', fontSize: '1.1rem' }}>
              No detection history found.
            </p>
            <p style={{ color: '#b7c2de' }}>
              Start by uploading media to see your results here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredHistory.map((entry) => (
              <div key={entry.id} className="card" style={{ padding: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                      {entry.filename}
                    </p>
                    <p style={{ margin: '0.3rem 0', color: '#b7c2de', fontSize: '0.9rem' }}>
                      Type: <span style={{ textTransform: 'uppercase' }}>{entry.file_type}</span> • 
                      Processed: {new Date(entry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      background: entry.prediction === 'Real' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: entry.prediction === 'Real' ? '#10b981' : '#ef4444',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 'bold'
                    }}>
                      {entry.prediction}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontSize: '0.9rem', color: '#b7c2de' }}>Confidence</span>
                    </p>
                    <p style={{ margin: '0.3rem 0', fontWeight: 'bold', color: '#06b6d4' }}>
                      {entry.confidence}%
                    </p>
                  </div>

                  <button 
                    onClick={() => handleDelete(entry.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.5)',
                      color: '#ef4444',
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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

export default HistoryPage;