import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import AuthenticationPage from './pages/AuthenticationPage';
import DetectionPage from './pages/DetectionPage';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={token ? <Navigate to="/dashboard" /> : <AuthenticationPage />} />
        <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/auth" />} />
        <Route path="/detect" element={token ? <DetectionPage /> : <Navigate to="/auth" />} />
        <Route path="/history" element={token ? <HistoryPage /> : <Navigate to="/auth" />} />
        <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;