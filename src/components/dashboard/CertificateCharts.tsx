import React from 'react';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import { 
  mockHistoricalPrices, 
  mockSupplyByBlockchain, 
  mockOnChainRetirementVolume 
} from '../../data/mockData';
import ToggleTabs from './ToggleTabs';

const CertificateCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between">
          <h2 className="font-medium text-gray-700">Historical REC Prices by Type</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
            Details →
          </a>
        </div>
        <div className="p-4 h-72">
          <LineChart data={mockHistoricalPrices} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between">
          <h2 className="font-medium text-gray-700">REC Supply by Blockchain</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
            Details →
          </a>
        </div>
        <div className="p-4 h-72">
          <div className="flex mb-3 space-x-2">
            <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">Polygon</span>
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">Ethereum</span>
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Celo</span>
          </div>
          <div className="h-[calc(100%-2rem)] flex items-center justify-center">
            <PieChart data={mockSupplyByBlockchain.pieData} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden md:col-span-2">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium text-gray-700">On-Chain Retirement Volume</h2>
          <ToggleTabs
            tabs={[
              { id: 'issued', label: 'Issued' },
              { id: 'retired', label: 'Retired' },
            ]}
            activeTab="retired"
            onChange={() => {}}
          />
        </div>
        <div className="p-4 h-72">
          <BarChart data={mockOnChainRetirementVolume} />
        </div>
      </div>
    </div>
  );
};

export default CertificateCharts;