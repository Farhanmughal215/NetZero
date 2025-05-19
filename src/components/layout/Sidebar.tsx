import React from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  HardDrive, 
  TrendingUp, 
  Database, 
  Leaf,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Off vs On-Chain', icon: <HardDrive size={20} />, path: '/off-vs-on-chain' },
    { name: 'Supply', icon: <BarChart2 size={20} />, path: '/supply' },
    { name: 'Retirement Trends', icon: <TrendingUp size={20} />, path: '/retirement-trends' },
    { name: 'Token Details', icon: <Database size={20} />, path: '/token-details' },
  ];

  return (
    <div 
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ease-in-out hidden md:flex flex-col bg-white/80 backdrop-blur-sm border-r border-gray-200/50 shadow-sm relative`}
    >
      <div className="p-4 border-b border-gray-200/50 flex items-center justify-center">
        <img 
          src="https://media.ourwebprojects.pro/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-13-at-2PM-1.png"
          alt="Logo"
          className="h-11 w-auto transition-all duration-300"
        />
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-16 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="text-gray-600" />
        ) : (
          <ChevronLeft size={16} className="text-gray-600" />
        )}
      </button>
      <nav className="flex-1 pt-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary border-r-4 border-primary'
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                <span className="inline-flex items-center justify-center">
                  {item.icon}
                </span>
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200/50">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Leaf size={18} className="text-primary" />
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-gray-900">Carbon Credits</p>
              <p className="text-xs text-gray-500">v2.0.4</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;