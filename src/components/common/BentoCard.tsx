import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BentoCardProps {
  title: string;
  value?: string | number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: ReactNode;
  onClick?: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'blue',
  size = 'md',
  children,
  onClick
}) => {
  const colorClasses = {
    blue: 'bg-railway-blue text-white',
    green: 'bg-railway-success text-white',
    orange: 'bg-railway-orange text-white',
    red: 'bg-railway-danger text-white',
    gray: 'bg-railway-gray text-white'
  };

  const sizeClasses = {
    sm: 'col-span-1 row-span-1 p-4',
    md: 'col-span-1 sm:col-span-2 row-span-1 p-6',
    lg: 'col-span-1 sm:col-span-2 lg:col-span-3 row-span-1 p-6',
    xl: 'col-span-1 sm:col-span-2 lg:col-span-4 row-span-2 p-8'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
      className={`
        ${sizeClasses[size]}
        bg-white rounded-xl shadow-sm border border-gray-200
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        transition-all duration-200
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {value && (
          <div className="text-right">
            <div className="text-2xl font-inter font-bold text-gray-900">{value}</div>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-inter font-semibold text-gray-900 mb-2">{title}</h3>
      
      {children && (
        <div className="text-sm text-railway-gray">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export default BentoCard;
