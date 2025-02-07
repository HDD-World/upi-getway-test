import React from 'react';

const AddRecordForm = ({ newRecordData, handleNewRecordChange, handleAddRecord }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">ID</label>
          <input
            type="number"
            name="id"
            value={newRecordData.id}
            onChange={handleNewRecordChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Enter Unique Id"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <input
            type="text"
            name="Name"
            value={newRecordData.Name}
            onChange={handleNewRecordChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Enter Name"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={newRecordData.age}
            onChange={handleNewRecordChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Enter Age"
          />
        </div>
        <button
          onClick={handleAddRecord}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Add Record
        </button>
      </div>
    </div>
  );
};

export default AddRecordForm;
