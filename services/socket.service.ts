
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private baseURL: string = ((import.meta as any).env?.VITE_API_URL as string) || 'http://localhost:8080';

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(this.baseURL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('Logistics Relay: Active Connection Established');
    });

    this.socket.on('connect_error', (err) => {
      console.error('Logistics Relay: Connection Interrupted', err.message);
    });

    this.socket.on('disconnect', () => {
      console.log('Logistics Relay: Session Closed');
    });
  }

  // Subscriptions
  onOrderUpdate(callback: (data: any) => void) {
    this.socket?.on('order_update', callback);
  }

  onDriverLocationUpdate(callback: (data: any) => void) {
    this.socket?.on('driver_location', callback);
  }

  onSystemAlert(callback: (data: any) => void) {
    this.socket?.on('system_alert', callback);
  }

  // Emissions (for Driver/Field App)
  emitLocationUpdate(orderId: string, latitude: number, longitude: number) {
    this.socket?.emit('update_location', { orderId, latitude, longitude, timestamp: new Date().toISOString() });
  }

  emitStatusChange(orderId: string, newStatus: string) {
    this.socket?.emit('status_change', { orderId, status: newStatus });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
