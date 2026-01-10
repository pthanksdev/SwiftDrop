
import api from '../axios.config';
import { Driver, AvailabilityStatus } from '../../types/driver.types';
import { Order } from '../../types/order.types';

export const driversApi = {
  create: (data: any) => api.post<Driver>('/drivers', data),
  getAll: () => api.get<Driver[]>('/drivers'),
  getById: (id: string) => api.get<Driver>(`/drivers/${id}`),
  getAvailable: () => api.get<Driver[]>('/drivers/available'),
  getOrders: (id: string) => api.get<Order[]>(`/drivers/${id}/orders`),
  update: (id: string, data: Partial<Driver>) => api.put<Driver>(`/drivers/${id}`, data),
  updateAvailability: (id: string, status: AvailabilityStatus) => api.patch<Driver>(`/drivers/${id}/availability`, { status }),
  updateLocation: (id: string, latitude: number, longitude: number) => 
    api.put(`/drivers/${id}/location`, { latitude, longitude }),
  getLocation: (id: string) => api.get<{latitude: number, longitude: number}>(`/drivers/${id}/location`),
  delete: (id: string) => api.delete(`/drivers/${id}`),
};
