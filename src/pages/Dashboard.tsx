import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TopPanels from '../components/dashboard/TopPanels';
import CertificateCharts from '../components/dashboard/CertificateCharts';
import PricePanel from '../components/dashboard/PricePanel';
import { TooltipProvider } from '../components/ui/Tooltip';

const Dashboard: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-rec-green-50 via-rec-blue-50 to-rec-purple-50 animate-gradient-xy">
        <div className="max-w-[2000px] mx-auto w-full px-4 md:px-6 py-6 space-y-6">
          <DashboardHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <TopPanels />
              <CertificateCharts />
            </div>
            <div className="lg:col-span-1">
              <PricePanel />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;