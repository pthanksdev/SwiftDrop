
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../types/notification.types';

interface NotificationsState {
  list: Notification[];
  unreadCount: number;
  loading: boolean;
}

const initialState: NotificationsState = {
  list: [],
  unreadCount: 0,
  loading: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.list.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.list.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    clearUnread: (state) => {
      state.list.forEach(n => {
        n.isRead = true;
      });
      state.unreadCount = 0;
    },
    setNotificationsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
});

export const { 
  setNotifications, 
  addNotification, 
  markAsRead, 
  clearUnread, 
  setNotificationsLoading 
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
