
import api from '../axios.config';
import { User } from '../../types/auth.types';
import { ApiResponse, PaginatedResponse, UserRole } from '../../types/api.types';
import { Order, OrderStatus } from '../../types/order.types';

export interface SystemStats {
  users: { total: number; admins: number; dispatchers: number; drivers: number; customers: number };
  system: { status: string; load: string; database: string; relay: string };
  approvals: Array<{ id: string; type: string; name: string; plate: string; date: string }>;
  revenue: { week: number; month: number };
}

export interface DriverApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleType: string;
  plate: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const adminApi = {
  // User Management
  getUsers: (params?: Record<string, string | number>) => api.get<PaginatedResponse<User>>('/admin/users', { params }),
  getUserById: (id: string) => api.get<User>(`/admin/users/${id}`),
  createUser: (data: Partial<User>) => api.post<User>('/admin/users', data),
  updateUser: (id: string, data: Partial<User>) => api.put<User>(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  updateUserStatus: (id: string, isActive: boolean) => api.patch(`/admin/users/${id}/status`, { isActive }),
  updateUserRole: (id: string, role: UserRole) => api.patch(`/admin/users/${id}/role`, { role }),
  
  // Driver Approval Workflow
  getDriverApplications: (status: 'PENDING' | 'APPROVED' | 'REJECTED') => 
    api.get<DriverApplication[]>(`/admin/drivers/applications?status=${status}`),
  approveDriver: (id: string) => api.post(`/admin/drivers/approve/${id}`),
  rejectDriver: (id: string, reason: string) => api.post(`/admin/drivers/reject/${id}`, { reason }),

  // Fleet Monitoring
  getLiveFleetStatus: () => api.get<any[]>('/admin/fleet/live'),

  // Order Oversight
  getOrders: (params?: Record<string, string | number>) => api.get<PaginatedResponse<Order>>('/admin/orders', { params }),
  bulkUpdateOrders: (orderIds: string[], status: OrderStatus) => api.post('/admin/orders/bulk-status', { orderIds, status }),
  
  // Financial Management
  getFinancialStats: () => api.get<any>('/admin/finance/stats'),
  processPayout: (driverId: string, amount: number) => api.post(`/admin/finance/payouts/${driverId}`, { amount }),
  
  // System Metrics
  getSystemStats: () => api.get<SystemStats>('/admin/stats'),
  getAuditLogs: (params?: Record<string, string | number>) => api.get<PaginatedResponse<any>>('/admin/audit-logs', { params }),
};
