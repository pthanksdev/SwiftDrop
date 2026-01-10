
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Package, Eye, Map as MapIcon, XCircle, Clock, ChevronRight } from 'lucide-react';
import { Order } from '../../types/order.types';
import OrderStatusBadge from './OrderStatusBadge';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface OrderCardProps {
  order: Order;
  onCancel?: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onCancel }) => {
  const navigate = useNavigate();

  return (
    <Card 
      onClick={() => navigate(`/orders/${order.id}`)}
      className="group active:scale-[0.98] transition-all duration-200 border-slate-200/60 overflow-hidden bg-white rounded-[2rem] cursor-pointer"
    >
      <CardContent className="p-0">
        <div className="p-5 md:p-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <Package size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">#{order.orderNumber}</p>
              <h3 className="font-bold text-slate-900 leading-none text-sm">{order.packageType}</h3>
            </div>
          </div>
          <OrderStatusBadge status={order.status} className="scale-90" />
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <div className="space-y-3 relative">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-100 border-l border-dashed border-slate-200"></div>
            
            <div className="flex items-start space-x-4 relative z-10">
              <div className="w-4 h-4 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center mt-0.5 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              </div>
              <p className="text-xs font-bold text-slate-600 truncate flex-1">{order.pickupAddress}</p>
            </div>

            <div className="flex items-start space-x-4 relative z-10">
              <div className="w-4 h-4 rounded-full bg-emerald-50 border-2 border-white flex items-center justify-center mt-0.5 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              </div>
              <p className="text-xs font-bold text-slate-600 truncate flex-1">{order.deliveryAddress}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
             <div className="flex items-center gap-1.5 text-slate-400">
                <Clock size={12} />
                <span className="text-[10px] font-black uppercase">{formatDate(order.createdAt).split(',')[0]}</span>
             </div>
             <p className="text-sm font-black text-blue-600">{formatCurrency(order.totalAmount)}</p>
          </div>
        </div>

        {/* Mobile quick action bar */}
        <div className="lg:hidden px-5 py-3 bg-slate-50/50 flex justify-end items-center gap-2">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex-1">Tap to details</span>
           <ChevronRight size={14} className="text-slate-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
