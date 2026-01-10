export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  MOBILE_WALLET = 'MOBILE_WALLET',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: PaymentStatus;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}
