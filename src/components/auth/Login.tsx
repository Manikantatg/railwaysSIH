import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const roles = [
    { value: 'admin' as UserRole, label: 'Railway Authority Admin', description: 'Full system access and oversight' },
    { value: 'vendor' as UserRole, label: 'Component Vendor', description: 'Manage batches and shipments' },
    { value: 'depot' as UserRole, label: 'Depot Manager', description: 'Handle inventory and stock' },
    { value: 'engineer' as UserRole, label: 'Field Engineer', description: 'Log installations and repairs' },
    { value: 'inspector' as UserRole, label: 'Quality Inspector', description: 'Conduct inspections and assessments' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password, selectedRole);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-blue to-blue-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-inter font-bold text-railway-blue mb-2">RailTrace</h1>
          <p className="text-railway-gray">Railway Fittings Lifecycle Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Role</label>
            <div className="space-y-2">
              {roles.map((role) => (
                <motion.div
                  key={role.value}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedRole === role.value 
                      ? 'border-railway-blue bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => setSelectedRole(role.value)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={selectedRole === role.value}
                      onChange={() => setSelectedRole(role.value)}
                      className="sr-only"
                    />
                    <User className="w-5 h-5 text-railway-blue mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{role.label}</div>
                      <div className="text-sm text-gray-600">{role.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-railway-blue focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-railway-blue focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-railway-blue text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo credentials: Use any email/password combination</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
