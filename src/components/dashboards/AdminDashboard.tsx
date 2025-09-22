import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Package, CheckCircle, AlertTriangle, TrendingUp, Shield, Brain, 
  FileText, Download, BarChart3, Map, Clock, Award, AlertCircle
} from 'lucide-react';
import Layout from '../common/Layout';
import BentoCard from '../common/BentoCard';
import { faker } from '@faker-js/faker';

const AdminDashboard: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('performance');

  // Generate comprehensive mock data
  const kpis = {
    totalUsers: faker.number.int({ min: 150, max: 500 }),
    activeBatches: faker.number.int({ min: 25, max: 100 }),
    completedInspections: faker.number.int({ min: 500, max: 2000 }),
    warrantyAlerts: faker.number.int({ min: 5, max: 20 }),
    totalComponents: faker.number.int({ min: 10000, max: 50000 }),
    blockchainRecords: faker.number.int({ min: 15000, max: 75000 })
  };

  const aiInsights = [
    {
      title: 'Top Performing Vendor',
      vendor: faker.company.name(),
      score: faker.number.float({ min: 85, max: 99, fractionDigits: 1 }),
      trend: 'up'
    },
    {
      title: 'Predicted Failures',
      count: faker.number.int({ min: 3, max: 15 }),
      timeframe: 'Next 30 days',
      severity: 'medium'
    },
    {
      title: 'Quality Trend',
      trend: 'improving',
      percentage: faker.number.float({ min: 5, max: 15, fractionDigits: 1 }),
      period: 'This month'
    },
    {
      title: 'Anomaly Detection',
      anomalies: faker.number.int({ min: 2, max: 8 }),
      status: 'investigating'
    }
  ];

  const vendorRankings = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: faker.company.name(),
    score: faker.number.float({ min: 60, max: 99, fractionDigits: 1 }),
    defectRate: faker.number.float({ min: 0.1, max: 5.2, fractionDigits: 2 }),
    deliveries: faker.number.int({ min: 5, max: 50 }),
    status: faker.helpers.arrayElement(['excellent', 'good', 'average', 'poor'])
  }));

  const warrantyAlerts = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    componentId: faker.string.alphanumeric(8).toUpperCase(),
    type: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    expiryDate: faker.date.future(),
    location: faker.location.city(),
    vendor: faker.company.name(),
    severity: faker.helpers.arrayElement(['high', 'medium', 'low'])
  }));

  const recentActivity = Array.from({ length: 10 }, (_, i) => {
    const activities = [
      'New batch registered by vendor',
      'Quality inspection completed',
      'Component installed on track',
      'Warranty claim filed',
      'Vendor performance updated',
      'Blockchain record verified',
      'AI anomaly detected',
      'Batch shipment received',
      'Installation completed',
      'Inspection overdue alert'
    ];
    
    return {
      id: i + 1,
      activity: activities[i],
      user: faker.person.fullName(),
      timestamp: faker.date.recent(),
      type: faker.helpers.arrayElement(['info', 'success', 'warning', 'error'])
    };
  });

  const exportReport = (type: string) => {
    // Simulate report generation
    console.log(`Generating ${type} report...`);
    // In real implementation, this would trigger actual report generation
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-railway-success';
      case 'good': return 'text-green-600';
      case 'average': return 'text-railway-warning';
      case 'poor': return 'text-railway-danger';
      default: return 'text-railway-gray';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-railway-danger text-white';
      case 'medium': return 'bg-railway-warning text-white';
      case 'low': return 'bg-railway-success text-white';
      default: return 'bg-railway-gray text-white';
    }
  };

  return (
    <Layout title="System Overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-min">
        {/* KPI Cards */}
        <BentoCard
          title="Total Users"
          value={kpis.totalUsers}
          icon={Users}
          color="blue"
          size="sm"
        />

        <BentoCard
          title="Active Batches"
          value={kpis.activeBatches}
          icon={Package}
          color="green"
          size="sm"
        />

        <BentoCard
          title="Completed Inspections"
          value={kpis.completedInspections.toLocaleString()}
          icon={CheckCircle}
          color="orange"
          size="sm"
        />

        <BentoCard
          title="Warranty Alerts"
          value={kpis.warrantyAlerts}
          icon={AlertTriangle}
          color="red"
          size="sm"
        />

        <BentoCard
          title="Total Components"
          value={kpis.totalComponents.toLocaleString()}
          icon={Package}
          color="blue"
          size="sm"
        />

        <BentoCard
          title="Blockchain Records"
          value={kpis.blockchainRecords.toLocaleString()}
          icon={Shield}
          color="green"
          size="sm"
        />

        {/* AI Insights Panel */}
        <BentoCard
          title="AI Performance Insights"
          icon={Brain}
          color="blue"
          size="lg"
        >
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      {insight.vendor && `Vendor: ${insight.vendor}`}
                      {insight.timeframe && insight.timeframe}
                      {insight.period && insight.period}
                      {insight.anomalies && `${insight.anomalies} anomalies detected`}
                    </div>
                  </div>
                  <div className="text-right">
                    {insight.score && (
                      <span className="text-lg font-bold text-railway-success">{insight.score}%</span>
                    )}
                    {insight.count && (
                      <span className="text-lg font-bold text-railway-danger">{insight.count}</span>
                    )}
                    {insight.percentage && (
                      <span className="text-lg font-bold text-railway-success">+{insight.percentage}%</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Vendor Performance Scoreboard */}
        <BentoCard
          title="Vendor Performance Scoreboard"
          icon={Award}
          color="orange"
          size="lg"
        >
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {vendorRankings.slice(0, 8).map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-railway-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{vendor.name}</div>
                    <div className="text-xs text-gray-500">
                      {vendor.deliveries} deliveries • {vendor.defectRate}% defect rate
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{vendor.score}</div>
                  <div className={`text-xs font-medium ${getStatusColor(vendor.status)}`}>
                    {vendor.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Blockchain Audit Trail */}
        <BentoCard
          title="Blockchain Verification"
          icon={Shield}
          color="green"
          size="md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-railway-success">{kpis.blockchainRecords.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Records</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-railway-success">100%</div>
                <div className="text-xs text-gray-600">Integrity</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Verified Today</span>
                <span className="font-bold text-railway-success">{faker.number.int({ min: 100, max: 500 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Gas Used (Polygon)</span>
                <span className="font-bold">{faker.number.float({ min: 0.01, max: 0.05, fractionDigits: 3 })} MATIC</span>
              </div>
            </div>
            <button className="w-full bg-railway-blue text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              View Audit Trail
            </button>
          </div>
        </BentoCard>

        {/* Warranty Expiry Alerts */}
        <BentoCard
          title="Warranty Expiry Alerts"
          icon={Clock}
          color="red"
          size="md"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {warrantyAlerts.slice(0, 6).map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm">#{alert.componentId}</div>
                    <div className="text-xs text-gray-600">{alert.type} • {alert.location}</div>
                    <div className="text-xs text-gray-500">{alert.vendor}</div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(alert.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Reports Generation */}
        <BentoCard
          title="Generate Reports"
          icon={FileText}
          color="gray"
          size="md"
        >
          <div className="space-y-4">
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="performance">Performance Report</option>
              <option value="vendor">Vendor Analysis</option>
              <option value="warranty">Warranty Report</option>
              <option value="blockchain">Blockchain Audit</option>
              <option value="defects">Defect Analysis</option>
              <option value="lifecycle">Lifecycle Report</option>
            </select>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => exportReport('csv')}
                className="flex items-center justify-center space-x-1 px-3 py-2 bg-railway-blue text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => exportReport('pdf')}
                className="flex items-center justify-center space-x-1 px-3 py-2 border border-railway-blue text-railway-blue rounded-lg text-sm hover:bg-blue-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
            
            <div className="text-xs text-gray-500">
              Last generated: {faker.date.recent().toLocaleDateString()}
            </div>
          </div>
        </BentoCard>

        {/* Recent System Activity */}
        <BentoCard
          title="Recent System Activity"
          icon={BarChart3}
          color="gray"
          size="xl"
        >
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.map((activity, index) => {
              const typeColors = {
                info: 'bg-blue-100 text-blue-800',
                success: 'bg-green-100 text-green-800',
                warning: 'bg-yellow-100 text-yellow-800',
                error: 'bg-red-100 text-red-800'
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
                    activity.type === 'success' ? 'bg-railway-success' :
                    activity.type === 'warning' ? 'bg-railway-warning' :
                    activity.type === 'error' ? 'bg-railway-danger' : 'bg-railway-blue'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{activity.activity}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {activity.timestamp.toLocaleTimeString()} • {activity.user}
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
    </Layout>
  );
};

export default AdminDashboard;
