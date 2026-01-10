
import api from '../axios.config';
import { Payment } from '../../types/payment.types';

export const paymentsApi = {
  create: (data: any) => api.post<Payment>('/payments', data),
  getAll: () => api.get<Payment[]>('/payments'),
  getById: (id: string) => api.get<Payment>(`/payments/${id}`),
  getByOrder: (orderId: string) => api.get<Payment>(`/payments/order/${orderId}`),
  refund: (id: string) => api.post<Payment>(`/payments/${id}/refund`),
};
