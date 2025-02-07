import React from 'react';

const FilterForm = ({ filters, handleFilterChange, clearFilters }) => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Filters</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">ID</label>
            <input
              type="text"
              name="id"
              value={filters.id}
              onChange={handleFilterChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Filter by ID"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Name</label>
            <input
              type="text"
              name="Name"
              value={filters.Name}
              onChange={handleFilterChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Filter by Name"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Age</label>
            <input
              type="text"
              name="age"
              value={filters.age}
              onChange={handleFilterChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Filter by Age"
            />
          </div>
        </div>
        <button
          onClick={clearFilters}
          className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterForm;