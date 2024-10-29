import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        {icon}
      </div>
      <div className="mt-4 flex items-center">
        {trend > 0 ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        ) : trend < 0 ? (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        ) : null}
        <span
          className={`ml-1 text-sm ${
            trend > 0
              ? 'text-green-600'
              : trend < 0
              ? 'text-red-600'
              : 'text-gray-600'
          }`}
        >
          {trend > 0 ? '+' : ''}{trend}%
        </span>
        <span className="ml-2 text-sm text-gray-500">vs. última semana</span>
      </div>
    </div>
  );
}