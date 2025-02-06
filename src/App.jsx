import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Database, X } from 'lucide-react';

function App() {
  const [newRecordData, setNewRecordData] = useState({
    Name: '',
    age: ''
});

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    age: ''
  });
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    id: '',
    Name: '',
    age: ''
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, [filters]);

  const fetchRecords = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.id) queryParams.append('id', filters.id);
      if (filters.Name) queryParams.append('Name', filters.Name);
      if (filters.age) queryParams.append('age', filters.age);

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/records?${queryParams}`);
      setRecords(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching records. Please try again.');
      console.error('Error fetching records:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      id: '',
      Name: '',
      age: ''
    });
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormData({
      Name: record.Name,
      age: record.age
    });
  };

  const handleNewRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecordData(prev => ({
        ...prev,
        [name]: value
    }));
};

const handleAddRecord = async () => {
  try {
      await axios.post(`${import.meta.env.VITE_API_URL}/records`, newRecordData);
      setNewRecordData({ id: '',Name: '', age: '' });  
      fetchRecords();  
      setError(null);
  } catch (error) {
      setError(error.response?.data?.error);
      console.log(error.response,"response")
      console.error('Error adding record:', error);
  }
};


  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/records/${editingId}`, formData);
      setEditingId(null);
      setFormData({ Name: '', age: '' });
      fetchRecords();
      setError(null);
    } catch (error) {
      setError('Error updating record. Please try again.');
      console.error('Error updating record:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/records/${id}`);
        fetchRecords();
        setError(null);
      } catch (error) {
        setError('Error deleting record. Please try again.');
        console.error('Error deleting record:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ Name: '', age: '' });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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

        {/* Filter Section in Sidebar */}
        <div className={`p-4 ${!isSidebarOpen && 'hidden'}`}>
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
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-white shadow-sm z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">Excel Sheet Data</h1>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="m-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
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


        {/* Table Container */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingId === record.id ? (
                        <input
                          type="text"
                          name="Name"
                          value={formData.Name}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        record.Name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingId === record.id ? (
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        record.age
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingId === record.id ? (
                        <div className="space-x-2">
                          <button
                            onClick={handleUpdate}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleEdit(record)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;