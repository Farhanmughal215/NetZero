import React, { useState } from 'react';
import AreaChart from '../charts/AreaChart';
import { mockTotalCertifiedRECs, mockTokenizedRECPrices } from '../../data/mockData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TopPanels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'on-chain' | 'off-chain'>('on-chain');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium text-gray-700">Total Certified RECs</h2>
          <div className="flex">
            <button
              className={`px-3 py-1 text-sm rounded-md mr-1 ${
                activeTab === 'on-chain'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('on-chain')}
            >
              On-chain
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === 'off-chain'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('off-chain')}
            >
              Off-chain
            </button>
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">82.5M MWh</span>
              <span className="ml-2 flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight size={16} />
                12.4%
              </span>
            </div>
            <p className="text-sm text-gray-600">Total volume in last 30 days</p>
          </div>
          <div className="space-x-1 flex">
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Green-e</span>
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">I-REC</span>
            <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">M-RETS</span>
          </div>
        </div>
        <div className="p-4 h-64">
          <AreaChart data={mockTotalCertifiedRECs} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between">
          <h2 className="font-medium text-gray-700">Tokenized REC Prices (USD/MWh)</h2>
          <div>
            <select className="text-sm border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">$3.75</span>
              <span className="ml-2 flex items-center text-red-600 text-sm font-medium">
                <ArrowDownRight size={16} />
                2.1%
              </span>
            </div>
            <p className="text-sm text-gray-600">Average price across all types</p>
          </div>
          <div className="space-x-1 flex">
            <button className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">Solar</button>
            <button className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">Wind</button>
            <button className="px-2 py-1 text-xs font-medium bg-gray-800 rounded-md text-white">All Types</button>
          </div>
        </div>
        <div className="p-4 h-64">
          <AreaChart data={mockTokenizedRECPrices} />
        </div>
      </div>
    </div>
  );
};

export default TopPanels;