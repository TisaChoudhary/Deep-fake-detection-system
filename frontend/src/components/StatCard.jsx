// Statistics Card Component
const StatCard = ({ title, value, icon, color = '#7c3aed' }) => {
  return (
    <div className="card stat-card" style={{ 
      textAlign: 'center',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <h3 style={{ margin: '0.5rem 0', color }}>{value}</h3>
      <p style={{ margin: '0', color: '#b7c2de', fontSize: '0.9rem' }}>{title}</p>
    </div>
  );
};

export default StatCard;
