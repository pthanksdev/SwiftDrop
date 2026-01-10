
import api from '../axios.config';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../../types/auth.types';
import { ApiResponse } from '../../types/api.types';

export const authApi = {
  login: (data: LoginRequest) => api.post<LoginResponse>('/auth/login', data),
  register: (data: RegisterRequest) => api.post<ApiResponse<any>>('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  
  /**
   * Checks if any user with the ADMIN role exists in the system.
   * Used for the "first-run" bootstrap logic.
   */
  checkAdminExists: () => api.get<{ exists: boolean }>('/auth/admin-exists'),

  // User Management
  getAllUsers: () => api.get<User[]>('/users'),
  getUserById: (id: string) => api.get<User>(`/users/${id}`),
  getMe: () => api.get<User>('/users/me'),
  updateUser: (id: string, data: Partial<User>) => api.put<User>(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
};
