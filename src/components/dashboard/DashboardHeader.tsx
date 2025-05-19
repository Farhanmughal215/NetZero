import React from 'react';
import { HelpCircle, Download } from 'lucide-react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '../ui/Tooltip';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/50">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-secondary">
          NetZero Carbon Market Overview
        </h1>
        <div className="flex items-center mt-2">
          <TooltipProvider>
            <TooltipRoot>
              <TooltipTrigger asChild>
                <button className="text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <span>What is a digital REC?</span>
                  <HelpCircle size={16} className="ml-1" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                A Digital Renewable Energy Certificate (REC) is a blockchain-based token that represents proof that 1 megawatt-hour (MWh) of electricity was generated from a renewable energy source.
              </TooltipContent>
            </TooltipRoot>
          </TooltipProvider>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex items-center space-x-3">
        <button className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <Download size={16} className="mr-2" />
          Export Data
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          EXPLORE MARKETPLACE
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;