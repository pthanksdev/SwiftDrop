
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Package, MapPin, Truck, CheckCircle, Clock, 
  ChevronLeft, Phone, MessageSquare, ShieldCheck,
  Star, Info, Activity
} from 'lucide-react';
import { ordersApi } from '../../api/endpoints/orders.api';
import { Order, OrderStatus } from '../../types/order.types';
import TrackingMap from '../../components/tracking/TrackingMap';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { socketService } from '../../services/socket.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface TrackingPageProps {
  isPublic?: boolean;
}

const TrackingPage: React.FC<TrackingPageProps> = ({ isPublic = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [driverPos, setDriverPos] = useState<[number, number] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Sync with global order list for status changes
  const globalOrders = useSelector((state: RootState) => state.orders.list);
  const matchedGlobalOrder = globalOrders.find(o => o.id === id);

  useEffect(() => {
    if (matchedGlobalOrder) {
      setOrder(matchedGlobalOrder);
    }
  }, [matchedGlobalOrder]);

  useEffect(() => {
    const fetchTrackingData = async () => {
      setLoading(true);
      try {
        const res = await ordersApi.getById(id!);
        setOrder(res.data);
        setDriverPos([res.data.pickupLatitude, res.data.pickupLongitude]);
      } catch (err) {
        // Mock data for demo
        const mockOrder: any = {
          id: id || '1',
          orderNumber: 'ORD-7231',
          status: OrderStatus.IN_TRANSIT,
          pickupAddress: '123 Market St, San Francisco',
          deliveryAddress: '456 Mission St, San Francisco',
          pickupLatitude: 37.7749,
          pickupLongitude: -122.4194,
          deliveryLatitude: 37.7833,
          deliveryLongitude: -122.4167,
          recipientName: 'Jane Cooper',
          totalAmount: 45.00,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          packageType: 'PARCEL',
        };
        setOrder(mockOrder);
        setDriverPos([mockOrder.pickupLatitude, mockOrder.pickupLongitude]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();

    // Only listen for specific driver movement here
    socketService.onDriverLocationUpdate((data) => {
      if (data.orderId === id) setDriverPos([data.latitude, data.longitude]);
    });

    return () => {
      // Logic for cleanup of specific listeners if needed
    };
  }, [id]);

  if (loading || !order) return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
       <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-black text-xs uppercase tracking-[0.3em]">Calibrating Satellite Tracking...</p>
       </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[50] flex flex-col bg-slate-950 font-sans">
      {/* Floating Header */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex justify-between items-start pointer-events-none">
        <Button 
          variant="secondary" 
          className="pointer-events-auto rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl h-14 w-14 flex items-center justify-center"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </Button>

        <div className="pointer-events-auto flex flex-col items-end space-y-2">
           <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 px-6 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                 <Truck size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Live Shipment Status</p>
                 <h2 className="text-white font-black leading-none">{order.orderNumber}</h2>
              </div>
              <div className="h-8 w-px bg-white/10 mx-2"></div>
              <Badge variant="success" className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-black uppercase tracking-widest text-[9px]">
                {order.status.replace('_', ' ')}
              </Badge>
           </div>
        </div>
      </div>

      {/* Main Map Background */}
      <TrackingMap 
        order={order} 
        driverLocation={driverPos} 
        className="flex-1"
      />

      {/* Floating Info Panel */}
      <div className="absolute bottom-10 left-6 right-6 lg:left-auto lg:right-10 lg:w-[420px] z-[1000] space-y-4">
         
         {/* Driver Contact Quick Card */}
         <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
            <div className="p-8">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                     <div className="relative">
                        <div className="w-16 h-16 bg-blue-100 rounded-[1.5rem] flex items-center justify-center font-black text-2xl text-blue-600">
                           JD
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <h3 className="font-black text-slate-900 text-lg">John Doe</h3>
                           <Badge variant="secondary" className="bg-amber-100 text-amber-700 font-black text-[9px] px-1.5"><Star size={10} className="mr-1 inline fill-amber-700" /> 4.9</Badge>
                        </div>
                        <p className="text-xs text-slate-500">SwiftDrop Elite Partner • Silver Prius</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Button size="icon" variant="outline" className="rounded-xl h-12 w-12 border-slate-100 bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors">
                        <MessageSquare size={18} />
                     </Button>
                     <Button size="icon" variant="outline" className="rounded-xl h-12 w-12 border-slate-100 bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors">
                        <Phone size={18} />
                     </Button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Distance Left</p>
                     <p className="text-xl font-black text-slate-900">1.2 <span className="text-xs text-slate-400">km</span></p>
                  </div>
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Estimated ETA</p>
                     <p className="text-xl font-black text-blue-600">~ 8 <span className="text-xs text-blue-400 opacity-70">mins</span></p>
                  </div>
               </div>

               <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 mt-1">
                        <Activity size={16} />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">Current Activity</p>
                        <p className="text-xs text-slate-500 leading-relaxed">Driver has just picked up your {order.packageType.toLowerCase()} and is currently moving towards your destination.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500" size={20} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">SwiftDrop Secure™ Tracking</span>
               </div>
               <Button variant="ghost" className="text-xs font-black text-blue-600 uppercase tracking-widest p-0 h-auto hover:bg-transparent">Help</Button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TrackingPage;
