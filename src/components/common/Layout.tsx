import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useOffline } from '../../contexts/OfflineContext';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const { isOnline, pendingActions, syncStatus, syncPendingActions } = useOffline();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-inter font-bold text-railway-blue">RailTrace</h1>
              <span className="ml-3 text-sm text-railway-gray capitalize">{user?.role} Dashboard</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Connectivity Status */}
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="w-5 h-5 text-railway-success" />
                ) : (
                  <WifiOff className="w-5 h-5 text-railway-danger" />
                )}
                <span className="text-sm text-railway-gray">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>

              {/* Sync Status */}
              {pendingActions.length > 0 && (
                <button
                  onClick={syncPendingActions}
                  disabled={!isOnline || syncStatus === 'syncing'}
                  className="flex items-center space-x-2 px-3 py-1 bg-railway-orange text-white rounded-md text-sm hover:bg-orange-600 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                  <span>{pendingActions.length} pending</span>
                </button>
              )}

              {/* Notifications */}
              <button className="relative p-2 text-railway-gray hover:text-railway-blue">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-railway-danger rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-railway-gray hover:text-railway-blue"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user?.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-inter font-bold text-gray-900 mb-8">{title}</h2>
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
