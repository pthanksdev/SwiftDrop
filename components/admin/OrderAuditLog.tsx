
import React from 'react';
import { 
  Clock, User, Shield, Terminal, 
  ArrowRight, Globe, AlertCircle, 
  Settings, CheckCircle2 
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { cn } from '../../lib/utils';

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  user: { name: string; role: string };
  oldValue: string | null;
  newValue: string;
  ipAddress: string;
  notes?: string;
}

interface OrderAuditLogProps {
  orderId: string;
  entries: AuditEntry[];
}

const OrderAuditLog: React.FC<OrderAuditLogProps> = ({ orderId, entries }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 leading-none">Security Audit Trail</h3>
          <p className="text-sm text-slate-500 mt-2">Comprehensive history for Shipment #{orderId}</p>
        </div>
        <div className="p-3 bg-slate-100 rounded-2xl text-slate-400">
           <Shield size={20} />
        </div>
      </div>

      <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
        {entries.length > 0 ? entries.map((entry, i) => (
          <div key={entry.id} className="relative flex gap-6 animate-in slide-in-from-left-2" style={{ animationDelay: `${i * 100}ms` }}>
            <div className={cn(
              "w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10",
              entry.action.includes('STATUS') ? "bg-blue-600 text-white" : "bg-slate-900 text-white"
            )}>
              {entry.action.includes('STATUS') ? <CheckCircle2 size={14} /> : <Terminal size={14} />}
            </div>

            <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                   <p className="text-xs font-black text-blue-600 uppercase tracking-widest leading-none mb-1">{entry.action.replace('_', ' ')}</p>
                   <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock size={10} /> {formatDate(entry.timestamp)}
                   </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-xl">
                   <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-[10px] font-black">
                      {entry.user.name.charAt(0)}
                   </div>
                   <div className="text-left">
                      <p className="text-[10px] font-black text-slate-900 leading-none">{entry.user.name}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{entry.user.role}</p>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Previous State</p>
                  <p className="text-xs font-bold text-slate-500 line-through">{entry.oldValue || 'INITIAL'}</p>
                </div>
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Amended State</p>
                  <div className="flex items-center gap-2">
                    <ArrowRight size={10} className="text-blue-500" />
                    <p className="text-xs font-black text-blue-700">{entry.newValue}</p>
                  </div>
                </div>
              </div>

              {entry.notes && (
                <div className="mt-4 flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-900 font-medium leading-relaxed italic">"{entry.notes}"</p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase">
                  <Globe size={10} /> IP: {entry.ipAddress}
                </div>
                <button className="text-[9px] font-black text-blue-600 uppercase hover:underline">Revert Change</button>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center">
             <Clock size={40} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-400 font-bold">No history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderAuditLog;
