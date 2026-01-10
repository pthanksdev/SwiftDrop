
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, Package, 
  Plus, History, Activity, Star, 
  Trash2, Edit3, ShieldCheck, Globe, Clock,
  ChevronRight, ExternalLink
} from 'lucide-react';
import { customersApi } from '../../api/endpoints/customers.api';
import { Customer, Address } from '../../types/customer.types';
import { Order } from '../../types/order.types';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import OrderStatusBadge from '../../components/orders/OrderStatusBadge';

const CustomerDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'stats'>('orders');

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const [custRes, ordersRes] = await Promise.all([
          customersApi.getById(id!),
          customersApi.getOrders(id!)
        ]);
        setCustomer(custRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        // Mock data for demo if API fails
        setCustomer({
          id: id!,
          userId: 'u123',
          totalOrders: 42,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
            phone: '+1 (555) 012-3456'
          }
        });
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, [id]);

  if (loading || !customer) return (
    <div className="h-screen flex items-center justify-center">
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
            onClick={() => navigate('/customers')}
            className="rounded-xl h-12 w-12 bg-white border border-slate-100 shadow-sm"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {customer.user?.firstName} {customer.user?.lastName}
              </h1>
              <Badge variant="success" className="bg-emerald-100 text-emerald-700 font-black text-[9px] px-2 py-0.5">ACTIVE</Badge>
            </div>
            <p className="text-slate-500 text-sm font-medium">Customer ID: {customer.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => navigate('/orders/create', { state: { customerId: customer.id } })}
            className="rounded-2xl h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20"
          >
            <Package className="mr-2" size={18} /> New Shipment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 bg-slate-900 text-white flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-3xl font-black mb-4 shadow-2xl">
                {customer.user?.firstName.charAt(0)}{customer.user?.lastName.charAt(0)}
              </div>
              <h3 className="font-bold text-lg leading-tight">{customer.user?.firstName} {customer.user?.lastName}</h3>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-black">Private Client</p>
            </div>
            <CardContent className="p-8 space-y-6">
               <div className="space-y-4">
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"><Mail size={16} /></div>
                     <div className="min-w-0">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{customer.user?.email}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"><Phone size={16} /></div>
                     <div className="min-w-0">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{customer.user?.phone}</p>
                     </div>
                  </div>
               </div>
               
               <div className="pt-6 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                     <span className="font-black text-slate-400 uppercase tracking-widest">Score</span>
                     <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span className="font-bold">4.9</span>
                     </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="font-black text-slate-400 uppercase tracking-widest">Joined</span>
                     <span className="font-bold">{new Date(customer.createdAt).toLocaleDateString()}</span>
                  </div>
               </div>
            </CardContent>
          </Card>

          <div className="bg-emerald-600 rounded-[2rem] p-8 text-white space-y-4 shadow-xl shadow-emerald-600/20">
             <div className="flex items-center gap-3">
                <ShieldCheck size={24} />
                <h4 className="font-bold">Verified Profile</h4>
             </div>
             <p className="text-xs text-emerald-100 leading-relaxed">
                This customer has a valid payment method on file and 100% completion rate on last 10 shipments.
             </p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="lg:col-span-3 space-y-8">
           <div className="flex items-center bg-slate-100/50 p-1.5 rounded-2xl w-fit">
              {[
                { id: 'orders', icon: History, label: 'Order History' },
                { id: 'addresses', icon: MapPin, label: 'Address Book' },
                { id: 'stats', icon: Activity, label: 'Logistics Analytics' }
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

           {activeTab === 'orders' && (
              <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                   <div className="flex justify-between items-center">
                      <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Shipment Log</CardTitle>
                      <Badge variant="outline" className="rounded-full">{orders.length} Total</Badge>
                   </div>
                </CardHeader>
                <CardContent className="p-0">
                   {orders.length > 0 ? (
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50/30 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <tr>
                              <th className="px-8 py-4">Shipment</th>
                              <th className="px-8 py-4">Destination</th>
                              <th className="px-8 py-4">Status</th>
                              <th className="px-8 py-4">Date</th>
                              <th className="px-8 py-4">Total</th>
                              <th className="px-8 py-4"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {orders.map((order) => (
                              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5">
                                   <p className="text-sm font-black text-slate-900">{order.orderNumber}</p>
                                   <p className="text-[10px] text-slate-400 uppercase font-bold">{order.packageType}</p>
                                </td>
                                <td className="px-8 py-5">
                                   <p className="text-xs font-medium text-slate-600 truncate max-w-[180px]">{order.deliveryAddress}</p>
                                </td>
                                <td className="px-8 py-5">
                                   <OrderStatusBadge status={order.status} className="scale-90 origin-left" />
                                </td>
                                <td className="px-8 py-5">
                                   <p className="text-xs text-slate-500 font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </td>
                                <td className="px-8 py-5">
                                   <p className="text-sm font-black text-blue-600">{formatCurrency(order.totalAmount)}</p>
                                </td>
                                <td className="px-8 py-5 text-right">
                                   <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      onClick={() => navigate(`/orders/${order.id}`)}
                                      className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                   >
                                      <ChevronRight size={18} />
                                   </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                     </div>
                   ) : (
                     <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                           <History size={32} />
                        </div>
                        <h4 className="font-bold text-slate-900">No shipments found</h4>
                        <p className="text-sm text-slate-500">This customer hasn't placed any orders yet.</p>
                     </div>
                   )}
                </CardContent>
              </Card>
           )}

           {activeTab === 'addresses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-5 duration-500">
                 <Card className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-all group cursor-pointer">
                    <CardContent className="h-full flex flex-col items-center justify-center p-12 text-center">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                          <Plus size={24} />
                       </div>
                       <h4 className="font-black text-sm uppercase tracking-widest text-slate-900">Add New Location</h4>
                       <p className="text-xs text-slate-500 mt-2">Register a frequent pickup or delivery address.</p>
                    </CardContent>
                 </Card>

                 {[1].map((i) => (
                    <Card key={i} className="rounded-[2.5rem] border-slate-200 shadow-sm relative group overflow-hidden">
                       <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg bg-white shadow-sm"><Edit3 size={14} /></Button>
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg bg-white shadow-sm text-rose-500"><Trash2 size={14} /></Button>
                       </div>
                       <CardContent className="p-8 space-y-6">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><MapPin size={20} /></div>
                             <div>
                                <h4 className="font-bold text-slate-900">Primary Office</h4>
                                <Badge className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border-none">Default</Badge>
                             </div>
                          </div>
                          <div className="space-y-1">
                             <p className="text-sm font-medium text-slate-600">789 Broadway Ave, Suite 200</p>
                             <p className="text-sm font-medium text-slate-600">New York, NY 10003</p>
                          </div>
                          <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                             <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <Globe size={14} /> 40.7306, -73.9352
                             </div>
                             <Button variant="ghost" className="text-xs font-bold text-blue-600 p-0 h-auto">View on Map</Button>
                          </div>
                       </CardContent>
                    </Card>
                 ))}
              </div>
           )}

           {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-5 duration-500">
                 <Card className="rounded-[2.5rem] border-slate-200 p-8 space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Spend Overview</h4>
                    <div className="flex items-end justify-between">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Lifetime Value</p>
                          <h2 className="text-4xl font-black text-slate-900">{formatCurrency(1250.40)}</h2>
                       </div>
                       <Badge variant="success" className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">+12.4% MoM</Badge>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600 w-[65%]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                       <span>Last Month: $340.00</span>
                       <span>Target: $2000.00</span>
                    </div>
                 </Card>

                 <Card className="rounded-[2.5rem] border-slate-200 p-8 space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Logistics Health</h4>
                    <div className="space-y-4">
                       {[
                         { label: 'Success Rate', value: '100%', color: 'bg-emerald-500' },
                         { label: 'Return Rate', value: '2.4%', color: 'bg-blue-500' },
                         { label: 'Claim Rate', value: '0%', color: 'bg-emerald-500' }
                       ].map((stat, i) => (
                         <div key={i} className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-600">{stat.label}</span>
                            <div className="flex items-center gap-3">
                               <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className={cn("h-full", stat.color)} style={{ width: stat.value }}></div>
                               </div>
                               <span className="text-xs font-black text-slate-900">{stat.value}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </Card>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
