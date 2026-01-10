
import React, { useState } from 'react';
import { 
  FileText, Calendar, Clock, Download, 
  Mail, Settings, Plus, Trash2, 
  CheckCircle2, Send, Filter, ArrowRight,
  BarChart3, DollarSign, Truck, Users,
  Globe, ShieldCheck, FileSpreadsheet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const SystemReports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [scheduledReports, setScheduledReports] = useState([
    { id: '1', title: 'Daily Logistics Pulse', frequency: 'Daily', time: '06:00 AM', format: 'PDF', recipients: 4 },
    { id: '2', title: 'Weekly Treasury Summary', frequency: 'Weekly', time: 'Mon, 08:00 AM', format: 'Excel', recipients: 2 },
    { id: '3', title: 'Monthly Driver Efficiency', frequency: 'Monthly', time: '1st, 09:00 AM', format: 'CSV', recipients: 5 },
  ]);

  const handleGenerate = async (type: string) => {
    setLoading(true);
    toast.info(`Synthesizing ${type} dataset...`);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${type} report ready for download.`);
    }, 1800);
  };

  return (
    <div className="space-y-8 pb-12 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Report Engine</h1>
          <p className="text-slate-500 font-medium">Generate and schedule comprehensive business intelligence logs.</p>
        </div>
        <Button className="rounded-2xl h-14 px-8 bg-blue-600 shadow-xl shadow-blue-500/20 font-black uppercase tracking-widest text-xs">
          New Report Relay <Plus size={18} className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* On-Demand Generator */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Intelligence Bundles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'ops', title: 'Ops Summary', desc: 'Daily logistics flow, failure rates, and fleet latency logs.', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { id: 'fin', title: 'Finance Ledger', desc: 'Transaction history, net commission, and tax reporting.', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { id: 'fleet', title: 'Fleet Pulse', desc: 'Driver ratings, churn risk, and individual performance tiers.', icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { id: 'cust', title: 'CX Audit', desc: 'NPS monitoring, complaint resolution, and LTV analysis.', icon: Users, color: 'text-rose-600', bg: 'bg-rose-50' }
            ].map((report) => (
              <Card key={report.id} className="rounded-[2.5rem] border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                     <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", report.bg, report.color)}>
                        <report.icon size={28} />
                     </div>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 border border-slate-100"><Download size={18} /></Button>
                        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 border border-slate-100"><Mail size={18} /></Button>
                     </div>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 leading-tight mb-2">{report.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-8">{report.desc}</p>
                  <div className="flex gap-3">
                    <Button 
                        onClick={() => handleGenerate(report.title)} 
                        isLoading={loading}
                        className="flex-1 rounded-2xl h-12 bg-slate-900 font-bold text-xs"
                    >
                        Build <ArrowRight size={14} className="ml-2" />
                    </Button>
                    <Button variant="outline" className="rounded-2xl h-12 border-slate-200">
                        <Settings size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Scheduling Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Automated Relays</h3>
          <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b border-slate-50">
               <CardTitle className="text-lg font-black flex items-center gap-2">
                 <Clock size={20} className="text-blue-500" /> Active Schedules
               </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-50">
                 {scheduledReports.map((r) => (
                   <div key={r.id} className="p-6 hover:bg-slate-50 transition-colors group relative">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black uppercase">Active</Badge>
                            <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest">{r.format}</Badge>
                         </div>
                         <button className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                      </div>
                      <h4 className="text-sm font-black text-slate-900 mb-2">{r.title}</h4>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {r.frequency}</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {r.recipients} people</span>
                      </div>
                   </div>
                 ))}
               </div>
            </CardContent>
            <div className="p-6 bg-slate-50 border-t border-slate-100">
               <Button className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest">Configure Auto-Send</Button>
            </div>
          </Card>

          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-indigo-600/20">
             <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-indigo-200" />
                <h4 className="font-bold">Encryption Protocol</h4>
             </div>
             <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                All generated reports are AES-256 encrypted before email distribution. Credentials required for extraction.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemReports;
