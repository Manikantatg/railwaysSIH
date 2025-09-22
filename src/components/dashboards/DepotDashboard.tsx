import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, Package, CheckCircle, XCircle, Truck, 
  Search, Filter, AlertTriangle, MapPin, Clock, Archive
} from 'lucide-react';
import Layout from '../common/Layout';
import BentoCard from '../common/BentoCard';
import { faker } from '@faker-js/faker';

const DepotDashboard: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  const stats = {
    pendingShipments: faker.number.int({ min: 3, max: 15 }),
    totalInventory: faker.number.int({ min: 500, max: 2500 }),
    acceptedToday: faker.number.int({ min: 5, max: 25 }),
    rejectedToday: faker.number.int({ min: 0, max: 5 }),
    lowStockAlerts: faker.number.int({ min: 2, max: 8 }),
    transfersPending: faker.number.int({ min: 1, max: 6 })
  };

  const pendingShipments = Array.from({ length: 10 }, (_, i) => ({
    id: faker.string.alphanumeric(8).toUpperCase(),
    batchId: faker.string.alphanumeric(8).toUpperCase(),
    vendor: faker.company.name(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    quantity: faker.number.int({ min: 50, max: 500 }),
    arrivalDate: faker.date.recent({ days: 5 }),
    carrier: faker.company.name(),
    status: faker.helpers.arrayElement(['in-transit', 'arrived', 'being-inspected']),
    priority: faker.helpers.arrayElement(['normal', 'urgent', 'critical'])
  }));

  const inventoryItems = Array.from({ length: 12 }, (_, i) => ({
    id: faker.string.alphanumeric(6).toUpperCase(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    vendor: faker.company.name(),
    quantity: faker.number.int({ min: 10, max: 300 }),
    location: faker.helpers.arrayElement(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
    lastUpdated: faker.date.recent({ days: 7 }),
    status: faker.helpers.arrayElement(['available', 'reserved', 'low-stock', 'out-of-stock']),
    warrantyExpiry: faker.date.future()
  }));

  const stockTransfers = Array.from({ length: 6 }, (_, i) => ({
    id: faker.string.alphanumeric(6).toUpperCase(),
    fromLocation: faker.location.city(),
    toLocation: faker.location.city(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    quantity: faker.number.int({ min: 10, max: 100 }),
    requestDate: faker.date.recent({ days: 3 }),
    status: faker.helpers.arrayElement(['pending', 'approved', 'in-transit', 'completed']),
    priority: faker.helpers.arrayElement(['normal', 'urgent'])
  }));

  const recentActivities = Array.from({ length: 8 }, (_, i) => {
    const activities = [
      'Shipment received and accepted',
      'Batch rejected due to quality issues',
      'Stock transfer completed',
      'QR code scanned for inspection',
      'Low stock alert triggered',
      'Inventory count updated',
      'Shipment inspection completed',
      'Transfer request approved'
    ];
    
    return {
      id: i + 1,
      activity: activities[i % activities.length],
      timestamp: faker.date.recent(),
      batchId: faker.string.alphanumeric(8).toUpperCase(),
      user: faker.person.fullName(),
      type: faker.helpers.arrayElement(['received', 'rejected', 'transferred', 'scanned'])
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'being-inspected': return 'bg-yellow-100 text-yellow-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-orange-100 text-orange-800';
      case 'low-stock': return 'bg-red-100 text-red-800';
      case 'out-of-stock': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAcceptShipment = (shipmentId: string) => {
    console.log(`Accepting shipment: ${shipmentId}`);
    // In real implementation, this would update blockchain and database
  };

  const handleRejectShipment = (shipmentId: string) => {
    console.log(`Rejecting shipment: ${shipmentId}`);
    // In real implementation, this would update blockchain and database
  };

  return (
    <Layout title="Depot Operations">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-min">
        {/* KPI Cards */}
        <BentoCard
          title="Pending Shipments"
          value={stats.pendingShipments}
          icon={Truck}
          color="orange"
          size="sm"
        />

        <BentoCard
          title="Total Inventory"
          value={stats.totalInventory.toLocaleString()}
          icon={Package}
          color="blue"
          size="sm"
        />

        <BentoCard
          title="Accepted Today"
          value={stats.acceptedToday}
          icon={CheckCircle}
          color="green"
          size="sm"
        />

        <BentoCard
          title="Rejected Today"
          value={stats.rejectedToday}
          icon={XCircle}
          color="red"
          size="sm"
        />

        <BentoCard
          title="Low Stock Alerts"
          value={stats.lowStockAlerts}
          icon={AlertTriangle}
          color="red"
          size="sm"
        />

        <BentoCard
          title="Transfers Pending"
          value={stats.transfersPending}
          icon={Archive}
          color="orange"
          size="sm"
        />

        {/* QR Scanner */}
        <BentoCard
          title="QR Code Scanner"
          icon={QrCode}
          color="blue"
          size="md"
        >
          <div className="space-y-3">
            <button 
              onClick={() => setShowScanner(true)}
              className="w-full bg-railway-blue text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan QR Code</span>
            </button>
            <div className="text-xs text-gray-500 text-center">
              Scan shipments for receiving or inspection
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-bold text-railway-blue">{faker.number.int({ min: 10, max: 50 })}</div>
                <div className="text-gray-600">Scanned Today</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="font-bold text-railway-success">{faker.number.int({ min: 100, max: 500 })}</div>
                <div className="text-gray-600">Total Scanned</div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Pending Shipments */}
        <BentoCard
          title="Pending Shipments"
          icon={Truck}
          color="orange"
          size="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {pendingShipments.slice(0, 6).map((shipment, index) => (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">#{shipment.id}</h4>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(shipment.priority)}`}></div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Batch: #{shipment.batchId} • {shipment.vendor}
                    </div>
                    <div className="text-xs text-gray-600">
                      {shipment.componentType} • {shipment.quantity} units
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Arrived: {shipment.arrivalDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => handleAcceptShipment(shipment.id)}
                      className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectShipment(shipment.id)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Inventory Overview */}
        <BentoCard
          title="Inventory Overview"
          icon={Package}
          color="blue"
          size="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {inventoryItems.slice(0, 8).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-blue-50 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{item.componentType}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Location: {item.location} • {item.vendor}
                    </div>
                    <div className="text-xs text-gray-500">
                      Updated: {item.lastUpdated.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-railway-blue">{item.quantity}</div>
                    <div className="text-xs text-gray-500">units</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Stock Transfers */}
        <BentoCard
          title="Stock Transfers"
          icon={Archive}
          color="gray"
          size="md"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {stockTransfers.map((transfer, index) => (
              <motion.div
                key={transfer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">#{transfer.id}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                        {transfer.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {transfer.componentType} • {transfer.quantity} units
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{transfer.fromLocation} → {transfer.toLocation}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {transfer.requestDate.toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Recent Activities */}
        <BentoCard
          title="Recent Activities"
          icon={Clock}
          color="gray"
          size="xl"
        >
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivities.map((activity, index) => {
              const typeColors = {
                received: 'bg-green-100 text-green-800',
                rejected: 'bg-red-100 text-red-800',
                transferred: 'bg-blue-100 text-blue-800',
                scanned: 'bg-yellow-100 text-yellow-800'
              };

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${
                    activity.type === 'received' ? 'bg-railway-success' :
                    activity.type === 'rejected' ? 'bg-railway-danger' :
                    activity.type === 'transferred' ? 'bg-railway-blue' : 'bg-railway-warning'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{activity.activity}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Batch: #{activity.batchId} • {activity.timestamp.toLocaleTimeString()} • {activity.user}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[activity.type]}`}>
                    {activity.type}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </BentoCard>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">QR Code Scanner</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Point camera at QR code</p>
                <p className="text-sm text-gray-500 mt-2">Scanner simulation active</p>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Instructions:</strong></p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Hold device steady</li>
                  <li>Ensure good lighting</li>
                  <li>Keep QR code within frame</li>
                </ul>
              </div>
              <button
                onClick={() => setShowScanner(false)}
                className="w-full px-4 py-2 bg-railway-blue text-white rounded-lg hover:bg-blue-700"
              >
                Close Scanner
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default DepotDashboard;
