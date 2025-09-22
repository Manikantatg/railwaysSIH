import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, QrCode, Truck, FileCheck, Plus, Download, 
  MapPin, Calendar, AlertCircle, TrendingUp, Clock, Award
} from 'lucide-react';
import Layout from '../common/Layout';
import BentoCard from '../common/BentoCard';
import { faker } from '@faker-js/faker';

const VendorDashboard: React.FC = () => {
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const stats = {
    activeBatches: faker.number.int({ min: 5, max: 25 }),
    qrCodesGenerated: faker.number.int({ min: 100, max: 1000 }),
    shipmentsInTransit: faker.number.int({ min: 2, max: 10 }),
    qualityScore: faker.number.float({ min: 85, max: 99, fractionDigits: 1 }),
    totalComponents: faker.number.int({ min: 500, max: 5000 }),
    warrantyClaimsActive: faker.number.int({ min: 1, max: 8 })
  };

  const recentBatches = Array.from({ length: 8 }, (_, i) => ({
    id: faker.string.alphanumeric(8).toUpperCase(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    quantity: faker.number.int({ min: 50, max: 500 }),
    manufactureDate: faker.date.recent({ days: 30 }),
    status: faker.helpers.arrayElement(['pending', 'shipped', 'delivered', 'accepted']),
    destination: faker.location.city(),
    qrGenerated: faker.datatype.boolean()
  }));

  const shipmentTracking = Array.from({ length: 6 }, (_, i) => ({
    id: faker.string.alphanumeric(6).toUpperCase(),
    batchId: faker.string.alphanumeric(8).toUpperCase(),
    destination: faker.location.city(),
    estimatedDelivery: faker.date.future(),
    currentLocation: faker.location.city(),
    status: faker.helpers.arrayElement(['in-transit', 'delayed', 'delivered', 'pending-acceptance']),
    carrier: faker.company.name()
  }));

  const warrantyClaims = Array.from({ length: 5 }, (_, i) => ({
    id: faker.string.alphanumeric(8).toUpperCase(),
    componentId: faker.string.alphanumeric(8).toUpperCase(),
    claimDate: faker.date.recent({ days: 60 }),
    issueType: faker.helpers.arrayElement(['premature-wear', 'manufacturing-defect', 'installation-damage', 'material-failure']),
    status: faker.helpers.arrayElement(['under-review', 'approved', 'rejected', 'pending-investigation']),
    depot: faker.location.city(),
    severity: faker.helpers.arrayElement(['low', 'medium', 'high'])
  }));

  const performanceMetrics = {
    monthlyProduction: faker.number.int({ min: 1000, max: 5000 }),
    onTimeDelivery: faker.number.float({ min: 85, max: 99, fractionDigits: 1 }),
    defectRate: faker.number.float({ min: 0.1, max: 3.5, fractionDigits: 2 }),
    customerSatisfaction: faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 })
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'delivered': case 'accepted': return 'bg-green-100 text-green-800';
      case 'delayed': case 'rejected': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under-review': case 'pending-investigation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const generateQRCodes = (batchId: string) => {
    setSelectedBatch(batchId);
    // In real implementation, this would generate QR codes
    console.log(`Generating QR codes for batch: ${batchId}`);
  };

  return (
    <Layout title="Vendor Operations">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-min">
        {/* KPI Cards */}
        <BentoCard
          title="Active Batches"
          value={stats.activeBatches}
          icon={Package}
          color="blue"
          size="sm"
        />

        <BentoCard
          title="QR Codes Generated"
          value={stats.qrCodesGenerated}
          icon={QrCode}
          color="green"
          size="sm"
        />

        <BentoCard
          title="Shipments in Transit"
          value={stats.shipmentsInTransit}
          icon={Truck}
          color="orange"
          size="sm"
        />

        <BentoCard
          title="Quality Score"
          value={`${stats.qualityScore}%`}
          icon={FileCheck}
          color="green"
          size="sm"
        />

        <BentoCard
          title="Total Components"
          value={stats.totalComponents.toLocaleString()}
          icon={Package}
          color="blue"
          size="sm"
        />

        <BentoCard
          title="Warranty Claims"
          value={stats.warrantyClaimsActive}
          icon={AlertCircle}
          color="red"
          size="sm"
        />

        {/* Quick Actions */}
        <BentoCard
          title="Quick Actions"
          icon={Plus}
          color="blue"
          size="md"
        >
          <div className="space-y-3">
            <button 
              onClick={() => setShowBatchForm(true)}
              className="w-full bg-railway-blue text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Batch</span>
            </button>
            <button className="w-full border border-railway-blue text-railway-blue py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
              <QrCode className="w-4 h-4" />
              <span>Generate QR Codes</span>
            </button>
            <button className="w-full border border-railway-orange text-railway-orange py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Reports</span>
            </button>
          </div>
        </BentoCard>

        {/* Performance Metrics */}
        <BentoCard
          title="Performance Metrics"
          icon={TrendingUp}
          color="green"
          size="md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-railway-success">{performanceMetrics.monthlyProduction}</div>
                <div className="text-xs text-gray-600">Monthly Production</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-railway-blue">{performanceMetrics.onTimeDelivery}%</div>
                <div className="text-xs text-gray-600">On-Time Delivery</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-railway-danger">{performanceMetrics.defectRate}%</div>
                <div className="text-xs text-gray-600">Defect Rate</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-railway-warning">{performanceMetrics.customerSatisfaction}/5</div>
                <div className="text-xs text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Recent Batches */}
        <BentoCard
          title="Recent Batches"
          icon={Package}
          color="gray"
          size="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentBatches.map((batch, index) => (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">#{batch.id}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {batch.componentType} • {batch.quantity} units
                    </div>
                    <div className="text-xs text-gray-500">
                      {batch.destination} • {batch.manufactureDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {batch.qrGenerated ? (
                      <span className="text-xs text-green-600">QR Generated</span>
                    ) : (
                      <button
                        onClick={() => generateQRCodes(batch.id)}
                        className="text-xs text-railway-blue hover:underline"
                      >
                        Generate QR
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Shipment Tracking */}
        <BentoCard
          title="Shipment Tracking"
          icon={Truck}
          color="orange"
          size="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {shipmentTracking.map((shipment, index) => (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-orange-50 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">Shipment #{shipment.id}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Batch: #{shipment.batchId} • {shipment.carrier}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{shipment.currentLocation} → {shipment.destination}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      ETA: {shipment.estimatedDelivery.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Warranty Claims */}
        <BentoCard
          title="Warranty Claims"
          icon={AlertCircle}
          color="red"
          size="xl"
        >
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {warrantyClaims.map((claim, index) => (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">Claim #{claim.id}</h4>
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(claim.severity)}`}></div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                        {claim.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Component: #{claim.componentId}
                    </div>
                    <div className="text-xs text-gray-600">
                      Issue: {claim.issueType.replace('-', ' ')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {claim.depot} • {claim.claimDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <button className="text-xs text-railway-blue hover:underline">
                      View Details
                    </button>
                    {claim.status === 'under-review' && (
                      <button className="text-xs text-railway-orange hover:underline">
                        Respond
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Batch Registration Modal */}
      {showBatchForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Register New Batch</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Component Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select type...</option>
                  <option>Clip</option>
                  <option>Pad</option>
                  <option>Liner</option>
                  <option>Sleeper</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input type="number" className="w-full p-2 border rounded-lg" placeholder="Enter quantity" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manufacturing Date</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowBatchForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowBatchForm(false)}
                  className="flex-1 px-4 py-2 bg-railway-blue text-white rounded-lg hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default VendorDashboard;
