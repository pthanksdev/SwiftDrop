
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  Package, Truck, Clock, CheckCircle, 
  DollarSign, MapPin, User, Activity, 
  TrendingUp, CreditCard, Star, Calendar
} from 'lucide-react';
import { analyticsApi } from '../api/endpoints/analytics.api';
import { UserRole } from '../types/api.types';
import { DashboardCards } from '../components/analytics/DashboardCards';
import { OrderChart } from '../components/analytics/OrderChart';
import { RevenueChart } from '../components/analytics/RevenueChart';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Mocking API delay and data for demo
        const [statsRes, ordersRes, revenueRes] = await Promise.all([
          analyticsApi.getDashboardStats().catch(() => ({ data: null })),
          analyticsApi.getOrderStats().catch(() => ({ data: null })),
          analyticsApi.getRevenueStats().catch(() => ({ data: null })),
        ]);

        // Fallback data if API is not implemented
        const mockStats = {
          orders: user?.role === UserRole.DRIVER ? 14 : 2350,
          revenue: user?.role === UserRole.DRIVER ? 425.50 : 45231.89,
          drivers: 84,
          pending: 12
        };

        const mockCharts = [
          { name: 'Mon', orders: 40, revenue: 2400 },
          { name: 'Tue', orders: 30, revenue: 1398 },
          { name: 'Wed', orders: 20, revenue: 9800 },
          { name: 'Thu', orders: 27, revenue: 3908 },
          { name: 'Fri', orders: 18, revenue: 4800 },
          { name: 'Sat', orders: 23, revenue: 3800 },
          { name: 'Sun', orders: 34, revenue: 4300 },
        ];

        setDashboardData(statsRes.data || mockStats);
        setChartData(ordersRes.data || mockCharts);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.role]);

  const getAdminStats = () => [
    { title: 'Total Revenue', value: `$${dashboardData?.revenue.toLocaleString()}`, trend: '+20.1%', trendType: 'up' as const, icon: DollarSign, color: 'bg-emerald-500' },
    { title: 'Active Orders', value: `+${dashboardData?.orders}`, trend: '+18.1%', trendType: 'up' as const, icon: Package, color: 'bg-blue-500' },
    { title: 'Drivers Online', value: dashboardData?.drivers, trend: '+4%', trendType: 'up' as const, icon: Truck, color: 'bg-indigo-500' },
    { title: 'Pending Dispatch', value: dashboardData?.pending, trend: '-2%', trendType: 'down' as const, icon: Clock, color: 'bg-amber-500' },
  ];

  const getDriverStats = () => [
    { title: "Today's Earnings", value: `$${dashboardData?.revenue}`, trend: '+12%', trendType: 'up' as const, icon: DollarSign, color: 'bg-emerald-500' },
    { title: 'Deliveries Today', value: dashboardData?.orders, trend: '+2', trendType: 'up' as const, icon: Package, color: 'bg-blue-500' },
    { title: 'Current Rating', value: '4.95', trend: '+0.02', trendType: 'up' as const, icon: Star, color: 'bg-amber-500' },
    { title: 'Active Hours', value: '6.5h', trend: '+1.5h', trendType: 'up' as const, icon: Activity, color: 'bg-indigo-500' },
  ];

  const getCustomerStats = () => [
    { title: 'Active Shipments', value: '3', trend: 'Same', trendType: 'up' as const, icon: Package, color: 'bg-blue-500' },
    { title: 'Total Shipments', value: '24', trend: '+3', trendType: 'up' as const, icon: Activity, color: 'bg-emerald-500' },
    { title: 'Amount Spent', value: '$842.20', trend: '+15%', trendType: 'up' as const, icon: CreditCard, color: 'bg-indigo-500' },
    { title: 'Saved Places', value: '4', trend: 'New', trendType: 'up' as const, icon: MapPin, color: 'bg-amber-500' },
  ];

  const renderRoleSpecificDashboard = () => {
    switch (user?.role) {
      case UserRole.DRIVER:
        return (
          <div className="space-y-6">
            <DashboardCards stats={getDriverStats()} loading={loading} />
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Task</CardTitle>
                  <CardDescription>Details for your active delivery.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                         <Package size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">Order #ORD-9902</p>
                        <p className="text-xs text-slate-500">Pick up: 123 Market St, SF</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => navigate('/orders/1/track')}>View Map</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your last few completed tasks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span className="text-sm font-bold text-slate-700">Delivered Package #ORD-223{i}</span>
                      </div>
                      <span className="text-xs font-black text-slate-400">2h ago</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case UserRole.CUSTOMER:
        return (
          <div className="space-y-6">
            <DashboardCards stats={getCustomerStats()} loading={loading} />
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Active Shipments</CardTitle>
                    <CardDescription>Packages currently in route to you.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/orders')}>View All</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                          <Truck size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Electronics - iPhone 15 Pro</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Arriving Today 4:00 PM</p>
                        </div>
                      </div>
                      <Badge variant="secondary">In Transit</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Track</CardTitle>
                  <CardDescription>Enter order ID to track.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <input 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="e.g. ORD-7721"
                     />
                     <Button className="w-full">Locate Package</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default: // ADMIN or DISPATCHER
        return (
          <div className="space-y-6">
            <DashboardCards stats={getAdminStats()} loading={loading} />
            <div className="grid gap-6 lg:grid-cols-2">
              <OrderChart data={chartData} loading={loading} />
              <RevenueChart data={chartData} loading={loading} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Live Fleet Activity</CardTitle>
                <CardDescription>Real-time status of your active drivers.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                       <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                           <User size={20} />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">Driver Unit #DL-20{i}</p>
                            <p className="text-xs text-slate-400">Last seen: Sunset District, 2m ago</p>
                         </div>
                       </div>
                       <Badge variant="success">Online</Badge>
                     </div>
                   ))}
                 </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, <span className="text-blue-600">{user?.firstName}</span>
          </h2>
          <p className="text-slate-500 font-medium">Here's what's happening in your network today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
             <Calendar className="mr-2 h-4 w-4" /> Today
          </Button>
          <Button size="sm" onClick={() => navigate('/orders/create')}>
            Dispatch Order
          </Button>
        </div>
      </div>

      {renderRoleSpecificDashboard()}
    </div>
  );
};

export default Dashboard;
