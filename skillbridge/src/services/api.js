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

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage as fallback
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
      console.error('Authentication failed');
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
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
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
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Login failed. Please check your credentials.'
    );
  }
};

// Authenticated: fetch current user's progress
export const getProgress = async () => {
  try {
    const response = await api.get('/progress');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to fetch progress. Please try again.'
    );
  }
};

export default api;
