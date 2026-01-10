
import api from '../axios.config';
import { PromoCode } from '../../types/api.types';

export const promosApi = {
  getAll: () => api.get<PromoCode[]>('/admin/promo-codes'),
  getById: (id: string) => api.get<PromoCode>(`/admin/promo-codes/${id}`),
  create: (data: Partial<PromoCode>) => api.post<PromoCode>('/admin/promo-codes', data),
  update: (id: string, data: Partial<PromoCode>) => api.put<PromoCode>(`/admin/promo-codes/${id}`, data),
  delete: (id: string) => api.delete(`/admin/promo-codes/${id}`),
  toggleStatus: (id: string, isActive: boolean) => api.patch(`/admin/promo-codes/${id}`, { isActive }),
};
