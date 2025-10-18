import axios from 'axios';

// Configure base URL - adjust this based on your backend deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for AI generation
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies for authentication
});

// Request interceptor to add mock token for development
api.interceptors.request.use(
  (config) => {
    // Get mock token from localStorage (for development)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.error('Authentication failed');
      // Reload page to go back to login
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// API functions
export const generateRoadmap = async (data) => {
  try {
    const response = await api.post('/ai/generate', data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Failed to generate learning roadmap. Please try again.'
    );
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    // Token is stored in HTTP-only cookie automatically
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Registration failed. Please try again.'
    );
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    // Token is stored in HTTP-only cookie automatically
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Login failed. Please check your credentials.'
    );
  }
};

export default api;
