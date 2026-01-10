
import React from 'react';
import { OrderStatus } from '../../types/order.types';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100";
      case OrderStatus.ASSIGNED:
        return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100";
      case OrderStatus.PICKED_UP:
        return "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-100";
      case OrderStatus.IN_TRANSIT:
        return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100";
      case OrderStatus.DELIVERED:
        return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
      case OrderStatus.CANCELLED:
      case OrderStatus.FAILED:
        return "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100";
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("font-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full", getStatusStyles(status), className)}
    >
      {status.replace('_', ' ')}
    </Badge>
  );
};

export default OrderStatusBadge;
