import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OfflineProvider } from './contexts/OfflineContext';
import Login from './components/auth/Login';
import AdminDashboard from './components/dashboards/AdminDashboard';
import VendorDashboard from './components/dashboards/VendorDashboard';
import DepotDashboard from './components/dashboards/DepotDashboard';
import EngineerDashboard from './components/dashboards/EngineerDashboard';
import InspectorDashboard from './components/dashboards/InspectorDashboard';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-railway-blue mx-auto mb-4"></div>
          <p className="text-railway-gray">Loading RailTrace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'depot':
        return <DepotDashboard />;
      case 'engineer':
        return <EngineerDashboard />;
      case 'inspector':
        return <InspectorDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={getDashboardComponent()} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <OfflineProvider>
        <Router>
          <AppRoutes />
        </Router>
      </OfflineProvider>
    </AuthProvider>
  );
};

export default App;
