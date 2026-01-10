import { OrderStatus } from './order.types';

export interface OrderTracking {
  id: string;
  orderId: string;
  status: OrderStatus;
  latitude: number;
  longitude: number;
  notes?: string;
  timestamp: string;
}

export interface TrackingUpdate {
  orderId: string;
  status: OrderStatus;
  latitude: number;
  longitude: number;
  notes?: string;
}
