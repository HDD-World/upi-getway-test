import { useState } from 'react';
import axios from 'axios';

export const useRecordForm = (fetchRecords, setError) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    age: ''
  });
  const [newRecordData, setNewRecordData] = useState({
    Name: '',
    age: ''
  });

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
      setNewRecordData({ id: '', Name: '', age: '' });
      fetchRecords();
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error);
      console.error('Error adding record:', error);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormData({
      Name: record.Name,
      age: record.age
    });
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

  return {
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
  };
};