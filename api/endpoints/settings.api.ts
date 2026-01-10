
import api from '../axios.config';

export const settingsApi = {
  getSettings: () => api.get('/settings'),
  updateSettings: (data: any) => api.put('/settings', data),
  testIntegration: (service: string) => api.post(`/settings/test/${service}`),
  updateProfile: (data: any) => api.put('/users/profile', data),
  changePassword: (data: any) => api.post('/users/change-password', data),
  uploadAvatar: (file: FormData) => api.post('/users/avatar', file, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};
