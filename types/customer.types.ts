export interface Address {
  id: string;
  customerId: string;
  label: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  userId: string;
  defaultAddressId?: string;
  totalOrders: number;
  createdAt: string;
  updatedAt: string;
  // Included from User join
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}
