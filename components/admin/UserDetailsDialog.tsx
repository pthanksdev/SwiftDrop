
import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, Shield, 
  Calendar, History, Activity, 
  Trash2, Ban, CheckCircle, Package,
  TrendingUp, Clock, CreditCard
} from 'lucide-react';
import { User as UserType } from '../../types/auth.types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface UserDetailsDialogProps {
  user: UserType;
  onClose: () => void;
  onUpdateStatus: (isActive: boolean) => void;
  onDelete: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ user, onClose, onUpdateStatus, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'activity' | 'stats'>('info');

  return (
    <div className="p-0 animate-in zoom-in-95 duration-300">
      {/* Header Profile Section */}
      <div className="p-8 bg-slate-900 text-white relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-2xl">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black">{user.firstName} {user.lastName}</h2>
              <Badge className={cn(
                "text-[9px] font-black uppercase tracking-widest py-0.5",
                user.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
              )}>
                {user.isActive ? 'Active' : 'Deactivated'}
              </Badge>
            </div>
            <p className="text-slate-400 font-medium text-sm mt-1">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-8">
          {[
            { id: 'info', label: 'Identity', icon: User },
            { id: 'activity', label: 'Operations', icon: Activity },
            { id: 'stats', label: 'Financials', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all",
                activeTab === tab.id ? "bg-white text-slate-900" : "text-slate-400 hover:text-white"
              )}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 max-h-[500px] overflow-y-auto custom-scrollbar">
        {activeTab === 'info' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-2">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account ID</p>
                <p className="text-sm font-bold text-slate-900 font-mono">#{user.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Role</p>
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-black text-[10px]">{user.role}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                <p className="text-sm font-bold text-slate-900">{user.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered</p>
                <p className="text-sm font-bold text-slate-900">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Shield size={12} className="text-blue-500" /> Security Audit
              </h4>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-xs font-bold">
                   <span className="text-slate-500">2FA Status</span>
                   <span className="text-emerald-600">Enabled</span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold">
                   <span className="text-slate-500">Last Login</span>
                   <span className="text-slate-900">2 hours ago from San Francisco, US</span>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
           <div className="space-y-6 animate-in slide-in-from-bottom-2">
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Shipment #ORD-992{i} Dispatched</p>
                      <p className="text-xs text-slate-500 mt-1">Status changed to 'IN_TRANSIT' by Logistics Relay</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{formatDate(new Date().toISOString())}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        )}

        {activeTab === 'stats' && (
           <div className="space-y-6 animate-in slide-in-from-bottom-2">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Lifetime Spend</p>
                    <p className="text-2xl font-black text-emerald-700">{formatCurrency(1240.50)}</p>
                 </div>
                 <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Total Shipments</p>
                    <p className="text-2xl font-black text-blue-700">42</p>
                 </div>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-3xl space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Methods</h4>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                     <CreditCard size={20} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-900">Visa •••• 4242</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expires 12/26</p>
                   </div>
                   <Badge variant="outline" className="ml-auto text-[8px] uppercase tracking-widest">Primary</Badge>
                 </div>
              </div>
           </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onDelete}
          className="text-rose-500 hover:bg-rose-50 rounded-xl font-bold text-xs"
        >
          <Trash2 size={16} className="mr-2" /> Delete Account
        </Button>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => onUpdateStatus(!user.isActive)}
            className="rounded-xl font-bold text-xs border-slate-200"
          >
            {user.isActive ? <Ban size={16} className="mr-2" /> : <CheckCircle size={16} className="mr-2" />}
            {user.isActive ? 'Deactivate' : 'Activate'}
          </Button>
          <Button className="rounded-xl font-bold text-xs bg-blue-600">
            Edit Information
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsDialog;
