
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  setNotifications, 
  addNotification, 
  markAsRead as markReadAction, 
  clearUnread as clearUnreadAction,
  setNotificationsLoading 
} from '../store/slices/notificationsSlice';
import { notificationsApi } from '../api/endpoints/notifications.api';
import { socketService } from '../services/socket.service';
import { toast } from 'sonner';
import { Notification } from '../types/notification.types';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { list: notifications, unreadCount, loading } = useSelector((state: RootState) => state.notifications);
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchNotifications = useCallback(async () => {
    dispatch(setNotificationsLoading(true));
    try {
      const response = await notificationsApi.getAll();
      dispatch(setNotifications(response.data));
    } catch (err) {
      console.error('Failed to sync notifications');
    } finally {
      dispatch(setNotificationsLoading(false));
    }
  }, [dispatch]);

  const markAsRead = async (id: string) => {
    try {
      await notificationsApi.markRead(id);
      dispatch(markReadAction(id));
    } catch (err) {
      toast.error('Failed to update notification');
    }
  };

  const clearAll = async () => {
    try {
      await notificationsApi.markAllRead();
      dispatch(clearUnreadAction());
      toast.success('Inbox cleared');
    } catch (err) {
      toast.error('Action failed');
    }
  };

  // Listen for real-time socket notifications
  useEffect(() => {
    if (token) {
      // In a real app, the server would emit a 'notification' event
      socketService.onSystemAlert((alert: any) => {
        const newNotif: Notification = {
          id: Math.random().toString(36).substring(7),
          userId: 'me',
          type: alert.type || 'SYSTEM_ALERT',
          title: alert.title || 'Logistics Update',
          message: alert.message,
          isRead: false,
          createdAt: new Date().toISOString()
        };
        dispatch(addNotification(newNotif));
        toast.info(newNotif.title, { description: newNotif.message });
      });
    }
  }, [token, dispatch]);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    clearAll
  };
};
