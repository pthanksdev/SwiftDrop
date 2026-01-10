
import api from '../axios.config';
import { Customer } from '../../types/customer.types';
import { Order } from '../../types/order.types';

export const customersApi = {
  create: (data: any) => api.post<Customer>('/customers', data),
  getAll: () => api.get<Customer[]>('/customers'),
  getById: (id: string) => api.get<Customer>(`/customers/${id}`),
  search: (query: string) => api.get<Customer[]>(`/customers/search?query=${query}`),
  getOrders: (id: string) => api.get<Order[]>(`/customers/${id}/orders`),
  update: (id: string, data: Partial<Customer>) => api.put<Customer>(`/customers/${id}`, data),
  delete: (id: string) => api.delete(`/customers/${id}`),
};
