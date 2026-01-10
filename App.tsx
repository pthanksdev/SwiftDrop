
import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/index';
import MainLayout from './components/layout/MainLayout';
import PublicLayout from './components/layout/PublicLayout';
import PrivateRoute from './routes/PrivateRoute';
import { setUser, logout } from './store/slices/authSlice';
import { updateOrderInList } from './store/slices/ordersSlice';
import { socketService } from './services/socket.service';
import api from './api/axios.config';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Lazy Loaded Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const OrdersPage = lazy(() => import('./pages/orders/OrdersPage'));
const CreateOrderPage = lazy(() => import('./pages/orders/CreateOrderPage'));
const OrderDetailsPage = lazy(() => import('./pages/orders/OrderDetailsPage'));
const TrackingPage = lazy(() => import('./pages/tracking/TrackingPage'));
const DriversPage = lazy(() => import('./pages/drivers/DriversPage'));
const CreateDriverPage = lazy(() => import('./pages/drivers/CreateDriverPage'));
const DriverDetailsPage = lazy(() => import('./pages/drivers/DriverDetailsPage'));
const CustomersPage = lazy(() => import('./pages/customers/CustomersPage'));
const CustomerDetailsPage = lazy(() => import('./pages/customers/CustomerDetailsPage'));
const PaymentsPage = lazy(() => import('./pages/payments/PaymentsPage'));
const AnalyticsPage = lazy(() => import('./pages/analytics/AnalyticsPage'));
const ReportsPage = lazy(() => import('./pages/reports/ReportsPage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));
const Profile = lazy(() => import('./pages/Profile'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const DriverApproval = lazy(() => import('./pages/admin/DriverApproval'));
const DriverMonitoring = lazy(() => import('./pages/admin/DriverMonitoring'));
const OrderManagement = lazy(() => import('./pages/admin/OrderManagement'));
const FinancialManagement = lazy(() => import('./pages/admin/FinancialManagement'));
const Pricing = lazy(() => import('./pages/admin/Pricing'));
const PromoManagement = lazy(() => import('./pages/admin/PromoManagement'));
const Refunds = lazy(() => import('./pages/admin/Refunds'));
const SystemSettings = lazy(() => import('./pages/admin/SystemSettings'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const SystemReports = lazy(() => import('./pages/admin/SystemReports'));
const AuditLogs = lazy(() => import('./pages/admin/AuditLogs'));

// Public Pages
const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const CareersPage = lazy(() => import('./pages/public/CareersPage'));
const PressPage = lazy(() => import('./pages/public/PressPage'));
const PublicTracking = lazy(() => import('./pages/public/PublicTracking'));
const LegalPage = lazy(() => import('./pages/public/LegalPage'));
const ApiReferencePage = lazy(() => import('./pages/public/ApiReferencePage'));

const LoadingFallback = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
    <RefreshCw className="animate-spin text-blue-600 mb-4" size={32} />
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Initializing Module...</p>
  </div>
);

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);

  // Initialize User Data
  useEffect(() => {
    if (isAuthenticated && !user) {
      api.get('/users/me')
        .then(res => dispatch(setUser(res.data)))
        .catch(() => {
          // If session is invalid on refresh, clear local state
          dispatch(logout());
        });
    }
  }, [isAuthenticated, user, dispatch]);

  // Global Real-time Socket Management
  useEffect(() => {
    if (isAuthenticated && token) {
      socketService.connect(token);
      
      // Listen for global order updates
      socketService.onOrderUpdate((updatedOrder) => {
        dispatch(updateOrderInList(updatedOrder));
        
        // Show non-intrusive status change alert
        toast.info(`Shipment ${updatedOrder.orderNumber}`, {
          description: `Status changed to ${updatedOrder.status.replace('_', ' ')}`,
          duration: 4000,
        });
      });

      // Listen for critical system alerts
      socketService.onSystemAlert((alert) => {
        toast.warning(alert.title || 'System Alert', {
          description: alert.message
        });
      });
    }

    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated, token, dispatch]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Marketing Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/tracking" element={<PublicTracking />} />
          <Route path="/api" element={<ApiReferencePage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/cookies" element={<LegalPage type="cookies" />} />
          <Route path="/pricing" element={<div className="py-40 text-center"><h1 className="text-4xl font-black">Enterprise Pricing</h1><p className="text-slate-500 mt-4">Contact our sales team for custom fleet volume rates.</p></div>} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        
        {/* Dashboard Routes */}
        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/create" element={<CreateOrderPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />
          <Route path="orders/:id/track" element={<TrackingPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="drivers/create" element={<CreateDriverPage />} />
          <Route path="drivers/:id" element={<DriverDetailsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/:id" element={<CustomerDetailsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<Profile />} />
          
          {/* Admin Section */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/approvals" element={<DriverApproval />} />
          <Route path="admin/monitoring" element={<DriverMonitoring />} />
          <Route path="admin/orders" element={<OrderManagement />} />
          <Route path="admin/finance" element={<FinancialManagement />} />
          <Route path="admin/pricing" element={<Pricing />} />
          <Route path="admin/promos" element={<PromoManagement />} />
          <Route path="admin/refunds" element={<Refunds />} />
          <Route path="admin/analytics" element={<Analytics />} />
          <Route path="admin/reports" element={<SystemReports />} />
          <Route path="admin/audit" element={<AuditLogs />} />
          <Route path="admin/settings" element={<SystemSettings />} />
        </Route>

        {/* Public Global Tracking Overlay */}
        <Route path="/public-tracking/:orderId" element={<TrackingPage isPublic={true} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
