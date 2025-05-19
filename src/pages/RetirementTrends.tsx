import React, { useState } from 'react';
import { HelpCircle, Download, Search, Filter } from 'lucide-react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '../components/ui/Tooltip';
import RetirementViews from '../components/retirement/RetirementViews';
import { mockRetirementData } from '../data/mockRetirementData';

const RetirementTrends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pool' | 'token' | 'chain' | 'beneficiary'>('pool');
  const [timeRange, setTimeRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    chain: '',
    registry: '',
    vintage: '',
  });

  const tabOptions = [
    { id: 'pool', label: 'By Pool' },
    { id: 'token', label: 'By Token' },
    { id: 'chain', label: 'By Chain' },
    { id: 'beneficiary', label: 'By Beneficiary' },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-nz-green-50 via-nz-blue-50 to-nz-teal-50 animate-gradient-xy">
        <div className="max-w-[2000px] mx-auto w-full px-6 py-4 space-y-6">
          {/* Header */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                  Retirement Trends
                </h1>
                <div className="flex items-center mt-2">
                  <TooltipRoot>
                    <TooltipTrigger asChild>
                      <button className="text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <span>About Retirement Data</span>
                        <HelpCircle size={16} className="ml-1" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      Track and analyze REC retirement patterns across different pools, tokens, chains, and beneficiaries.
                    </TooltipContent>
                  </TooltipRoot>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search retirements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Download size={16} className="mr-2" />
                  Export Data
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabOptions.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-3 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-gray-900 border-t border-l border-r border-gray-200'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-6">
              <RetirementViews activeTab={activeTab} timeRange={timeRange} />
            </div>

            {/* Right Info Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-4">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">REC Pool Redemptions / Retirements</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockRetirementData.redemptionTotals.map((pool, index) => (
                    <div key={index} className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: pool.iconBg }}
                        >
                          {pool.symbol}
                        </div>
                        <span className="font-medium text-gray-900">{pool.name}</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-2xl font-semibold text-gray-900">{pool.totalRedeemed}</p>
                          <p className="text-xs text-gray-500 uppercase mt-1">Total Tonnes Redeemed</p>
                        </div>
                        <div>
                          <p className="text-2xl font-semibold text-gray-900">{pool.platformPercentage}%</p>
                          <p className="text-xs text-gray-500 uppercase mt-1">Redeemed via Platform</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default RetirementTrends;