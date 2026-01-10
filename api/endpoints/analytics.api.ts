
import api from '../axios.config';

export const analyticsApi = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getOrderStats: () => api.get('/analytics/orders'),
  getDriverStats: () => api.get('/analytics/drivers'),
  getRevenueStats: () => api.get('/analytics/revenue'),
  
  // Reports
  getOrderReport: () => api.get('/reports/orders'),
  getRevenueReport: () => api.get('/reports/revenue'),
  getDriverReport: () => api.get('/reports/drivers'),
};
