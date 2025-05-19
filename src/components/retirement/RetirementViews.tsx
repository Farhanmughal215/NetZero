import React from 'react';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import LineChart from '../charts/LineChart';
import { mockRetirementData } from '../../data/mockRetirementData';

interface RetirementViewsProps {
  activeTab: 'pool' | 'token' | 'chain' | 'beneficiary';
  timeRange: string;
}

const RetirementViews: React.FC<RetirementViewsProps> = ({ activeTab, timeRange }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'pool':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Pool Retirement Volume</h2>
                </div>
                <div className="p-4 h-80">
                  <BarChart data={mockRetirementData.retirementsByPool} />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Pool Distribution</h2>
                </div>
                <div className="p-4 h-80">
                  <PieChart data={mockRetirementData.retirementsByToken} />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Recent Pool Retirements</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chain</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registry</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockRetirementData.detailedList.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.token}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.beneficiary}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.chain}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.registry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case 'token':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Token Distribution</h2>
                </div>
                <div className="p-4 h-80">
                  <PieChart data={mockRetirementData.retirementsByToken} />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Token Retirement Trends</h2>
                </div>
                <div className="p-4 h-80">
                  <LineChart data={mockRetirementData.tokenTrends} />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Token Performance</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockRetirementData.tokenPerformance.map((token, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: token.color }}
                        >
                          {token.symbol}
                        </div>
                        <span className="font-medium text-gray-900">{token.name}</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Total Retired</p>
                          <p className="text-lg font-semibold text-gray-900">{token.totalRetired}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Growth Rate</p>
                          <p className="text-lg font-semibold text-gray-900">{token.growthRate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'chain':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Chain Distribution</h2>
                </div>
                <div className="p-4 h-80">
                  <PieChart data={mockRetirementData.retirementsByChain} />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Chain Activity</h2>
                </div>
                <div className="p-4 h-80">
                  <BarChart data={mockRetirementData.chainActivity} />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Chain Statistics</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockRetirementData.chainStats.map((chain, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: chain.color }}
                        >
                          {chain.symbol}
                        </div>
                        <span className="font-medium text-gray-900">{chain.name}</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Total Volume</p>
                          <p className="text-lg font-semibold text-gray-900">{chain.totalVolume}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Average Gas Cost</p>
                          <p className="text-lg font-semibold text-gray-900">{chain.avgGasCost}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'beneficiary':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Top Beneficiaries</h2>
                </div>
                <div className="p-4 h-80">
                  <BarChart data={mockRetirementData.topBeneficiaries} />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700">Beneficiary Growth</h2>
                </div>
                <div className="p-4 h-80">
                  <LineChart data={mockRetirementData.beneficiaryGrowth} />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">Beneficiary Details</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Retired</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Most Used Token</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Chain</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockRetirementData.beneficiaryDetails.map((beneficiary, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{beneficiary.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.totalRetired}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.mostUsedToken}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.preferredChain}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.lastActivity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

export default RetirementViews;