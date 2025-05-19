import React from 'react';
import { mockPricingData } from '../../data/mockData';
import { ArrowDownRight, ArrowUpRight, Info } from 'lucide-react';

const PricePanel: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-4">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-medium text-gray-700">REC Pricing</h2>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-1">Live prices</span>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {mockPricingData.map((item, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center mb-1">
              <div
                className="w-8 h-8 rounded-full mr-2 flex items-center justify-center"
                style={{ backgroundColor: item.iconBg }}
              >
                <span className="text-xs font-bold text-white">{item.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-500">
                  {item.availableAmount.toLocaleString()} tonnes available
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-500">PRICE PER TOKEN</p>
                <p className="font-semibold">${item.price}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-500">SELECTIVE COST</p>
                <p className="font-semibold">{item.selectiveCost || '-'}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="flex items-center">
                  <p className="text-xs text-gray-500 mr-1">LAST 7 DAYS</p>
                  <Info size={12} className="text-gray-400" />
                </div>
                <div className="flex items-center">
                  {item.trend < 0 ? (
                    <>
                      <ArrowDownRight
                        size={14}
                        className="text-red-500 mr-1"
                      />
                      <p className="font-semibold text-red-500">
                        {Math.abs(item.trend)}%
                      </p>
                    </>
                  ) : item.trend > 0 ? (
                    <>
                      <ArrowUpRight
                        size={14}
                        className="text-green-500 mr-1"
                      />
                      <p className="font-semibold text-green-500">
                        {item.trend}%
                      </p>
                    </>
                  ) : (
                    <p className="font-semibold">0%</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50">
        <button className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-md font-medium hover:bg-blue-100 transition-colors">
          View All Certificates
        </button>
      </div>
    </div>
  );
};

export default PricePanel;