
import axios from 'axios';

/**
 * Standard configuration for the SwiftDrop API client.
 * Handles authentication headers and session expiration.
 */
// Added cast to any to resolve 'Property env does not exist on type ImportMeta' error
const baseURL = ((import.meta as any).env?.VITE_API_URL as string) || 'http://localhost:8080/api';

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Intercept 401 Unauthorized errors to trigger session termination
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      const isLoginPage = window.location.hash.includes('/login');
      if (!isLoginPage) {
        window.location.href = '#/login';
      }
    }
    
    // Standardize error payload for downstream consumption
    return Promise.reject(error);
  }
);

export default api;
