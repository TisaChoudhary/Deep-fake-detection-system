import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    setToast({ message: 'Profile update feature coming soon', type: 'info' });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match', type: 'error' });
      return;
    }

    if (formData.newPassword.length < 6) {
      setToast({ message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    // TODO: Implement password change API call
    setToast({ message: 'Password change feature coming soon', type: 'info' });
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Navbar onLogout={handleLogout} />

      <section className="section">
        <h2>Account Profile</h2>
        <p style={{ color: '#b7c2de' }}>Manage your account settings and preferences</p>
      </section>

      <section className="grid grid-2" style={{ gap: '2rem' }}>
        {/* Profile Information */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3>Profile Information</h3>
          <form onSubmit={handleUpdateProfile}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de' }}>Full Name</label>
              <input 
                className="input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de' }}>Email</label>
              <input 
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                disabled
              />
              <p style={{ fontSize: '0.85rem', color: '#b7c2de', margin: '0.3rem 0 0' }}>
                Email cannot be changed
              </p>
            </div>

            <button className="btn" type="submit">
              Update Profile
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de' }}>Current Password</label>
              <input 
                className="input"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de' }}>New Password</label>
              <input 
                className="input"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de' }}>Confirm Password</label>
              <input 
                className="input"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>

            <button className="btn" type="submit">
              Change Password
            </button>
          </form>
        </div>
      </section>

      {/* Account Statistics */}
      <section className="section">
        <div className="grid grid-3">
          <div className="card" style={{ padding: '1.2rem', textAlign: 'center' }}>
            <p style={{ color: '#b7c2de', fontSize: '0.9rem' }}>Account Created</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="card" style={{ padding: '1.2rem', textAlign: 'center' }}>
            <p style={{ color: '#b7c2de', fontSize: '0.9rem' }}>Member Since</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              Active
            </p>
          </div>
          <div className="card" style={{ padding: '1.2rem', textAlign: 'center' }}>
            <p style={{ color: '#b7c2de', fontSize: '0.9rem' }}>Account Status</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#10b981' }}>
              ✓ Verified
            </p>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="section">
        <div className="card" style={{ padding: '2rem', borderLeft: '4px solid #ef4444' }}>
          <h3 style={{ color: '#ef4444' }}>Danger Zone</h3>
          <p style={{ color: '#b7c2de', marginBottom: '1rem' }}>
            These actions are permanent and cannot be undone.
          </p>
          <button 
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #ef4444',
              color: '#ef4444',
              padding: '0.8rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={() => setToast({ message: 'Account deletion feature coming soon', type: 'info' })}
          >
            Delete Account
          </button>
        </div>
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

export default ProfilePage;