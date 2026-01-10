
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Truck, Phone, MessageSquare, MoreHorizontal, ShieldCheck, Activity } from 'lucide-react';
import { Driver, AvailabilityStatus } from '../../types/driver.types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface DriverCardProps {
  driver: Driver;
  onStatusChange?: (status: AvailabilityStatus) => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  const navigate = useNavigate();
  const initials = `${driver.user?.firstName.charAt(0)}${driver.user?.lastName.charAt(0)}`;

  const getStatusColor = (status: AvailabilityStatus) => {
    switch (status) {
      case AvailabilityStatus.ONLINE: return "bg-emerald-500";
      case AvailabilityStatus.BUSY: return "bg-amber-500";
      case AvailabilityStatus.OFFLINE: return "bg-slate-400";
      default: return "bg-slate-200";
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-slate-200/60 overflow-hidden bg-white rounded-[2.5rem]">
      <CardContent className="p-0">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-100 rounded-[1.5rem] flex items-center justify-center font-black text-2xl text-blue-600">
                {initials}
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-6 h-6 border-4 border-white rounded-full",
                getStatusColor(driver.availabilityStatus)
              )}></div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 hover:bg-slate-100">
                <Phone size={18} className="text-slate-400" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 hover:bg-slate-100">
                <MessageSquare size={18} className="text-slate-400" />
              </Button>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 text-lg">{driver.user?.firstName} {driver.user?.lastName}</h3>
              <Badge variant="secondary" className="bg-amber-50 text-amber-700 font-black text-[9px] px-1.5 border-amber-100">
                <Star size={10} className="mr-1 fill-amber-700" /> {driver.rating.toFixed(1)}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium flex items-center">
              <Truck size={12} className="mr-1.5" /> {driver.vehicleType} • {driver.vehiclePlate}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Deliveries</p>
              <p className="text-lg font-black text-slate-900">{driver.totalDeliveries}</p>
            </div>
            <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Status</p>
              <p className="text-xs font-black text-blue-600 uppercase tracking-tight">{driver.availabilityStatus}</p>
            </div>
          </div>

          <Button 
            onClick={() => navigate(`/drivers/${driver.id}`)}
            className="w-full rounded-2xl py-6 bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] transition-all"
          >
            Fleet Performance Profile
          </Button>
        </div>
        
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-2">
           <Activity size={14} className="text-slate-400" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
             Last active {new Date(driver.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverCard;
