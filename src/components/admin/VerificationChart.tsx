import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface VerificationChartProps {
  data: {
    date: string;
    count: number;
  }[];
}

export default function VerificationChart({ data }: VerificationChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
              })
            }
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
              })
            }
            formatter={(value: number) =>
              [`${value} verificações`, 'Quantidade']
            }
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}