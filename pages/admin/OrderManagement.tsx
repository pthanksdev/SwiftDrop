import React, { useState, useEffect, useCallback } from 'react';
import { 
  Package, Search, Filter, RefreshCw, 
  MoreVertical, CheckCircle, XCircle, 
  Truck, DollarSign, Clock, AlertTriangle,
  ChevronRight, Download, Eye, Edit3,
  UserCheck, History, ArrowRight, X,
  ExternalLink, CreditCard, Ban
} from 'lucide-react';
import { adminApi } from '../../api/endpoints/admin.api';
import { Order, OrderStatus } from '../../types/order.types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import OrderStatusBadge from '../../components/orders/OrderStatusBadge';
import OrderAuditLog from '../../components/admin/OrderAuditLog';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrderForAudit, setSelectedOrderForAudit] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getOrders();
      setOrders((res as any).data?.content || (res as any).data || []);
    } catch (err) {
      // High-fidelity mock data updated to satisfy Order interface properties
      setOrders([
        { 
          id: '1', orderNumber: 'ORD-9901', status: OrderStatus.PENDING, 
          recipientName: 'Sarah Jenkins', packageType: 'ELECTRONICS' as any, 
          totalAmount: 125.40, createdAt: new Date(Date.now() - 10000000).toISOString(),
          // Added missing required properties
          updatedAt: new Date().toISOString(),
          pickupContactName: 'Warehouse Admin',
          pickupContactPhone: '555-0111',
          recipientPhone: '555-0222',
          packageWeight: 2.5,
          pickupAddress: 'Warehouse A', deliveryAddress: 'Residence 102',
          pickupLatitude: 0, pickupLongitude: 0, deliveryLatitude: 0, deliveryLongitude: 0,
          customerId: 'c1', distanceKm: 12, baseFare: 10, distanceCharge: 20, weightCharge: 5, peakHourSurcharge: 0, discount: 0
        },
        { 
          id: '2', orderNumber: 'ORD-9902', status: OrderStatus.IN_TRANSIT, 
          recipientName: 'Mark Vargo', packageType: 'FOOD' as any, 
          totalAmount: 42.10, createdAt: new Date(Date.now() - 5000000).toISOString(),
          // Added missing required properties
          updatedAt: new Date().toISOString(),
          pickupContactName: 'Kitchen Lead',
          pickupContactPhone: '555-0333',
          recipientPhone: '555-0444',
          packageWeight: 1.2,
          pickupAddress: 'Gourmet Kitchen', deliveryAddress: 'Office Park B',
          driverId: 'd1', pickupLatitude: 0, pickupLongitude: 0, deliveryLatitude: 0, deliveryLongitude: 0,
          customerId: 'c2', distanceKm: 4, baseFare: 10, distanceCharge: 10, weightCharge: 5, peakHourSurcharge: 0, discount: 0
        },
        { 
          id: '3', orderNumber: 'ORD-9903', status: OrderStatus.FAILED, 
          recipientName: 'Elena Gilbert', packageType: 'DOCUMENT' as any, 
          totalAmount: 15.00, createdAt: new Date(Date.now() - 15000000).toISOString(),
          // Added missing required properties
          updatedAt: new Date().toISOString(),
          pickupContactName: 'Legal Assistant',
          pickupContactPhone: '555-0555',
          recipientPhone: '555-0666',
          packageWeight: 0.5,
          pickupAddress: 'Legal Plaza', deliveryAddress: 'Post Box 44',
          pickupLatitude: 0, pickupLongitude: 0, deliveryLatitude: 0, deliveryLongitude: 0,
          customerId: 'c3', distanceKm: 2, baseFare: 10, distanceCharge: 5, weightCharge: 0, peakHourSurcharge: 0, discount: 0
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const toggleOrderSelection = (id: string) => {
    setSelectedOrders(prev => prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]);
  };

  const handleBulkStatusUpdate = async (status: OrderStatus) => {
    if (selectedOrders.length === 0) return;
    try {
      await adminApi.bulkUpdateOrders(selectedOrders, status);
      toast.success(`Updated ${selectedOrders.length} shipments`);
      fetchOrders();
      setSelectedOrders([]);
    } catch (err) {
      toast.error('Bulk operation failed');
    }
  };

  const filteredOrders = orders.filter(o => 
    (o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.recipientName.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'ALL' || o.status === statusFilter)
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order Oversight</h1>
          <p className="text-slate-500 font-medium">Intervene and manage system-wide shipment lifecycle.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-12 border-slate-200">
            <Download size={16} className="mr-2" /> Export Logs
          </Button>
          <Button onClick={() => {}} className="rounded-xl h-12 px-6 bg-blue-600 shadow-lg font-bold">
            <Filter size={18} className="mr-2" /> System Filters
          </Button>
        </div>
      </div>

      {/* Exception Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Stale Shipments', count: 4, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', desc: '> 2hr inactivity' },
          { label: 'Failed Deliveries', count: 12, icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50', desc: 'Require review' },
          { label: 'Unassigned', count: 8, icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Manual route req.' },
          { label: 'Payment Issues', count: 2, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50', desc: 'Action required' }
        ].map((tile, i) => (
          <Card key={i} className="rounded-[2rem] border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", tile.bg, tile.color)}>
                   <tile.icon size={20} />
                </div>
                <Badge variant="secondary" className="bg-slate-50 text-slate-400 group-hover:text-blue-600 transition-colors">Review <ChevronRight size={10} /></Badge>
              </div>
              <h4 className="text-2xl font-black text-slate-900 leading-none">{tile.count}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{tile.label}</p>
              <p className="text-[9px] text-slate-400 font-bold mt-1 opacity-70">{tile.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Find Shipment ID, Recipient or Courier..." 
                className="pl-12 py-7 rounded-2xl bg-slate-50 border-none text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2">
             <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-6 py-4 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500/10"
             >
                <option value="ALL">Surveillance: All States</option>
                {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
             </select>
             <Button variant="ghost" onClick={fetchOrders} className="rounded-2xl h-14 w-14 border border-slate-100 bg-white">
                <RefreshCw size={18} className={cn(loading && "animate-spin")} />
             </Button>
           </div>
        </div>

        {selectedOrders.length > 0 && (
          <div className="p-4 bg-blue-600 rounded-2xl flex items-center justify-between text-white animate-in slide-in-from-top-2 duration-300">
             <div className="flex items-center gap-4">
                <span className="text-xs font-black uppercase tracking-widest">{selectedOrders.length} Shipments Selected</span>
                <div className="h-4 w-px bg-white/20"></div>
                <div className="flex gap-2">
                   <Button size="sm" variant="secondary" className="h-8 rounded-lg text-[10px] font-black uppercase" onClick={() => handleBulkStatusUpdate(OrderStatus.CANCELLED)}>Bulk Cancel</Button>
                   <Button size="sm" variant="secondary" className="h-8 rounded-lg text-[10px] font-black uppercase" onClick={() => handleBulkStatusUpdate(OrderStatus.ASSIGNED)}>Force Dispatch</Button>
                </div>
             </div>
             <button onClick={() => setSelectedOrders([])} className="p-1 hover:bg-white/10 rounded-lg"><X size={16} /></button>
          </div>
        )}
      </div>

      <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-6 w-12"></th>
                  <th className="px-8 py-6">Identity</th>
                  <th className="px-8 py-6">Logistics Relay</th>
                  <th className="px-8 py-6">State</th>
                  <th className="px-8 py-6">Financials</th>
                  <th className="px-8 py-6 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className={cn("hover:bg-slate-50/30 transition-colors group", selectedOrders.includes(o.id) && "bg-blue-50/30")}>
                    <td className="px-8 py-6">
                       <input 
                        type="checkbox" 
                        checked={selectedOrders.includes(o.id)}
                        onChange={() => toggleOrderSelection(o.id)}
                        className="w-5 h-5 rounded-lg border-2 border-slate-200 text-blue-600 focus:ring-blue-500/20"
                       />
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-sm font-black text-slate-900">#{o.orderNumber}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{o.recipientName}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className={cn(
                           "p-2 rounded-lg",
                           o.driverId ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                         )}>
                            <Truck size={14} />
                         </div>
                         <p className="text-xs font-bold text-slate-700">{o.driverId ? `Unit-0${o.id}` : 'UNASSIGNED'}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <OrderStatusBadge status={o.status} className="scale-90 origin-left" />
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-blue-600">{formatCurrency(o.totalAmount)}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl" title="View Forensics" onClick={() => setSelectedOrderForAudit(o.id)}>
                             <History size={18} className="text-slate-400" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl" title="Override Router">
                             <Edit3 size={18} className="text-slate-400" />
                          </Button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Sidebar/Overlay */}
      {selectedOrderForAudit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl h-[95vh] bg-white rounded-[3.5rem] shadow-2xl overflow-hidden relative animate-in slide-in-from-right duration-500">
              <button 
                onClick={() => setSelectedOrderForAudit(null)}
                className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-400 transition-colors z-20"
              >
                <X size={20} />
              </button>
              <div className="p-12 h-full overflow-y-auto custom-scrollbar">
                <OrderAuditLog 
                  orderId={selectedOrderForAudit} 
                  entries={[
                    { id: '1', timestamp: new Date(Date.now() - 3600000).toISOString(), action: 'ORDER_CREATED', user: { name: 'System Core', role: 'AUTOMATION' }, oldValue: null, newValue: 'PENDING', ipAddress: '192.168.1.1' },
                    { id: '2', timestamp: new Date(Date.now() - 1800000).toISOString(), action: 'STATUS_CHANGE', user: { name: 'Admin User', role: 'ADMIN' }, oldValue: 'PENDING', newValue: 'ASSIGNED', ipAddress: '45.122.0.12', notes: 'Manually expedited due to priority flag.' },
                    { id: '3', timestamp: new Date(Date.now() - 900000).toISOString(), action: 'DRIVER_ASSIGNMENT', user: { name: 'Logistics Relay', role: 'DISPATCHER' }, oldValue: null, newValue: 'Unit-092', ipAddress: '127.0.0.1' }
                  ]} 
                />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;