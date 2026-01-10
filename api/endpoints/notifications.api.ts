
import api from '../axios.config';
import { Notification } from '../../types/notification.types';

export const notificationsApi = {
  getAll: () => api.get<Notification[]>('/notifications'),
  getUnread: () => api.get<Notification[]>('/notifications/unread'),
  markRead: (id: string) => api.patch<Notification>(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
  delete: (id: string) => api.delete(`/notifications/${id}`),
};
