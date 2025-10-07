// lib/api.js
import axios from 'axios';

const api = axios.create({
  // Use environment variable for the base URL
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Add Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    // In a real app, use secure storage (like a secure cookie)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (401) errors, e.g., redirect to login
      console.error('Unauthorized access. Logging out...');
      // Optionally: localStorage.removeItem('authToken');
      // Optionally: router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;