import { useState } from 'react';

const Navbar = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.2)', marginBottom: '2rem' }}>
      <div className="brand">Deep Fake Detection</div>
      <div className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <a href="/dashboard" style={{ cursor: 'pointer' }}>Dashboard</a>
        <a href="/detect" style={{ cursor: 'pointer' }}>Detect</a>
        <a href="/history" style={{ cursor: 'pointer' }}>History</a>
        <a href="/profile" style={{ cursor: 'pointer' }}>Profile</a>
        <span style={{ fontSize: '0.9rem', color: '#b7c2de' }}>{user.name || 'User'}</span>
        <button 
          className="btn" 
          onClick={onLogout}
          style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
