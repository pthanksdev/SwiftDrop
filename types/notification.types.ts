export enum NotificationType {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_ASSIGNED = 'ORDER_ASSIGNED',
  ORDER_PICKED_UP = 'ORDER_PICKED_UP',
  ORDER_IN_TRANSIT = 'ORDER_IN_TRANSIT',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  ORDER_FAILED = 'ORDER_FAILED',
  DRIVER_ASSIGNED = 'DRIVER_ASSIGNED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  RATING_RECEIVED = 'RATING_RECEIVED',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  PROMOTIONAL = 'PROMOTIONAL'
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  relatedEntityId?: string;
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
}
