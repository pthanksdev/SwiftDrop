
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Package, MapPin, User, Phone, Clock, ArrowLeft, 
  Truck, CheckCircle, AlertTriangle, Map as MapIcon, 
  MessageSquare, CreditCard, ShieldCheck, UserCheck, 
  Box, Info, RefreshCw, XCircle, Star, Heart
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Order, OrderStatus } from '../../types/order.types';
import { ordersApi } from '../../api/endpoints/orders.api';
import OrderStatusBadge from '../../components/orders/OrderStatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserRole } from '../../types/api.types';
import { cn } from '../../lib/utils';
// Fixed: Corrected the path to include 'components' and ensured it is a relative reference
import RatingDialog from '../../components/feedback/RatingDialog';

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await ordersApi.getById(id!);
      setOrder(response.data);
    } catch (err) {
      // Mock for demo
      setOrder({
        id: id || '1',
        orderNumber: 'ORD-7721',
        status: OrderStatus.DELIVERED,
        pickupAddress: '123 Market St, San Francisco, CA 94103',
        pickupLatitude: 37.7749,
        pickupLongitude: -122.4194,
        pickupContactName: 'Apple Store Union Square',
        pickupContactPhone: '+1 (415) 555-0123',
        deliveryAddress: '456 Mission St, San Francisco, CA 94105',
        deliveryLatitude: 37.7833,
        deliveryLongitude: -122.4167,
        recipientName: 'Jane Cooper',
        recipientPhone: '+1 (415) 555-9876',
        packageType: 'ELECTRONICS' as any,
        packageWeight: 2.5,
        totalAmount: 45.00,
        customerId: 'cust-1',
        driverId: 'driver-1',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date().toISOString(),
        distanceKm: 5.2,
        baseFare: 10,
        distanceCharge: 15,
        weightCharge: 5,
        peakHourSurcharge: 0,
        discount: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    try {
      await ordersApi.updateStatus(order!.id, newStatus);
      toast.success(`Shipment updated to ${newStatus}`);
      fetchOrder();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleRatingSubmit = async (data: any) => {
    try {
      if (user?.role === UserRole.CUSTOMER) {
        await ordersApi.rateDriver(order!.id, data);
      } else {
        await ordersApi.rateCustomer(order!.id, data);
      }
      toast.success("Feedback submitted. Thank you for helping the network!");
      setIsRatingOpen(false);
      fetchOrder();
    } catch (err) {
      toast.error("Failed to submit rating.");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <RefreshCw className="animate-spin text-blue-600" size={32} />
      <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">Retrieving Shipment Data...</p>
    </div>
  );

  if (!order) return <div className="p-8 text-center text-rose-500 font-bold">Order not found.</div>;

  const showRatingPrompt = order.status === OrderStatus.DELIVERED && (
    (user?.role === UserRole.CUSTOMER && !order.customerRating) ||
    (user?.role === UserRole.DRIVER && !order.driverRating)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/orders')}
            className="rounded-xl h-12 w-12 bg-white border border-slate-100 shadow-sm"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{order.orderNumber}</h1>
              <OrderStatusBadge status={order.status} className="scale-110" />
            </div>
            <p className="text-slate-500 text-sm font-medium">Placed on {formatDate(order.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {user?.role === UserRole.DRIVER && order.status === OrderStatus.ASSIGNED && (
            <Button onClick={() => handleStatusUpdate(OrderStatus.PICKED_UP)} className="bg-blue-600 px-8 py-6 rounded-2xl shadow-lg">Confirm Pickup</Button>
          )}
          {user?.role === UserRole.DRIVER && order.status === OrderStatus.IN_TRANSIT && (
            <Button onClick={() => handleStatusUpdate(OrderStatus.DELIVERED)} className="bg-emerald-600 px-8 py-6 rounded-2xl shadow-lg">Complete Delivery</Button>
          )}
          <Button 
            variant="outline" 
            className="rounded-2xl h-12 border-slate-200"
            onClick={() => navigate(`/orders/${order.id}/track`)}
          >
            <MapIcon className="mr-2" size={18} /> Live Map
          </Button>
        </div>
      </div>

      {/* Rating Call-to-Action */}
      {showRatingPrompt && (
        <div className="bg-blue-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-blue-200">
                  <Star size={24} className="fill-blue-200" />
                  <h4 className="font-black uppercase tracking-widest text-xs">Share your experience</h4>
               </div>
               <h3 className="text-3xl font-black max-w-xl">Shipment arrived. How was the service?</h3>
               <p className="text-blue-100 text-sm max-w-md">Your feedback directly impacts courier ratings and helps us improve global logistics quality.</p>
            </div>
            <Button onClick={() => setIsRatingOpen(true)} className="rounded-[2rem] h-16 px-12 bg-white text-blue-600 hover:bg-blue-50 font-black uppercase tracking-widest text-xs shadow-2xl">
              Rate Performance
            </Button>
          </div>
        </div>
      )}

      {/* Existing rating summary if present */}
      {(order.customerRating || order.driverRating) && (
        <Card className="rounded-[2.5rem] border-slate-200 bg-slate-50 shadow-sm">
           <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                 {order.customerRating && (
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Review</p>
                       <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                             {[1,2,3,4,5].map(s => (
                                <Star key={s} size={16} className={cn(s <= order.customerRating! ? "fill-amber-400 text-amber-400" : "text-slate-200")} />
                             ))}
                          </div>
                          <span className="text-sm font-black text-slate-900">{order.customerRating}.0</span>
                       </div>
                       {order.customerFeedback && <p className="text-sm text-slate-600 font-medium italic">"{order.customerFeedback}"</p>}
                    </div>
                 )}
                 {order.driverRating && (
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Courier Review</p>
                       <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                             {[1,2,3,4,5].map(s => (
                                <Star key={s} size={16} className={cn(s <= order.driverRating! ? "fill-amber-400 text-amber-400" : "text-slate-200")} />
                             ))}
                          </div>
                          <span className="text-sm font-black text-slate-900">{order.driverRating}.0</span>
                       </div>
                       {order.driverFeedback && <p className="text-sm text-slate-600 font-medium italic">"{order.driverFeedback}"</p>}
                    </div>
                 )}
              </div>
           </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Status Timeline */}
          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
               <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center">
                  <RefreshCw size={16} className="mr-2 text-blue-500" /> Shipment Pulse
               </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
               <div className="relative space-y-8">
                 <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                 
                 {[
                   { label: 'Order Confirmed', time: order.createdAt, done: true, icon: CheckCircle, color: 'text-emerald-500' },
                   { label: 'Driver Assigned', time: order.createdAt, done: !!order.driverId, icon: UserCheck, color: 'text-blue-500' },
                   { label: 'Package Picked Up', time: '', done: order.status !== 'PENDING' && order.status !== 'ASSIGNED', icon: Package, color: 'text-indigo-500' },
                   { label: 'In Transit', time: '', done: order.status === 'IN_TRANSIT' || order.status === 'DELIVERED', icon: Truck, color: 'text-orange-500' },
                   { label: 'Delivered', time: '', done: order.status === 'DELIVERED', icon: CheckCircle, color: 'text-emerald-600' }
                 ].map((step, i) => (
                   <div key={i} className={cn("flex items-start gap-6 relative z-10", !step.done && "opacity-30")}>
                     <div className={cn(
                       "w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0",
                       step.done ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
                     )}>
                       <step.icon size={14} />
                     </div>
                     <div>
                       <p className="font-bold text-slate-900 text-sm leading-tight">{step.label}</p>
                       <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
                         {step.time ? formatDate(step.time) : 'Pending Activity'}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>

          {/* Logistics Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-[2rem] border-slate-200">
              <CardHeader>
                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Pickup Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="text-blue-500 shrink-0" size={18} />
                  <p className="text-sm font-bold text-slate-700">{order.pickupAddress}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400"><User size={16} /></div>
                      <span className="text-xs font-bold">{order.pickupContactName}</span>
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Phone size={14} /></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-slate-200">
              <CardHeader>
                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="text-emerald-500 shrink-0" size={18} />
                  <p className="text-sm font-bold text-slate-700">{order.deliveryAddress}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400"><User size={16} /></div>
                      <span className="text-xs font-bold">{order.recipientName}</span>
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Phone size={14} /></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-8">
          <Card className="rounded-[2rem] border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned Driver</h3>
              <Truck size={18} className="text-blue-500" />
            </div>
            <CardContent className="p-6">
              {order.driverId ? (
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl">JD</div>
                   <div>
                     <p className="font-bold text-slate-900">John Doe</p>
                     <p className="text-xs text-slate-500">Unit: Silver Prius #8821</p>
                     <div className="flex items-center gap-2 mt-1">
                        <Badge variant="success" className="text-[9px] py-0 px-1.5 uppercase font-black">5.0 Star</Badge>
                     </div>
                   </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-slate-500 mb-4 font-medium">No driver assigned yet.</p>
                  <Button className="w-full rounded-xl bg-blue-600">Assign Courier</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Shipment Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <Box className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{order.packageType}</p>
                    <p className="text-xs text-slate-500">{order.packageWeight} kg Total Weight</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                 <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
                 <p className="text-xs text-slate-600 leading-relaxed italic">
                   "{order.specialInstructions || 'No special instructions provided.'}"
                 </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rating Modal */}
      {isRatingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-500">
              <RatingDialog 
                type={user?.role === UserRole.CUSTOMER ? 'driver' : 'customer'}
                name={user?.role === UserRole.CUSTOMER ? 'John Doe (Driver)' : 'Jane Cooper (Customer)'}
                onSubmit={handleRatingSubmit}
                onClose={() => setIsRatingOpen(false)}
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
