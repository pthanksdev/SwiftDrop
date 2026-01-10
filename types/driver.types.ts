export enum AvailabilityStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BUSY = 'BUSY'
}

export interface Driver {
  id: string;
  userId: string;
  vehicleType: string;
  vehiclePlate: string;
  licenseNumber: string;
  licenseExpiry: string;
  currentLatitude: number;
  currentLongitude: number;
  availabilityStatus: AvailabilityStatus;
  rating: number;
  totalDeliveries: number;
  completedDeliveries: number;
  cancelledDeliveries: number;
  totalEarnings: number;
  createdAt: string;
  updatedAt: string;
  lastLocationUpdate: string;
  // Included from User join
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}
