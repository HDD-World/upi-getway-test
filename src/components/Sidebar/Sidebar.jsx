import React from 'react';
import { Database, X } from 'lucide-react';
import FilterForm from './FilterForm';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, filters, handleFilterChange, clearFilters }) => {
  return (
    <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
      <div className="p-4 border-b flex items-center justify-between">
        <div className={`flex items-center ${!isSidebarOpen && 'hidden'}`}>
          <Database className="h-6 w-6 text-blue-500" />
          <span className="ml-2 font-semibold">Excel Data</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Database className="h-5 w-5" />}
        </button>
      </div>
      {isSidebarOpen && (
        <FilterForm 
          filters={filters} 
          handleFilterChange={handleFilterChange} 
          clearFilters={clearFilters} 
        />
      )}
    </div>
  );
};

export default Sidebar;