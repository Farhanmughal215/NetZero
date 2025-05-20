import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { cn } from '../../utils/cn';

interface DataPoint {
  date: string;
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  selectedProvince?: string | null;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, selectedProvince, className }) => {
  return (
    <div className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
        >
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#9CA3AF' }}
            padding={{ left: 30, right: 30 }}
          >
            <Label
              value="Year"
              position="bottom"
              offset={20}
              style={{ fill: '#4B5563', fontSize: 14, fontWeight: 500 }}
            />
          </XAxis>
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#9CA3AF' }}
            tickFormatter={(value) => `${value}k`}
          >
            <Label
              value="Carbon Credits (thousands tCO₂)"
              angle={-90}
              position="left"
              offset={40}
              style={{ fill: '#4B5563', fontSize: 14, fontWeight: 500 }}
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: 'none',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            itemStyle={{ color: '#F3F4F6' }}
            labelStyle={{ color: '#F3F4F6' }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()}k tCO₂`,
              name === 'Total Credits' ? 'All Provinces' : name
            ]}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-gray-600">
                {value === 'Total Credits' ? 'All Provinces' : value}
              </span>
            )}
          />
          {selectedProvince ? (
            <Line
              type="monotone"
              dataKey={selectedProvince}
              stroke="#22C55E"
              strokeWidth={3}
              dot={{
                fill: '#22C55E',
                stroke: 'white',
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{
                fill: '#22C55E',
                stroke: 'white',
                strokeWidth: 2,
                r: 6
              }}
            />
          ) : (
            <Line
              type="monotone"
              dataKey="Total Credits"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{
                fill: '#22C55E',
                stroke: 'white',
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{
                fill: '#22C55E',
                stroke: 'white',
                strokeWidth: 2,
                r: 6
              }}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;