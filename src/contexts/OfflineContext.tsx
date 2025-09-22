import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OfflineAction } from '../types';

interface OfflineContextType {
  isOnline: boolean;
  pendingActions: OfflineAction[];
  addAction: (action: Omit<OfflineAction, 'id' | 'timestamp' | 'synced'>) => void;
  syncPendingActions: () => Promise<void>;
  syncStatus: 'idle' | 'syncing' | 'completed' | 'error';
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

interface OfflineProviderProps {
  children: ReactNode;
}

export const OfflineProvider: React.FC<OfflineProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed' | 'error'>('idle');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending actions from localStorage
    const saved = localStorage.getItem('railtrace_pending_actions');
    if (saved) {
      setPendingActions(JSON.parse(saved));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Auto-sync when coming back online
    if (isOnline && pendingActions.length > 0) {
      syncPendingActions();
    }
  }, [isOnline]);

  const addAction = (action: Omit<OfflineAction, 'id' | 'timestamp' | 'synced'>) => {
    const newAction: OfflineAction = {
      ...action,
      id: `action_${Date.now()}`,
      timestamp: new Date(),
      synced: false
    };

    const updated = [...pendingActions, newAction];
    setPendingActions(updated);
    localStorage.setItem('railtrace_pending_actions', JSON.stringify(updated));
  };

  const syncPendingActions = async () => {
    if (!isOnline || pendingActions.length === 0) return;

    setSyncStatus('syncing');
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark all actions as synced
      const syncedActions = pendingActions.map(action => ({ ...action, synced: true }));
      setPendingActions([]);
      localStorage.removeItem('railtrace_pending_actions');
      
      setSyncStatus('completed');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const value = {
    isOnline,
    pendingActions,
    addAction,
    syncPendingActions,
    syncStatus
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};
