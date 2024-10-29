import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Users, Clock, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';
import StatsCard from './StatsCard';
import VerificationChart from './VerificationChart';
import RecentVerifications from './RecentVerifications';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.addresses.getStats(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Taxa de Sucesso"
          value={`${stats?.successRate.toFixed(1)}%`}
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          trend={+2.5}
        />
        <StatsCard
          title="Tempo Médio"
          value={`${stats?.averageResponseTime.toFixed(1)}s`}
          icon={<Clock className="h-6 w-6 text-blue-500" />}
          trend={-0.3}
        />
        <StatsCard
          title="Verificações Hoje"
          value={stats?.verificationsByDay[0]?.count.toString() || "0"}
          icon={<BarChart className="h-6 w-6 text-purple-500" />}
          trend={+15}
        />
        <StatsCard
          title="Usuários Ativos"
          value={stats?.activeUsers.toString() || "0"}
          icon={<Users className="h-6 w-6 text-yellow-500" />}
          trend={0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Verificações por Dia
            </h2>
            <VerificationChart data={stats?.verificationsByDay || []} />
          </div>
        </div>

        <div>
          <RecentVerifications />
        </div>
      </div>
    </div>
  );
}