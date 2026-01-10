
export enum OrderStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED'
}

export enum PackageType {
  DOCUMENT = 'DOCUMENT',
  PARCEL = 'PARCEL',
  FOOD = 'FOOD',
  FRAGILE = 'FRAGILE',
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  OTHER = 'OTHER'
}

export interface OrderRating {
  rating: number;
  feedback?: string;
  tags?: string[];
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  driverId?: string;
  status: OrderStatus;
  
  // Locations
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  pickupContactName: string;
  pickupContactPhone: string;
  
  deliveryAddress: string;
  deliveryLatitude: number;
  deliveryLongitude: number;
  recipientName: string;
  recipientPhone: string;
  
  // Package Info
  packageType: PackageType;
  packageWeight: number;
  packageDimensions?: string;
  specialInstructions?: string;
  packagePhotoUrl?: string;
  
  // Timing
  scheduledPickupTime?: string;
  actualPickupTime?: string;
  scheduledDeliveryTime?: string;
  actualDeliveryTime?: string;
  
  // Financials
  distanceKm: number;
  baseFare: number;
  distanceCharge: number;
  weightCharge: number;
  peakHourSurcharge: number;
  discount: number;
  totalAmount: number;
  promoCode?: string;
  
  // Completion
  deliverySignatureUrl?: string;
  deliveryPhotoUrl?: string;
  deliveryNotes?: string;
  
  // Feedback
  customerRating?: number;
  customerFeedback?: string;
  customerFeedbackTags?: string[];
  driverRating?: number;
  driverFeedback?: string;
  driverFeedbackTags?: string[];
  
  // Meta
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}
