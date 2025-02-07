import React from 'react';
import TableRow from './TableRow';

const RecordTable = ({ records, editingId, formData, handleChange, handleUpdate, handleCancel, handleEdit, handleDelete }) => {
  return (
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
              <TableRow
                key={record.id}
                record={record}
                editingId={editingId}
                formData={formData}
                handleChange={handleChange}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordTable;