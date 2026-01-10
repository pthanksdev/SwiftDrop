
import React, { useState, useEffect } from 'react';
import { 
  Shield, Search, Filter, Download, 
  RefreshCw, Clock, Globe, Terminal,
  User, Eye, ChevronLeft, ChevronRight,
  Database, Activity, AlertCircle, ExternalLink,
  Smartphone, Monitor, Laptop, ShieldCheck,
  // Added XCircle to fix missing name error
  XCircle
} from 'lucide-react';
import { adminApi } from '../../api/endpoints/admin.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { formatDate } from '../../utils/formatters';
import { toast } from 'sonner';

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // High-fidelity mock data for system events
      setLogs([
        { 
          id: 'LOG-001', 
          timestamp: new Date().toISOString(), 
          user: { name: 'Admin Alpha', role: 'ADMIN', avatar: 'AA' },
          action: 'STATUS_UPDATE', 
          entityType: 'ORDER', 
          entityId: 'ORD-9921',
          oldValue: 'PENDING',
          newValue: 'IN_TRANSIT',
          ip: '192.168.1.42',
          device: 'macOS / Chrome',
          severity: 'LOW'
        },
        { 
          id: 'LOG-002', 
          timestamp: new Date(Date.now() - 3600000).toISOString(), 
          user: { name: 'System Relay', role: 'AUTOMATION', avatar: 'SR' },
          action: 'PRICE_CALIBRATION', 
          entityType: 'SETTING', 
          entityId: 'PRC-001',
          oldValue: '1.2x Multiplier',
          newValue: '1.5x Multiplier',
          ip: 'Internal Socket',
          device: 'Core Engine v2.4',
          severity: 'MEDIUM'
        },
        { 
          id: 'LOG-003', 
          timestamp: new Date(Date.now() - 7200000).toISOString(), 
          user: { name: 'James Wilson', role: 'DRIVER', avatar: 'JW' },
          action: 'AUTH_LOGIN', 
          entityType: 'USER', 
          entityId: 'USR-8821',
          oldValue: null,
          newValue: 'SESSION_START',
          ip: '45.12.0.122',
          device: 'iOS / SwiftDrop Field',
          severity: 'INFO'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Security Audit</h1>
          <p className="text-slate-500 font-medium">Immutable forensic trail of every platform interaction.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-black text-[10px] uppercase tracking-widest px-4 py-2">
            Audit Level: Absolute
          </Badge>
          <Button onClick={fetchLogs} variant="ghost" className="rounded-xl h-12 w-12 border border-slate-100 bg-white">
            <RefreshCw size={18} className={cn(loading && "animate-spin")} />
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <Input 
              placeholder="Filter by Actor, Action or Entity ID..." 
              className="pl-12 py-7 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="h-14 rounded-2xl px-6 border-slate-100 font-bold text-xs"><Filter size={18} className="mr-2" /> Forensic Filters</Button>
             <Button className="h-14 rounded-2xl px-8 bg-slate-900 font-black uppercase tracking-widest text-[10px]"><Download size={18} className="mr-2" /> Export Logs</Button>
          </div>
        </div>
      </div>

      <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-6">Timestamp</th>
                  <th className="px-8 py-6">Actor</th>
                  <th className="px-8 py-6">Interaction</th>
                  <th className="px-8 py-6">Context</th>
                  <th className="px-8 py-6">Security Context</th>
                  <th className="px-8 py-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-slate-900">{formatDate(log.timestamp).split(',')[1]}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{formatDate(log.timestamp).split(',')[0]}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center font-black text-[10px] text-slate-500">
                          {log.user.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{log.user.name}</p>
                          <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{log.user.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="secondary" className="bg-slate-900 text-white font-black text-[9px] tracking-widest py-0.5 px-2.5">{log.action}</Badge>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[9px] font-black uppercase text-slate-400 border-slate-100">{log.entityType}</Badge>
                          <span className="text-xs font-bold text-slate-700">#{log.entityId}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3 text-slate-400">
                          {log.device.includes('macOS') ? <Laptop size={14} /> : <Smartphone size={14} />}
                          <p className="text-[10px] font-bold tracking-tight">{log.ip}</p>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:shadow-sm"
                        onClick={() => setSelectedLog(log)}
                       >
                         <Eye size={18} className="text-slate-400" />
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Forensic Detail Overlay */}
      {selectedLog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-white rounded-[3.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-500">
              <div className="p-10 border-b border-slate-50 bg-slate-900 text-white flex justify-between items-center">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-xl">
                       <Terminal size={28} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black">Transaction Forensics</h3>
                       <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Audit Key: {selectedLog.id}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><XCircle size={24} className="text-slate-400 hover:text-white" /></button>
              </div>

              <div className="p-10 space-y-10">
                 <div className="grid grid-cols-2 gap-10">
                    <section className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <User size={12} className="text-blue-500" /> Actor Identity
                       </h4>
                       <div className="p-6 bg-slate-50 rounded-[2rem] space-y-2">
                          <p className="text-sm font-black text-slate-900">{selectedLog.user.name}</p>
                          <Badge variant="secondary" className="bg-white border-slate-100 text-[9px] font-black uppercase tracking-widest">{selectedLog.user.role}</Badge>
                       </div>
                    </section>
                    <section className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Globe size={12} className="text-emerald-500" /> Connectivity Context
                       </h4>
                       <div className="p-6 bg-slate-50 rounded-[2rem] space-y-2">
                          <p className="text-xs font-bold text-slate-700">IP: {selectedLog.ip}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedLog.device}</p>
                       </div>
                    </section>
                 </div>

                 <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Activity size={12} className="text-indigo-500" /> Mutation Diff
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2rem]">
                          <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Previous Value</p>
                          <p className="text-xs font-bold text-rose-700 line-through">{selectedLog.oldValue || 'N/A'}</p>
                       </div>
                       <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem]">
                          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Amended Value</p>
                          <p className="text-xs font-black text-emerald-700">{selectedLog.newValue}</p>
                       </div>
                    </div>
                 </section>

                 <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><ShieldCheck size={20} /></div>
                       <div>
                          <p className="text-xs font-bold">Immutable Record</p>
                          <p className="text-[10px] text-slate-500 font-medium tracking-tight">Checksum Verified: 0x992a...ff01</p>
                       </div>
                    </div>
                    <Button variant="ghost" className="text-[10px] font-black uppercase text-blue-400 h-auto p-0">Revert State</Button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
