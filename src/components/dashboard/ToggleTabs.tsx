import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface ToggleTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

const ToggleTabs: React.FC<ToggleTabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex bg-gray-100 p-1 rounded-md">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none transition-colors duration-200 ${
            activeTab === tab.id
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleTabs;