import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    id: '',
    Name: '',
    age: ''
  });

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

  useEffect(() => {
    fetchRecords();
  }, [filters]);

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

  return {
    records,
    error,
    filters,
    setError,
    fetchRecords,
    handleFilterChange,
    clearFilters
  };
};