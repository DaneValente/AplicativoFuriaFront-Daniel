// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDados = () => api.get('/endpoint-backend');
export const postDados = (data) => api.post('/endpoint-backend', data);