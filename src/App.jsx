import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import AddRecordForm from './components/RecordForm/AddRecordForm';
import RecordTable from './components/RecordTable/RecordTable';
import { useRecords } from './hooks/useRecords';
import { useRecordForm } from './hooks/useRecordForm';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { records, error, filters, setError, fetchRecords, handleFilterChange, clearFilters } = useRecords();
  const {
    editingId,
    formData,
    newRecordData,
    handleNewRecordChange,
    handleAddRecord,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleChange,
    handleCancel
  } = useRecordForm(fetchRecords, setError);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-white shadow-sm z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">Excel Sheet Data</h1>
          </div>
        </div>

        {error && (
          <div className="m-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <AddRecordForm
          newRecordData={newRecordData}
          handleNewRecordChange={handleNewRecordChange}
          handleAddRecord={handleAddRecord}
        />

        <RecordTable
          records={records}
          editingId={editingId}
          formData={formData}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;