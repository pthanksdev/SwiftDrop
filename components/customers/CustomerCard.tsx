
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Package, ArrowRight, Star, MoreVertical } from 'lucide-react';
import { Customer } from '../../types/customer.types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const navigate = useNavigate();
  const initials = `${customer.user?.firstName.charAt(0)}${customer.user?.lastName.charAt(0)}`;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-slate-200/60 overflow-hidden bg-white rounded-[2.5rem]">
      <CardContent className="p-0">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm border border-emerald-100/50">
              {initials}
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 font-black text-[9px] px-2 py-0.5 border-blue-100">
                VIP PARTNER
              </Badge>
              <button className="text-slate-300 hover:text-slate-600 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <h3 className="font-black text-slate-900 text-xl tracking-tight">
              {customer.user?.firstName} {customer.user?.lastName}
            </h3>
            <div className="flex flex-col space-y-1">
              <p className="text-xs text-slate-500 font-medium flex items-center">
                <Mail size={12} className="mr-2 text-slate-300" /> {customer.user?.email}
              </p>
              <p className="text-xs text-slate-500 font-medium flex items-center">
                <Phone size={12} className="mr-2 text-slate-300" /> {customer.user?.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Lifetime Orders</p>
              <div className="flex items-center gap-2">
                <Package size={14} className="text-blue-500" />
                <p className="text-xl font-black text-slate-900">{customer.totalOrders}</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Account Score</p>
              <div className="flex items-center gap-2">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <p className="text-xl font-black text-slate-900">4.9</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => navigate(`/customers/${customer.id}`)}
              variant="outline"
              className="flex-1 rounded-2xl py-6 border-slate-200 text-slate-600 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50"
            >
              Full Profile
            </Button>
            <Button 
              onClick={() => navigate('/orders/create', { state: { customerId: customer.id } })}
              className="flex-1 rounded-2xl py-6 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20"
            >
              Quick Ship
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
