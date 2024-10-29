import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { api } from '../../services/api';

export default function RecentVerifications() {
  const { data: verifications, isLoading } = useQuery({
    queryKey: ['recent-verifications'],
    queryFn: () => api.addresses.list({ page: 1 }),
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Verificações Recentes
        </h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Verificações Recentes
      </h2>
      <div className="space-y-4">
        {verifications?.data.map((verification: Address) => (
          <div
            key={verification.id}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md"
          >
            {verification.status === 'verified' && (
              <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
            )}
            {verification.status === 'pending' && (
              <Clock className="h-5 w-5 text-yellow-500 mt-1" />
            )}
            {verification.status === 'failed' && (
              <AlertCircle className="h-5 w-5 text-red-500 mt-1" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {verification.street}, {verification.number}
              </p>
              <p className="text-xs text-gray-500">
                {verification.city} - {verification.state}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(verification.updatedAt).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}