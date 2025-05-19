import React, { useState } from 'react';
import { HelpCircle, Download, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '../components/ui/Tooltip';
import { mockTokenData } from '../data/mockTokenData';
import AreaChart from '../components/charts/AreaChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';

const TokenDetails: React.FC = () => {
  const [activeIssuer, setActiveIssuer] = useState('TOUCAN');
  const [tokenFilter, setTokenFilter] = useState('ALL');
  const [timeRange, setTimeRange] = useState('30D');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const issuers = ['TOUCAN', 'MOSS', 'C3'];
  const tokens = {
    TOUCAN: ['ALL', 'BCT', 'NCT'],
    MOSS: ['ALL', 'MCO2'],
    C3: ['ALL', 'UBO', 'NBO'],
  };
  const timeRanges = ['LIFETIME', '30D', '7D'];
  const statuses = ['ALL', 'BRIDGED', 'RETIRED'];

  const issuerData = mockTokenData[activeIssuer.toLowerCase() as keyof typeof mockTokenData];

  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-nz-green-50 via-nz-blue-50 to-nz-teal-50 animate-gradient-xy">
        <div className="max-w-[2000px] mx-auto w-full px-6 py-4 space-y-6">
          {/* Header */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                  Token Details
                </h1>
                <div className="flex items-center mt-2">
                  <TooltipRoot>
                    <TooltipTrigger asChild>
                      <button className="text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <span>About Token Details</span>
                        <HelpCircle size={16} className="ml-1" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      Detailed analysis of tokenized carbon credits across different issuers, including retirement patterns and methodologies.
                    </TooltipContent>
                  </TooltipRoot>
                </div>
              </div>

              {/* Filter Controls */}
              <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                <div className="flex space-x-2 bg-white rounded-lg p-1 border border-gray-200">
                  {issuers.map((issuer) => (
                    <button
                      key={issuer}
                      onClick={() => {
                        setActiveIssuer(issuer);
                        setTokenFilter('ALL');
                      }}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        activeIssuer === issuer
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {issuer}
                    </button>
                  ))}
                </div>

                <select
                  value={tokenFilter}
                  onChange={(e) => setTokenFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm"
                >
                  {tokens[activeIssuer as keyof typeof tokens].map((token) => (
                    <option key={token} value={token}>
                      {token}
                    </option>
                  ))}
                </select>

                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm"
                >
                  {timeRanges.map((range) => (
                    <option key={range} value={range}>
                      {range === '30D' ? 'Last 30 days' : range === '7D' ? 'Last 7 days' : 'Lifetime'}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Download size={16} className="mr-2" />
                  Export Data
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* State of Tokenized Carbon */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-700">State of Tokenized Carbon</h2>
                <div className="text-sm text-gray-500">Total Volume: {issuerData.totalVolume}</div>
              </div>
              <div className="p-4 h-80">
                <PieChart data={issuerData.tokenizedState} />
              </div>
            </div>

            {/* Breakdown of Pooled Tokens */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Breakdown of Pooled Tokens</h2>
              </div>
              <div className="p-4 h-80">
                <PieChart data={issuerData.pooledTokens} />
              </div>
            </div>

            {/* Volume Over Time */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Volume Over Time</h2>
              </div>
              <div className="p-4 h-80">
                <LineChart data={issuerData.volumeOverTime} />
              </div>
            </div>

            {/* Vintage Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Distribution of Vintage Start Dates</h2>
              </div>
              <div className="p-4 h-80">
                <BarChart data={issuerData.vintageDistribution} />
              </div>
            </div>

            {/* Methodologies Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Distribution of Methodologies</h2>
              </div>
              <div className="p-4 h-80">
                <BarChart data={issuerData.methodologies} />
              </div>
            </div>

            {/* Origin of Credits */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Origin of Credits</h2>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                          COUNTRY
                          <span className="ml-1">↓</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                          COUNTRY CODE
                          <span className="ml-1">↓</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                          AMOUNT BRIDGED
                          <span className="ml-1">↓</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {issuerData.creditOrigins.slice(0, 5).map((origin, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{origin.label}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{origin.label.substring(0, 2).toUpperCase()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{origin.value}M</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    {currentPage} / {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className="p-1 rounded-md hover:bg-gray-100"
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={20} className={currentPage === 1 ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className="p-1 rounded-md hover:bg-gray-100"
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={20} className={currentPage === totalPages ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-medium text-gray-700">Distribution of Projects</h2>
              <button className="text-primary hover:text-accent transition-colors text-sm">Details →</button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-12 gap-4 h-64">
                <div 
                  className="col-span-9 bg-secondary rounded-lg p-6 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:bg-secondary/90"
                  onClick={() => setActiveProject('energy')}
                >
                  <div className="text-center transform transition-transform duration-300 group-hover:scale-105">
                    <h3 className="text-3xl font-bold text-primary mb-2">Energy</h3>
                    <p className="text-xl text-primary/80">industries</p>
                    <p className="text-lg text-primary/60">(renewable/non-renewable sources)</p>
                  </div>
                </div>
                <div className="col-span-3 bg-accent rounded-lg p-4 flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-2">Agriculture Forestry and Other Land Use</h3>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {['Forestry', 'Agriculture', 'Land Use', 'Other'].map((item) => (
                      <div 
                        key={item}
                        onClick={() => setActiveProject(item.toLowerCase())}
                        className={`bg-primary/20 rounded p-2 cursor-pointer transition-all duration-300 hover:bg-primary/30 ${
                          activeProject === item.toLowerCase() ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        <span className="text-xs text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TokenDetails;