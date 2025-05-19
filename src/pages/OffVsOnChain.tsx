import React, { useState } from 'react';
import { HelpCircle, Download } from 'lucide-react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '../components/ui/Tooltip';
import { mockOffVsOnChainData } from '../data/mockOffVsOnChainData';
import AreaChart from '../components/charts/AreaChart';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import ToggleTabs from '../components/dashboard/ToggleTabs';

const OffVsOnChain: React.FC = () => {
  const [timeRange, setTimeRange] = useState('all');
  const [chartView, setChartView] = useState('all');

  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-nz-green-50 via-nz-blue-50 to-nz-teal-50 animate-gradient-xy">
        <div className="max-w-[2000px] mx-auto w-full px-4 md:px-6 py-6 space-y-6">
          {/* Header */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                  Off vs On-Chain RECs
                </h1>
                <div className="flex items-center mt-2">
                  <TooltipRoot>
                    <TooltipTrigger asChild>
                      <button className="text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <span>What's the difference?</span>
                        <HelpCircle size={16} className="ml-1" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      Off-chain RECs are traditional certificates issued by registries, while on-chain RECs are tokenized versions that exist on blockchain networks.
                    </TooltipContent>
                  </TooltipRoot>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Download size={16} className="mr-2" />
                  Export Data
                </button>
              </div>
            </div>
          </div>

          {/* Top Info Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockOffVsOnChainData.topPanels.map((panel, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/50">
                <h3 className="text-sm font-medium text-gray-500">{panel.title}</h3>
                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{panel.value}</p>
                    <p className="text-sm text-gray-500">{panel.subtitle}</p>
                  </div>
                  <div className={`text-sm font-medium ${panel.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {panel.trend >= 0 ? '+' : ''}{panel.trend}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cumulative Issuance Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-700">Cumulative REC Issuance</h2>
                <select
                  className="text-sm border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="5y">Last 5 Years</option>
                  <option value="1y">Last Year</option>
                </select>
              </div>
              <div className="p-4 h-80">
                <AreaChart data={mockOffVsOnChainData.cumulativeIssuance} />
              </div>
            </div>

            {/* Tokenized RECs by Registry */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-700">Tokenized RECs by Registry</h2>
                <ToggleTabs
                  tabs={[
                    { id: 'all', label: 'All' },
                    { id: 'i-rec', label: 'I-REC' },
                    { id: 'green-e', label: 'Green-e' }
                  ]}
                  activeTab={chartView}
                  onChange={setChartView}
                />
              </div>
              <div className="p-4 h-80">
                <LineChart data={mockOffVsOnChainData.tokenizedByRegistry} />
              </div>
            </div>

            {/* RECs by Blockchain */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">RECs by Blockchain</h2>
              </div>
              <div className="p-4 h-80">
                <PieChart data={mockOffVsOnChainData.recsByBlockchain} />
              </div>
            </div>

            {/* RECs by Energy Source */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">RECs by Energy Source</h2>
              </div>
              <div className="p-4 h-80">
                <PieChart data={mockOffVsOnChainData.recsByType} />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tokenized RECs by Bridge */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Tokenized RECs by Bridge</h2>
              </div>
              <div className="p-4 h-64">
                <PieChart data={mockOffVsOnChainData.tokenizedByBridge} />
              </div>
            </div>

            {/* Vintage Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">REC Vintage Distribution</h2>
              </div>
              <div className="p-4 h-64">
                <BarChart
                  data={mockOffVsOnChainData.vintageDistribution.map(d => ({
                    label: d.year,
                    value: d.value
                  }))}
                />
              </div>
            </div>

            {/* Project Types */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Project Types</h2>
              </div>
              <div className="p-4 h-64">
                <BarChart
                  data={mockOffVsOnChainData.projectTypes.map(d => ({
                    label: d.type,
                    value: d.value
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default OffVsOnChain;