import React from 'react';

const TableRow = ({ record, editingId, formData, handleChange, handleUpdate, handleCancel, handleEdit, handleDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
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
  );
};

export default TableRow;