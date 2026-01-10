
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Truck, Star, Activity, MapPin, Phone, 
  MessageSquare, ArrowLeft, ShieldCheck, 
  Clock, CheckCircle, AlertCircle, TrendingUp,
  CreditCard, User, History
} from 'lucide-react';
import { Driver, AvailabilityStatus } from '../../types/driver.types';
import { driversApi } from '../../api/endpoints/drivers.api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import ReviewsList from '../../components/feedback/ReviewsList';

const DriverDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'activity' | 'reviews' | 'docs'>('activity');

  useEffect(() => {
    const fetchDriverData = async () => {
      setLoading(true);
      try {
        const res = await driversApi.getById(id!);
        setDriver(res.data);
      } catch (err) {
        // Mock data
        setDriver({
          id: id || '1',
          userId: 'u1',
          vehicleType: 'VAN',
          vehiclePlate: 'SWFT-7721',
          licenseNumber: 'DL-99228811',
          licenseExpiry: '2026-12-31',
          currentLatitude: 37.7749,
          currentLongitude: -122.4194,
          availabilityStatus: AvailabilityStatus.ONLINE,
          rating: 4.9,
          totalDeliveries: 1422,
          completedDeliveries: 1405,
          cancelledDeliveries: 17,
          totalEarnings: 8240.50,
          createdAt: new Date(Date.now() - 31536000000).toISOString(),
          updatedAt: new Date().toISOString(),
          lastLocationUpdate: new Date().toISOString(),
          user: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@swiftdrop.io',
            phone: '+1 (415) 555-0199'
          }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDriverData();
  }, [id]);

  const mockReviews = [
    { id: 'r1', authorName: 'Alice Johnson', rating: 5, feedback: 'Extremely professional and delivered 10 minutes early! Package was in perfect condition.', tags: ['On Time', 'Careful Handling'], date: new Date().toISOString(), isVerified: true },
    { id: 'r2', authorName: 'Bob Smith', rating: 4, feedback: 'Great service, just a minor delay due to traffic.', tags: ['Professional', 'Polite'], date: new Date(Date.now() - 86400000).toISOString(), isVerified: true },
    { id: 'r3', authorName: 'Charlie V.', rating: 5, feedback: 'Best courier I had so far. Called ahead to confirm building access.', tags: ['Great Communication', 'On Time'], date: new Date(Date.now() - 172800000).toISOString(), isVerified: true },
  ];

  if (loading || !driver) return (
    <div className="h-96 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/drivers')}
            className="rounded-xl h-12 w-12 bg-white border border-slate-100 shadow-sm"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {driver.user?.firstName} {driver.user?.lastName}
              </h1>
              <Badge className={cn(
                "font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase",
                driver.availabilityStatus === 'ONLINE' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
              )}>
                {driver.availabilityStatus}
              </Badge>
            </div>
            <p className="text-slate-500 text-sm font-medium">Partner since {new Date(driver.createdAt).getFullYear()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-12 border-slate-200"><MessageSquare className="mr-2" size={18} /> Chat</Button>
          <Button className="rounded-2xl h-12 px-8 font-bold bg-blue-600 shadow-lg shadow-blue-500/20">Manage Access</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Earnings', value: formatCurrency(driver.totalEarnings), icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Average Rating', value: driver.rating.toFixed(1), icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Deliveries', value: driver.totalDeliveries, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Completion Rate', value: '98.5%', icon: CheckCircle, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <Card key={i} className="rounded-[2rem] border-slate-200">
            <CardContent className="p-6">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center bg-slate-100/50 p-1.5 rounded-2xl w-fit">
        {[
          { id: 'activity', icon: Activity, label: 'Work Log' },
          { id: 'reviews', icon: Star, label: 'Performance Feedback' },
          { id: 'docs', icon: ShieldCheck, label: 'Fleet Compliance' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center transition-all",
              activeTab === tab.id 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            <tab.icon size={14} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'activity' && (
            <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden bg-white animate-in slide-in-from-bottom-2 duration-500">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center">
                  <History size={16} className="mr-2 text-blue-500" /> Recent Assignment Log
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead className="bg-slate-50/30 text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <tr>
                         <th className="px-8 py-4">Order ID</th>
                         <th className="px-8 py-4">Status</th>
                         <th className="px-8 py-4">Earnings</th>
                         <th className="px-8 py-4">Date</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                       {[1, 2, 3, 4, 5].map((i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-5 text-sm font-bold text-slate-900">#ORD-99{i}2</td>
                           <td className="px-8 py-5">
                              <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-none font-black text-[9px] px-2 py-0.5">COMPLETED</Badge>
                           </td>
                           <td className="px-8 py-5 text-sm font-black text-blue-600">$12.50</td>
                           <td className="px-8 py-5 text-xs text-slate-500 font-medium">{formatDate(new Date().toISOString())}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'reviews' && (
            <div className="animate-in slide-in-from-bottom-2 duration-500">
               <ReviewsList reviews={mockReviews} />
            </div>
          )}
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden bg-slate-900 text-white">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned Unit</h3>
                  <p className="font-bold text-lg">{driver.vehicleType}</p>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Plate Number</span>
                  <span className="text-sm font-bold">{driver.vehiclePlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">License ID</span>
                  <span className="text-sm font-bold">{driver.licenseNumber}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm p-8 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Phone size={18} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                  <p className="text-sm font-bold text-slate-900">{driver.user?.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><User size={18} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{driver.user?.email}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailsPage;
