
import api from '../axios.config';
import { Address } from '../../types/customer.types';

export const addressesApi = {
  getByCustomer: (customerId: string) => api.get<Address[]>(`/customers/${customerId}/addresses`),
  getById: (id: string) => api.get<Address>(`/addresses/${id}`),
  create: (customerId: string, data: Partial<Address>) => api.post<Address>(`/customers/${customerId}/addresses`, data),
  update: (id: string, data: Partial<Address>) => api.put<Address>(`/addresses/${id}`, data),
  delete: (id: string) => api.delete(`/addresses/${id}`),
  setDefault: (id: string) => api.patch<Address>(`/addresses/${id}/set-default`),
};
