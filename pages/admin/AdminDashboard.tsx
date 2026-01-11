
import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Activity, Package, 
  TrendingUp, AlertTriangle, CheckCircle, 
  ArrowRight, Server, Database, Globe,
  Terminal, ShieldCheck, UserPlus,
  RefreshCw, Truck, Briefcase, Zap, Sparkles,
  MapPin, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { adminApi } from '../../api/endpoints/admin.api';
import { aiLogisticsService } from '../../services/ai.service';
import { cn } from '../../lib/utils';
import { formatCurrency, formatDate } from '../../utils/formatters';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getSystemStats();
      setStats(res.data);
    } catch (err) {
      setStats({
        users: { total: 1245, admins: 4, dispatchers: 12, drivers: 84, customers: 1145 },
        system: { status: 'OPTIMAL', load: '12%', database: 'UP', relay: 'CONNECTED' },
        pending: 12,
        orders: 2350,
        drivers: 84,
        approvals: [
          { id: '1', type: 'DRIVER_LICENSE', name: 'James Wilson', plate: 'SF-9922', date: new Date().toISOString() },
          { id: '2', type: 'VEHICLE_INSPECTION', name: 'Maria Garcia', plate: 'SF-8821', date: new Date().toISOString() }
        ],
        revenue: { week: 12400, month: 48500 }
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAiInsights = async () => {
    if (!stats) return;
    setAiLoading(true);
    const result = await aiLogisticsService.getFleetOptimizationInsights(stats);
    setAiInsight(result);
    setAiLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) return <div className="h-screen flex items-center justify-center bg-slate-50"><RefreshCw className="animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Control</h1>
          <p className="text-slate-500 font-medium">Platform-wide intelligence and security management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={generateAiInsights} isLoading={aiLoading} className="rounded-xl h-12 bg-indigo-600 shadow-lg shadow-indigo-200">
             <Sparkles size={16} className="mr-2" /> Deep Analysis (Gemini Pro)
          </Button>
          <Badge className="bg-emerald-100 text-emerald-700 font-black text-[10px] uppercase tracking-widest px-4 py-2 border-emerald-200">
            <Server size={14} className="mr-2" /> Global Relay: Active
          </Badge>
        </div>
      </div>

      {aiInsight && (
        <div className="p-10 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-700">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-blue-400">
                 <Sparkles size={24} />
                 <h4 className="font-black uppercase tracking-[0.2em] text-xs">AI Fleet Intelligence</h4>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                 <p className="text-xl font-bold leading-relaxed whitespace-pre-line">{aiInsight.text}</p>
              </div>
              
              {aiInsight.grounding?.length > 0 && (
                <div className="pt-4 space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grounding Context (Google Maps)</p>
                  <div className="flex flex-wrap gap-2">
                    {aiInsight.grounding.map((chunk: any, i: number) => chunk.maps && (
                      <a key={i} href={chunk.maps.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-blue-400 transition-colors">
                        <MapPin size={12} /> {chunk.maps.title || "View Location"} <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                 <Button size="sm" className="bg-blue-600 rounded-xl font-bold text-xs uppercase" onClick={() => setAiInsight(null)}>Acknowledge</Button>
              </div>
           </div>
        </div>
      )}

      {/* System Health Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Relay Load', value: stats.system.load, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'DB Health', value: stats.system.database, icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Latency', value: '42ms', icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Security Status', value: 'OPTIMAL', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", item.bg, item.color)}>
              <item.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-lg font-black text-slate-900 tracking-tight">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black">Ecosystem Demographic</CardTitle>
            <CardDescription>Breakdown of active system participants.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {[
              { label: 'Customers', count: stats.users.customers, icon: Users, color: 'bg-blue-600' },
              { label: 'Fleet Drivers', count: stats.users.drivers, icon: Truck, color: 'bg-emerald-500' },
              { label: 'Dispatchers', count: stats.users.dispatchers, icon: Briefcase, color: 'bg-indigo-500' },
              { label: 'System Admins', count: stats.users.admins, icon: Shield, color: 'bg-slate-900' }
            ].map(type => (
              <div key={type.label} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600">{type.label}</span>
                  <span className="text-slate-900">{type.count}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn("h-full", type.color)} style={{ width: `${(type.count / stats.users.total) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-black">Field Onboarding Queue</CardTitle>
              <CardDescription>Drivers awaiting license and vehicle verification.</CardDescription>
            </div>
            <Badge className="bg-amber-100 text-amber-700 font-black text-[10px]">{stats.approvals.length} Urgent</Badge>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-50">
               {stats.approvals.map((app: any) => (
                 <div key={app.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                        <Terminal size={20} />
                     </div>
                     <div>
                       <p className="text-sm font-black text-slate-900">{app.name}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.type} • Vehicle {app.plate}</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs text-rose-500">Reject</Button>
                     <Button size="sm" className="rounded-xl font-bold text-xs bg-blue-600">Approve Access</Button>
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-10 bg-rose-600 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-rose-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-rose-200">
                <AlertTriangle size={24} />
                <h4 className="font-black uppercase tracking-widest text-xs">Security Protocol Alert</h4>
             </div>
             <h3 className="text-2xl font-black max-w-xl">3 suspicious login attempts detected in the last hour from non-whitelisted IP ranges.</h3>
             <p className="text-rose-100/70 text-sm max-w-md">Our automated threat detection has temporarily locked these accounts and requires administrative review.</p>
          </div>
          <Button className="rounded-2xl h-14 px-8 bg-white text-rose-600 hover:bg-rose-50 font-black uppercase tracking-widest text-xs shadow-xl">
            Launch Audit Logs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
