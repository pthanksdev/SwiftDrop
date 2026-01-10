
import api from '../axios.config';
import { OrderTracking, TrackingUpdate } from '../../types/tracking.types';

export const trackingApi = {
  getTracking: (orderId: string) => api.get<OrderTracking>(`/tracking/${orderId}`),
  getHistory: (orderId: string) => api.get<OrderTracking[]>(`/tracking/${orderId}/history`),
  updateTracking: (orderId: string, data: TrackingUpdate) => api.post<OrderTracking>(`/tracking/${orderId}/update`, data),
};
