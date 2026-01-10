
import api from '../axios.config';
import { Rating } from '../../types/api.types';

export const ratingsApi = {
  create: (data: Partial<Rating>) => api.post<Rating>('/ratings', data),
  getByDriver: (driverId: string) => api.get<Rating[]>(`/ratings/driver/${driverId}`),
  getByCustomer: (customerId: string) => api.get<Rating[]>(`/ratings/customer/${customerId}`),
  getByOrder: (orderId: string) => api.get<Rating>(`/ratings/order/${orderId}`),
};
