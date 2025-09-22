import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, Camera, FileText, AlertTriangle, CheckCircle, 
  Clock, MapPin, Brain, Upload, Eye, Star, TrendingDown
} from 'lucide-react';
import Layout from '../common/Layout';
import BentoCard from '../common/BentoCard';
import { faker } from '@faker-js/faker';

const InspectorDashboard: React.FC = () => {
  const [showInspectionForm, setShowInspectionForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const stats = {
    inspectionsToday: faker.number.int({ min: 3, max: 18 }),
    inspectionsThisWeek: faker.number.int({ min: 20, max: 80 }),
    overdueInspections: faker.number.int({ min: 2, max: 12 }),
    defectsFound: faker.number.int({ min: 1, max: 8 }),
    averageHealthScore: faker.number.float({ min: 75, max: 95, fractionDigits: 1 }),
    photosUploaded: faker.number.int({ min: 15, max: 60 })
  };

  const pendingInspections = Array.from({ length: 10 }, (_, i) => ({
    id: faker.string.alphanumeric(8).toUpperCase(),
    componentId: faker.string.alphanumeric(8).toUpperCase(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    location: faker.location.streetAddress(),
    trackSection: faker.helpers.arrayElement(['A1', 'B2', 'C3', 'D4', 'E5']),
    dueDate: faker.date.future(),
    installDate: faker.date.past(),
    vendor: faker.company.name(),
    priority: faker.helpers.arrayElement(['normal', 'urgent', 'critical']),
    lastInspection: faker.date.past(),
    warrantStatus: faker.helpers.arrayElement(['active', 'expiring-soon', 'expired'])
  }));

  const recentInspections = Array.from({ length: 12 }, (_, i) => ({
    id: faker.string.alphanumeric(8).toUpperCase(),
    componentId: faker.string.alphanumeric(8).toUpperCase(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    inspectionDate: faker.date.recent({ days: 14 }),
    status: faker.helpers.arrayElement(['OK', 'Worn', 'Defective']),
    aiHealthScore: faker.number.float({ min: 20, max: 100, fractionDigits: 1 }),
    location: faker.location.streetAddress(),
    notes: faker.lorem.sentence(),
    photos: faker.number.int({ min: 1, max: 8 }),
    recommendedAction: faker.helpers.arrayElement(['continue-monitoring', 'schedule-replacement', 'immediate-replacement', 'further-inspection'])
  }));

  const aiInsights = Array.from({ length: 6 }, (_, i) => ({
    componentId: faker.string.alphanumeric(8).toUpperCase(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    healthScore: faker.number.float({ min: 15, max: 95, fractionDigits: 1 }),
    riskLevel: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
    predictedFailureDate: faker.date.future(),
    confidence: faker.number.float({ min: 75, max: 99, fractionDigits: 1 }),
    recommendation: faker.helpers.arrayElement([
      'Continue normal monitoring',
      'Increase inspection frequency',
      'Schedule preventive replacement',
      'Immediate replacement required'
    ]),
    factors: faker.helpers.arrayElements([
      'Age of component',
      'Environmental conditions',
      'Traffic load',
      'Installation quality',
      'Material degradation',
      'Previous defects'
    ], faker.number.int({ min: 2, max: 4 }))
  }));

  const overdueInspections = Array.from({ length: 8 }, (_, i) => ({
    id: faker.string.alphanumeric(8).toUpperCase(),
    componentId: faker.string.alphanumeric(8).toUpperCase(),
    componentType: faker.helpers.arrayElement(['clip', 'pad', 'liner', 'sleeper']),
    location: faker.location.streetAddress(),
    daysOverdue: faker.number.int({ min: 1, max: 30 }),
    priority: faker.helpers.arrayElement(['medium', 'high', 'critical']),
    vendor: faker.company.name(),
    installDate: faker.date.past(),
    lastInspection: faker.date.past()
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OK': return 'bg-green-100 text-green-800';
      case 'Worn': return 'bg-yellow-100 text-yellow-800';
      case 'Defective': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'urgent': case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'normal': case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const startInspection = (componentId: string) => {
    setSelectedComponent(componentId);
    setShowInspectionForm(true);
  };

  return (
    <Layout title="Quality Inspection">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-min">
        {/* KPI Cards */}
        <BentoCard
          title="Today's Inspections"
          value={stats.inspectionsToday}
          icon={Eye}
          color="blue"
          size="sm"
        />

        <BentoCard
          title="This Week"
          value={stats.inspectionsThisWeek}
          icon={FileText}
          color="green"
          size="sm"
        />

        <BentoCard
          title="Overdue Inspections"
          value={stats.overdueInspections}
          icon={Clock}
          color="red"
          size="sm"
        />

        <BentoCard
          title="Defects Found"
          value={stats.defectsFound}
          icon={AlertTriangle}
          color="orange"
          size="sm"
        />

        <BentoCard
          title="Avg Health Score"
          value={`${stats.averageHealthScore}%`}
          icon={Star}
          color="green"
          size="sm"
        />

        <BentoCard
          title="Photos Uploaded"
          value={stats.photosUploaded}
          icon={Camera}
          color="blue"
          size="sm"
        />

        {/* Inspection Tools */}
        <BentoCard
          title="Inspection Tools"
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
            <button className="w-full border border-railway-blue text-railway-blue py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Photo Capture</span>
            </button>
            <button className="w-full border border-railway-green text-railway-success py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Evidence</span>
            </button>
          </div>
        </BentoCard>

        {/* AI Health Insights */}
        <BentoCard
          title="AI Health Insights"
          icon={Brain}
          color="green"
          size="md"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">{stats.averageHealthScore}%</div>
                <div className="text-gray-600">Avg Score</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="text-lg font-bold text-red-600">{faker.number.int({ min: 2, max: 8 })}</div>
                <div className="text-gray-600">At Risk</div>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Prediction Accuracy:</span>
                <span className="font-bold text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Components Analysed:</span>
                <span className="font-bold">{faker.number.int({ min: 500, max: 2000 })}</span>
              </div>
            </div>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
              View AI Report
            </button>
          </div>
        </BentoCard>

        {/* Overdue Inspections */}
        <BentoCard
          title="Overdue Inspections"
          icon={Clock}
          color="red"
          size="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {overdueInspections.slice(0, 6).map((inspection, index) => (
              <motion.div
                key={inspection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">#{inspection.componentId}</h4>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(inspection.priority)}`}></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {inspection.componentType} • {inspection.vendor}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{inspection.location}</span>
                    </div>
                    <div className="text-xs text-red-600 font-medium mt-1">
                      {inspection.daysOverdue} days overdue
                    </div>
                  </div>
                  <button
                    onClick={() => startInspection(inspection.componentId)}
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                  >
                    Inspect Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Pending Inspections */}
        <BentoCard
          title="Scheduled Inspections"
          icon={FileText}
          color="orange"
          size="lg"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {pendingInspections.slice(0, 6).map((inspection, index) => (
              <motion.div
                key={inspection.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-orange-50 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">#{inspection.componentId}</h4>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(inspection.priority)}`}></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {inspection.componentType} • Section: {inspection.trackSection}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Due: {inspection.dueDate.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Last: {inspection.lastInspection.toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => startInspection(inspection.componentId)}
                    className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
                  >
                    Inspect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* AI Predictions */}
        <BentoCard
          title="AI Failure Predictions"
          icon={Brain}
          color="orange"
          size="xl"
        >
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {aiInsights.slice(0, 6).map((insight, index) => (
              <motion.div
                key={insight.componentId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">#{insight.componentId}</h4>
                      <span className={`text-sm font-bold ${getHealthScoreColor(insight.healthScore)}`}>
                        {insight.healthScore}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {insight.componentType} • Risk: <span className={`font-medium ${getRiskColor(insight.riskLevel)}`}>{insight.riskLevel}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Predicted failure: {insight.predictedFailureDate.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-900 font-medium mt-2">
                      {insight.recommendation}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Factors: {insight.factors.join(', ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Confidence</div>
                    <div className="text-sm font-bold text-green-600">{insight.confidence}%</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Recent Inspection History */}
        <BentoCard
          title="Recent Inspection History"
          icon={CheckCircle}
          color="gray"
          size="xl"
        >
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentInspections.slice(0, 8).map((inspection, index) => (
              <motion.div
                key={inspection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full mt-1.5 ${
                  inspection.status === 'OK' ? 'bg-railway-success' :
                  inspection.status === 'Worn' ? 'bg-railway-warning' : 'bg-railway-danger'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">#{inspection.componentId}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inspection.status)}`}>
                      {inspection.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {inspection.componentType} • Health: <span className={`font-bold ${getHealthScoreColor(inspection.aiHealthScore)}`}>{inspection.aiHealthScore}%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {inspection.inspectionDate.toLocaleDateString()} • {inspection.photos} photos • {inspection.recommendedAction.replace('-', ' ')}
                  </div>
                </div>
                <button className="text-xs text-railway-blue hover:underline">
                  View
                </button>
              </motion.div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Inspection Form Modal */}
      {showInspectionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Component Inspection</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Component ID</label>
                <input type="text" value={selectedComponent || ''} className="w-full p-2 border rounded-lg bg-gray-50" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Inspection Status</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select status...</option>
                  <option>OK - Component in good condition</option>
                  <option>Worn - Shows signs of wear but functional</option>
                  <option>Defective - Requires immediate attention</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Visual Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2 border rounded-lg text-sm hover:bg-green-50 hover:border-green-300">
                    Excellent
                  </button>
                  <button className="p-2 border rounded-lg text-sm hover:bg-yellow-50 hover:border-yellow-300">
                    Good
                  </button>
                  <button className="p-2 border rounded-lg text-sm hover:bg-red-50 hover:border-red-300">
                    Poor
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">AI Health Score</label>
                <div className="p-3 bg-blue-50 rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">
                    {faker.number.float({ min: 60, max: 95, fractionDigits: 1 })}%
                  </div>
                  <div className="text-sm text-gray-600">Generated by AI analysis</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo Evidence</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Tap to capture photos</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Inspector Notes</label>
                <textarea className="w-full p-2 border rounded-lg h-20" placeholder="Add inspection notes..."></textarea>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowInspectionForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowInspectionForm(false)}
                  className="flex-1 px-4 py-2 bg-railway-blue text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Inspection
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
            <h3 className="text-lg font-semibold mb-4">Scan Component for Inspection</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Point camera at component QR code</p>
                <p className="text-sm text-gray-500 mt-2">This will load component lifecycle data</p>
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

export default InspectorDashboard;
