
import api from '../axios.config';
import { Order, OrderStatus } from '../../types/order.types';

export const ordersApi = {
  create: (data: Partial<Order>) => api.post<Order>('/orders', data),
  getAll: () => api.get<Order[]>('/orders'),
  getById: (id: string) => api.get<Order>(`/orders/${id}`),
  getByStatus: (status: OrderStatus) => api.get<Order[]>(`/orders/status/${status}`),
  getByCustomer: (customerId: string) => api.get<Order[]>(`/orders/customer/${customerId}`),
  getByDriver: (driverId: string) => api.get<Order[]>(`/orders/driver/${driverId}`),
  update: (id: string, data: Partial<Order>) => api.put<Order>(`/orders/${id}`, data),
  updateStatus: (id: string, status: OrderStatus) => api.patch<Order>(`/orders/${id}/status`, { status }),
  assignDriver: (id: string, driverId: string) => api.post<Order>(`/orders/${id}/assign`, { driverId }),
  rateDriver: (id: string, data: { rating: number, feedback: string, tags: string[] }) => 
    api.post<Order>(`/orders/${id}/rate-driver`, data),
  rateCustomer: (id: string, data: { rating: number, feedback: string, tags: string[] }) => 
    api.post<Order>(`/orders/${id}/rate-customer`, data),
  delete: (id: string) => api.delete(`/orders/${id}`),
};
