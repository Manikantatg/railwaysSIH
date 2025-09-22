export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
}

export type UserRole = 'admin' | 'vendor' | 'depot' | 'engineer' | 'inspector';

export interface Component {
  id: string;
  qrCode: string;
  type: ComponentType;
  batchId: string;
  vendorId: string;
  manufacturingDate: Date;
  status: ComponentStatus;
  currentLocation?: string;
  lifecycle: LifecycleEvent[];
  warrantyExpiry: Date;
  aiHealthScore?: number;
}

export type ComponentType = 'clip' | 'pad' | 'liner' | 'sleeper';
export type ComponentStatus = 'manufactured' | 'in-transit' | 'in-stock' | 'installed' | 'inspected' | 'defective' | 'retired';

export interface LifecycleEvent {
  id: string;
  componentId: string;
  eventType: LifecycleEventType;
  timestamp: Date;
  userId: string;
  location?: string;
  notes?: string;
  mediaUrls?: string[];
  blockchainHash?: string;
}

export type LifecycleEventType = 'manufactured' | 'shipped' | 'received' | 'installed' | 'inspected' | 'replaced' | 'retired';

export interface Batch {
  id: string;
  vendorId: string;
  componentType: ComponentType;
  quantity: number;
  manufacturingDate: Date;
  qualityCertificate?: string;
  components: string[];
  status: 'pending' | 'shipped' | 'delivered' | 'accepted' | 'rejected';
}

export interface AIInsight {
  type: 'vendor_ranking' | 'failure_prediction' | 'health_score' | 'anomaly_detection';
  data: any;
  confidence: number;
  timestamp: Date;
}

export interface OfflineAction {
  id: string;
  type: string;
  data: any;
  timestamp: Date;
  synced: boolean;
}
