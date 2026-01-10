
import api from '../axios.config';
import { 
  ReportType, DateRange, OrdersReportData, 
  RevenueReportData, DriverReportData, CustomerReportData 
} from '../../types/report.types';

export const reportsApi = {
  getOrdersReport: (range: DateRange) => api.get<OrdersReportData>('/reports/orders', { params: range }),
  getRevenueReport: (range: DateRange) => api.get<RevenueReportData>('/reports/revenue', { params: range }),
  getDriverReport: (range: DateRange) => api.get<DriverReportData>('/reports/drivers', { params: range }),
  getCustomerReport: (range: DateRange) => api.get<CustomerReportData>('/reports/customers', { params: range }),
};
