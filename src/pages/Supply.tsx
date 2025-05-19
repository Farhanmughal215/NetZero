import React, { useState } from 'react';
import { HelpCircle, Download, ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '../components/ui/Tooltip';
import { mockSupplyData } from '../data/mockSupplyData';
import AreaChart from '../components/charts/AreaChart';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';

const Supply: React.FC = () => {
  const [timeRange, setTimeRange] = useState('1y');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-nz-green-50 via-nz-blue-50 to-nz-teal-50 animate-gradient-xy">
        <div className="max-w-[2000px] mx-auto w-full px-6 py-4 space-y-6">
          {/* Header */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                  Supply Overview
                </h1>
                <div className="flex items-center mt-2">
                  <TooltipRoot>
                    <TooltipTrigger asChild>
                      <button className="text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <span>About Supply Data</span>
                        <HelpCircle size={16} className="ml-1" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      Track and analyze the total supply of Renewable Energy Certificates across different blockchain networks and energy types.
                    </TooltipContent>
                  </TooltipRoot>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rec-green-500 focus:border-transparent"
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Download size={16} className="mr-2" />
                  Export Supply Data
                </button>
              </div>
            </div>
          </div>

          {/* Network Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockSupplyData.networkCards.map((card, index) => (
              <div
                key={index}
                onClick={() => setSelectedNetwork(card.network)}
                className={`bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/50 transition-all duration-200 hover:shadow-md cursor-pointer ${
                  selectedNetwork === card.network ? 'ring-2 ring-rec-green-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{card.network}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    card.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {card.trend > 0 ? (
                      <span className="flex items-center">
                        <ArrowUpRight size={14} className="mr-1" />
                        {card.trend}%
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ArrowDownRight size={14} className="mr-1" />
                        {Math.abs(card.trend)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-baseline">
                    <p className="text-2xl font-bold text-gray-900">{card.totalSupply}</p>
                    <p className="text-sm text-gray-500">Total Supply</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Retired</span>
                      <span className="font-medium text-gray-900">{card.totalRetired}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Platform Retired</span>
                      <span className="font-medium text-gray-900">{card.platformRetired}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Supply Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-700">Supply Distribution by Chain</h2>
                <select
                  className="text-sm border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="1y">Last Year</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="1m">Last Month</option>
                </select>
              </div>
              <div className="p-4 h-80">
                <PieChart data={mockSupplyData.supplyDistribution} />
              </div>
            </div>

            {/* Supply Over Time */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-700">Supply Over Time</h2>
                <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                  <Filter size={16} className="mr-1" />
                  Filter
                </button>
              </div>
              <div className="p-4 h-80">
                <LineChart data={mockSupplyData.supplyOverTime} />
              </div>
            </div>

            {/* Energy Type Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Supply by Energy Type</h2>
              </div>
              <div className="p-4 h-80">
                <BarChart data={mockSupplyData.supplyByEnergyType} />
              </div>
            </div>

            {/* Regional Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Supply by Region</h2>
              </div>
              <div className="p-4 h-80">
                <BarChart data={mockSupplyData.supplyByRegion} />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Projects */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden lg:col-span-2">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Top REC Projects by Supply</h2>
              </div>
              <div className="p-4">
                <div className="divide-y divide-gray-200">
                  {mockSupplyData.topProjects
                    .filter(project => 
                      searchQuery === '' || 
                      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      project.location.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((project, index) => (
                      <div key={index} className="py-3 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg px-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-500">{project.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{project.supply}</p>
                          <p className="text-sm text-gray-500">{project.location}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Vintage Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Vintage Distribution</h2>
              </div>
              <div className="p-4 h-[400px]">
                <BarChart data={mockSupplyData.vintageDistribution} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Supply;