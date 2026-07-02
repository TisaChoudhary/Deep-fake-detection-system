import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { authService } from '../services/api';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        // Login validation
        if (!form.email || !form.password) {
          setToast({ message: 'Email and password required', type: 'error' });
          setLoading(false);
          return;
        }

        const data = await authService.login(form.email, form.password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToast({ message: 'Login successful!', type: 'success' });
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        // Signup validation
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
          setToast({ message: 'All fields are required', type: 'error' });
          setLoading(false);
          return;
        }

        if (form.password !== form.confirmPassword) {
          setToast({ message: 'Passwords do not match', type: 'error' });
          setLoading(false);
          return;
        }

        if (form.password.length < 6) {
          setToast({ message: 'Password must be at least 6 characters', type: 'error' });
          setLoading(false);
          return;
        }

        const data = await authService.register(form.name, form.email, form.password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToast({ message: 'Account created successfully!', type: 'success' });
        setTimeout(() => navigate('/dashboard'), 500);
      }
    } catch (err) {
      setToast({ message: err.error || 'Authentication failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setForm({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>Deep Fake Detection</h1>
          <p style={{ color: '#b7c2de', margin: 0 }}>
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de', fontSize: '0.9rem' }}>
                Full Name
              </label>
              <input 
                className="input"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de', fontSize: '0.9rem' }}>
              Email Address
            </label>
            <input 
              className="input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de', fontSize: '0.9rem' }}>
              Password
            </label>
            <input 
              className="input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleInputChange}
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b7c2de', fontSize: '0.9rem' }}>
                Confirm Password
              </label>
              <input 
                className="input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}

          <button 
            className="btn" 
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {loading ? 'Loading...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.5rem', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid rgba(255,255,255,0.12)',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#b7c2de' }}>
            {mode === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
          </p>
          <button 
            onClick={toggleMode}
            style={{
              background: 'none',
              border: 'none',
              color: '#7c3aed',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginTop: '0.5rem',
              textDecoration: 'underline'
            }}
          >
            {mode === 'login' ? 'Create Account' : 'Sign In'}
          </button>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(124, 58, 237, 0.1)',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#b7c2de'
        }}>
          <p style={{ margin: 0 }}>
            Demo credentials: test@example.com / password123
          </p>
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

export default AuthenticationPage;