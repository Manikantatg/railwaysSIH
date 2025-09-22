import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, MapPin, Calendar, Clock, Wrench, 
  CheckCircle, AlertTriangle, Navigation, Camera, Upload
} from 'lucide-react';
import Layout from '../common/Layout';
import BentoCard from '../common/BentoCard';
import { faker } from '@faker-js/faker';

const EngineerDashboard: React.FC = () => {
  const [showInstallForm, setShowInstallForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  const stats = {
    installationsToday: faker.number.int({ min: 2, max: 12 }),
    installationsThisWeek: faker.number.int({ min: 15, max: 45 }),
    pendingInstallations: faker.number.int({ min: 3, max: 15 }),
    completedInstallations: faker.number.int({ min: 100, max: 500 }),
    offlineActions: faker.number.int({ min: 0, max: 8 }),
    averageInstallTime: faker.number.int({ min: 15, max: 45 })
  };

  const pendingInstallations = Array.from({ length: 8 }, (_, i) => ({
    id: faker.string.alphanumeric(8).toUpperCase(),
    componentId: faker.string.alphanumeric(8).toUpperCase(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    location: faker.location.streetAddress(),
    trackSection: faker.helpers.arrayElement(['A1', 'B2', 'C3', 'D4', 'E5']),
    scheduledDate: faker.date.future(),
    priority: faker.helpers.arrayElement(['normal', 'urgent', 'critical']),
    estimatedDuration: faker.number.int({ min: 15, max: 60 }),
    workOrder: faker.string.alphanumeric(6).toUpperCase()
  }));

  const recentInstallations = Array.from({ length: 10 }, (_, i) => ({
    id: faker.string.alphanumeric(8).toUpperCase(),
    componentId: faker.string.alphanumeric(8).toUpperCase(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    location: faker.location.streetAddress(),
    installDate: faker.date.recent({ days: 30 }),
    duration: faker.number.int({ min: 10, max: 50 }),
    status: faker.helpers.arrayElement(['completed', 'needs-inspection', 'documented']),
    gpsCoordinates: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude()
    },
    photos: faker.number.int({ min: 1, max: 5 })
  }));

  const workOrders = Array.from({ length: 6 }, (_, i) => ({
    id: faker.string.alphanumeric(6).toUpperCase(),
    title: faker.helpers.arrayElement([
      'Replace damaged rail clips',
      'Install new sleeper pads',
      'Upgrade track liners',
      'Emergency clip replacement',
      'Routine sleeper maintenance',
      'Track section refurbishment'
    ]),
    location: faker.location.streetAddress(),
    assignedDate: faker.date.recent({ days: 7 }),
    dueDate: faker.date.future(),
    priority: faker.helpers.arrayElement(['normal', 'urgent', 'critical']),
    status: faker.helpers.arrayElement(['assigned', 'in-progress', 'completed', 'on-hold']),
    estimatedComponents: faker.number.int({ min: 5, max: 50 })
  }));

  const gpsHistory = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    timestamp: faker.date.recent({ days: 7 }),
    location: faker.location.streetAddress(),
    coordinates: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude()
    },
    activity: faker.helpers.arrayElement(['installation', 'inspection', 'maintenance', 'travel']),
    duration: faker.number.int({ min: 5, max: 120 })
  }));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'documented': return 'bg-green-100 text-green-800';
      case 'in-progress': case 'needs-inspection': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
          // Use mock location for demo
          setCurrentLocation({
            lat: faker.location.latitude(),
            lng: faker.location.longitude()
          });
        }
      );
    }
  };

  const startInstallation = (componentId: string) => {
    getCurrentLocation();
    setShowInstallForm(true);
  };

  return (
    <Layout title="Field Engineering">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-min">
        {/* KPI Cards */}
        <BentoCard
          title="Today's Installations"
          value={stats.installationsToday}
          icon={Wrench}
          color="blue"
          size="sm"
        />

        <BentoCard
          title="This Week"
          value={stats.installationsThisWeek}
          icon={Calendar}
          color="green"
          size="sm"
        />

        <BentoCard
          title="Pending Work"
          value={stats.pendingInstallations}
          icon={Clock}
          color="orange"
          size="sm"
        />

        <BentoCard
          title="Total Completed"
          value={stats.completedInstallations}
          icon={CheckCircle}
          color="green"
          size="sm"
        />

        <BentoCard
          title="Offline Actions"
          value={stats.offlineActions}
          icon={Upload}
          color="red"
          size="sm"
        />

        <BentoCard
          title="Avg Install Time"
          value={`${stats.averageInstallTime}m`}
          icon={Clock}
          color="blue"
          size="sm"
        />

        {/* Installation Tools */}
        <BentoCard
          title="Installation Tools"
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
              <span>Scan Component</span>
            </button>
            <button 
              onClick={getCurrentLocation}
              className="w-full border border-railway-blue text-railway-blue py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Get GPS Location</span>
            </button>
            {currentLocation && (
              <div className="text-xs text-gray-600 p-2 bg-blue-50 rounded">
                <div className="font-medium">Current Location:</div>
                <div>Lat: {currentLocation.lat.toFixed(6)}</div>
                <div>Lng: {currentLocation.lng.toFixed(6)}</div>
              </div>
            )}
          </div>
        </BentoCard>

        {/* Quick Actions */}
        <BentoCard
          title="Quick Actions"
          icon={Wrench}
          color="green"
          size="md"
        >
          <div className="space-y-3">
            <button className="w-full bg-railway-success text-white py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Photo Documentation</span>
            </button>
            <button className="w-full border border-railway-success text-railway-success py-2 rounded-lg text-sm hover:bg-green-50 transition-colors">
              Log Maintenance
            </button>
            <button className="w-full border border-railway-orange text-railway-orange py-2 rounded-lg text-sm hover:bg-orange-50 transition-colors">
              Report Issue
            </button>
          </div>
        </BentoCard>

        {/* Pending Installations */}
        <BentoCard
          title="Pending Installations"
          icon={Clock}
          color="orange"
          size="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {pendingInstallations.slice(0, 6).map((installation, index) => (
              <motion.div
                key={installation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">#{installation.componentId}</h4>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(installation.priority)}`}></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {installation.componentType} • Work Order: {installation.workOrder}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{installation.location}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Section: {installation.trackSection} • Est: {installation.estimatedDuration}min
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => startInstallation(installation.componentId)}
                      className="px-3 py-1 bg-railway-blue text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      Start
                    </button>
                    <div className="text-xs text-gray-500">
                      {installation.scheduledDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Work Orders */}
        <BentoCard
          title="Active Work Orders"
          icon={CheckCircle}
          color="blue"
          size="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {workOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-blue-50 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">WO-{order.id}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-900 mt-1 font-medium">
                      {order.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {order.location}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Due: {order.dueDate.toLocaleDateString()} • {order.estimatedComponents} components
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(order.priority)}`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Recent Installations */}
        <BentoCard
          title="Recent Installation History"
          icon={Wrench}
          color="gray"
          size="xl"
        >
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentInstallations.slice(0, 8).map((installation, index) => (
              <motion.div
                key={installation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full mt-1.5 ${
                  installation.status === 'completed' ? 'bg-railway-success' :
                  installation.status === 'needs-inspection' ? 'bg-railway-warning' : 'bg-railway-blue'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    {installation.componentType} #{installation.componentId}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {installation.location}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {installation.installDate.toLocaleDateString()} • {installation.duration}min • {installation.photos} photos
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(installation.status)}`}>
                  {installation.status}
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* GPS Tracking History */}
        <BentoCard
          title="GPS Activity Log"
          icon={Navigation}
          color="green"
          size="md"
        >
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {gpsHistory.slice(0, 6).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-2 bg-green-50 rounded text-xs"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{entry.activity}</div>
                    <div className="text-gray-600">{entry.location}</div>
                    <div className="text-gray-500">{entry.duration}min</div>
                  </div>
                  <div className="text-gray-500">
                    {entry.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Installation Form Modal */}
      {showInstallForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Log Installation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Component ID</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="Scanned automatically" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Track Section</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select section...</option>
                  <option>A1</option>
                  <option>B2</option>
                  <option>C3</option>
                  <option>D4</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GPS Coordinates</label>
                <div className="text-sm text-gray-600 p-2 border rounded-lg bg-gray-50">
                  {currentLocation ? 
                    `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}` : 
                    'Getting location...'
                  }
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea className="w-full p-2 border rounded-lg h-20" placeholder="Installation notes..."></textarea>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowInstallForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowInstallForm(false)}
                  className="flex-1 px-4 py-2 bg-railway-blue text-white rounded-lg hover:bg-blue-700"
                >
                  Log Installation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Scan Component QR Code</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Point camera at component QR code</p>
                <p className="text-sm text-gray-500 mt-2">Scanner simulation active</p>
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

export default EngineerDashboard;
