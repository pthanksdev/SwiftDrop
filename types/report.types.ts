
export type ReportType = 'ORDERS' | 'REVENUE' | 'DRIVERS' | 'CUSTOMERS';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface OrdersReportData {
  summary: {
    totalOrders: number;
    completed: number;
    cancelled: number;
    failed: number;
    avgDeliveryTime: number;
    onTimeRate: number;
  };
  byStatus: { name: string; value: number }[];
  byType: { name: string; value: number }[];
  trends: { date: string; volume: number }[];
}

export interface RevenueReportData {
  summary: {
    totalGross: number;
    netYield: number;
    avgOrderValue: number;
    totalDiscounts: number;
  };
  byMethod: { name: string; value: number }[];
  trends: { date: string; amount: number }[];
}

export interface DriverPerformance {
  driverName: string;
  deliveries: number;
  earnings: number;
  rating: number;
  onTimeRate: number;
  efficiency: number; // 0-100 score
}

export interface DriverReportData {
  topPerformers: DriverPerformance[];
  fleetMetrics: {
    avgRating: number;
    activeDrivers: number;
    totalEarningsDist: { name: string; value: number }[];
  };
}

export interface CustomerReportData {
  summary: {
    newCustomers: number;
    activeCustomers: number;
    churnRate: number;
    avgLTV: number;
  };
  topClients: { name: string; orders: number; ltv: number }[];
  acquisitionTrend: { date: string; count: number }[];
}
