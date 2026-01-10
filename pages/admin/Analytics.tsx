
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Package, DollarSign, 
  Map as MapIcon, Calendar, Download, RefreshCw,
  ArrowUpRight, ArrowDownRight, Activity, Clock,
  ChevronDown, MapPin, Globe, Target, BarChart3,
  MousePointer2, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ComposedChart,
  Legend, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../utils/formatters';

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Mocked Data
  const systemData = [
    { name: 'Mon', users: 1200, active: 800, orders: 450 },
    { name: 'Tue', users: 1450, active: 950, orders: 520 },
    { name: 'Wed', users: 1800, active: 1100, orders: 610 },
    { name: 'Thu', users: 2100, active: 1400, orders: 680 },
    { name: 'Fri', users: 2400, active: 1600, orders: 820 },
    { name: 'Sat', users: 2700, active: 1900, orders: 950 },
    { name: 'Sun', users: 3100, active: 2200, orders: 740 },
  ];

  const packageDistribution = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Food/Groc', value: 25, color: '#10b981' },
    { name: 'Documents', value: 20, color: '#8b5cf6' },
    { name: 'Fragile', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#94a3b8' },
  ];

  const heatmapData = [
    { hour: '08:00', load: 20 }, { hour: '10:00', load: 45 }, { hour: '12:00', load: 85 },
    { hour: '14:00', load: 60 }, { hour: '16:00', load: 95 }, { hour: '18:00', load: 110 },
    { hour: '20:00', load: 70 }, { hour: '22:00', load: 30 }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <div className="space-y-8 pb-12 min-h-screen overflow-y-auto">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Hub</h1>
          <p className="text-slate-500 font-medium">Global platform analytics and operational auditing.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-sm font-bold text-slate-700">{dateRange}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
          <Button className="rounded-2xl h-12 px-6 bg-slate-900 shadow-xl shadow-slate-200 font-black uppercase tracking-widest text-[10px]">
            <Download size={16} className="mr-2" /> Export All Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Users (WAU)', value: '14,250', trend: '+12.4%', up: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Throughput', value: '42,100', trend: '+8.2%', up: true, icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Net Yield', value: formatCurrency(124500), trend: '+15.5%', up: true, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Avg. Rating', value: '4.85', trend: '-0.1%', up: false, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((kpi, i) => (
          <Card key={i} className="rounded-[2rem] border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", kpi.bg, kpi.color)}>
                    <kpi.icon size={24} />
                 </div>
                 <Badge className={cn("font-black text-[10px] py-0.5 border-none", kpi.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
                    {kpi.up ? <ArrowUpRight size={10} className="mr-1" /> : <ArrowDownRight size={10} className="mr-1" />}
                    {kpi.trend}
                 </Badge>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* System Overview */}
        <Card className="lg:col-span-8 rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" /> Platform Scaling & Retention
            </CardTitle>
            <CardDescription>Daily active users vs total registrations.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={systemData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                  <Area type="monotone" dataKey="active" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorActive)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cargo Pie */}
        <Card className="lg:col-span-4 rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black">Shipment Mix</CardTitle>
            <CardDescription>Breakdown by category.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={packageDistribution} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                    {packageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-3xl font-black text-slate-900">42k</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Parcels</p>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {packageDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Heatmap Heatmap (Simulation) */}
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black">Temporal Load Heatmap</CardTitle>
            <CardDescription>System stress levels by time of day.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={heatmapData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="load" radius={[8, 8, 0, 0]} barSize={40}>
                    {heatmapData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.load > 80 ? '#ef4444' : entry.load > 50 ? '#f59e0b' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Zap size={18} className="text-amber-500" />
              <p className="text-xs font-medium text-slate-600">Peak demand detected between <span className="font-bold text-slate-900">12:00 - 18:00</span>. Deploy additional units.</p>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Hotspots */}
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black">Geo-Hotspots</CardTitle>
            <CardDescription>Live demand concentration by district.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
             <div className="h-[300px] w-full bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                {/* Visual Heatmap Simulation */}
                <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-blue-500/40 rounded-full blur-[40px] animate-pulse"></div>
                <div className="absolute top-[50%] left-[60%] w-40 h-40 bg-rose-500/40 rounded-full blur-[50px] animate-pulse"></div>
                <div className="absolute top-[10%] left-[70%] w-24 h-24 bg-emerald-500/30 rounded-full blur-[30px] animate-pulse delay-700"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-center">
                      <Globe size={40} className="mx-auto text-slate-300 mb-4" />
                      <h4 className="text-lg font-black text-slate-900">Core Network Visualization</h4>
                      <p className="text-xs text-slate-500 font-medium">Tracking 4,210 active relay points</p>
                   </div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-slate-50 rounded-2xl">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Area</p>
                   <p className="text-sm font-bold text-slate-900">Downtown Core (SF)</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Relay Time</p>
                   <p className="text-sm font-bold text-slate-900">18.4 min</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
