// Toast Notification Component
import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b'
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      background: `rgba(0,0,0,0.9)`,
      border: `2px solid ${colors[type]}`,
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      color: 'white',
      zIndex: 2000,
      animation: 'slideIn 0.3s ease-out'
    }}>
      {message}
      <style>{`
        @keyframes slideIn {
          from { 
            transform: translateX(400px); 
            opacity: 0;
          }
          to { 
            transform: translateX(0); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
