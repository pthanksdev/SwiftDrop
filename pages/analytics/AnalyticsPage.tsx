
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, MapPin, DollarSign, Calendar, 
  Download, Filter, ArrowUpRight, ArrowDownRight, Activity,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { analyticsApi } from '../../api/endpoints/analytics.api';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../utils/formatters';

const REVENUE_DATA = [
  { name: 'Mon', revenue: 4200, orders: 120 },
  { name: 'Tue', revenue: 3800, orders: 110 },
  { name: 'Wed', revenue: 5600, orders: 160 },
  { name: 'Thu', revenue: 4900, orders: 140 },
  { name: 'Fri', revenue: 7200, orders: 210 },
  { name: 'Sat', revenue: 8400, orders: 250 },
  { name: 'Sun', revenue: 6100, orders: 180 },
];

const STATUS_DISTRIBUTION = [
  { name: 'Delivered', value: 450, color: '#10b981' },
  { name: 'In Transit', value: 120, color: '#3b82f6' },
  { name: 'Pending', value: 85, color: '#f59e0b' },
  { name: 'Cancelled', value: 15, color: '#ef4444' },
];

const DRIVER_PERFORMANCE = [
  { name: 'Unit-09', completed: 145, rating: 4.9 },
  { name: 'Unit-22', completed: 132, rating: 4.8 },
  { name: 'Unit-04', completed: 128, rating: 5.0 },
  { name: 'Unit-15', completed: 110, rating: 4.7 },
  { name: 'Unit-31', completed: 98, rating: 4.6 },
];

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [loading, setLoading] = useState(false);

  // In a real app, we would fetch data here based on timeRange
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // await analyticsApi.getDashboardStats();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [timeRange]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Dashboard</h1>
          <p className="text-slate-500 font-medium">Data-driven insights into your logistics ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 p-1 rounded-2xl flex items-center shadow-sm">
            {(['day', 'week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  timeRange === range 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="outline" className="rounded-2xl h-12 border-slate-200 shadow-sm bg-white">
            <Download size={18} className="mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Net Revenue', value: formatCurrency(40250.00), icon: DollarSign, trend: '+12.5%', color: 'bg-emerald-50 text-emerald-600', trendUp: true },
          { label: 'Active Fleet', value: '84/96', icon: Activity, trend: '+4%', color: 'bg-blue-50 text-blue-600', trendUp: true },
          { label: 'Avg. Delivery', value: '28m', icon: Clock, trend: '-2m', color: 'bg-indigo-50 text-indigo-600', trendUp: true },
          { label: 'Success Rate', value: '99.4%', icon: CheckCircle, trend: '+0.2%', color: 'bg-amber-50 text-amber-600', trendUp: true },
        ].map((kpi, i) => (
          <Card key={i} className="rounded-[2.5rem] border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", kpi.color)}>
                  <kpi.icon size={24} />
                </div>
                <Badge variant="outline" className={cn(
                  "font-black text-[10px] uppercase border-none",
                  kpi.trendUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                )}>
                  {/* Fixed: Replaced non-existent kpi.trendType with kpi.trendUp boolean */}
                  {kpi.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.trend}
                </Badge>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{kpi.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Primary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Area Chart */}
        <Card className="lg:col-span-2 rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-black text-slate-900">Revenue Velocity</CardTitle>
                <CardDescription>Daily financial growth and logistics throughput.</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-blue-600">{formatCurrency(41250)}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Period Total</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}}
                    tickFormatter={(val) => `$${val/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                    labelStyle={{ fontWeight: 900, marginBottom: '4px', fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Pie Chart */}
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black text-slate-900">Shipment Distribution</CardTitle>
            <CardDescription>Real-time order lifecycle health.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={STATUS_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {STATUS_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-3xl font-black text-slate-900">670</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {STATUS_DISTRIBUTION.map((status) => (
                <div key={status.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <span className="text-xs font-bold text-slate-600">{status.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">{status.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Driver Performance Leaderboard */}
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black text-slate-900">Elite Fleet Performance</CardTitle>
            <CardDescription>Top 5 drivers by successful completion volume.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={DRIVER_PERFORMANCE} 
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }}
                  />
                  <Tooltip 
                     cursor={{ fill: '#f8fafc' }}
                     contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="completed" 
                    fill="#3b82f6" 
                    radius={[0, 10, 10, 0]} 
                    barSize={24}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Order History Growth Line Chart */}
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black text-slate-900">Logistics Scale</CardTitle>
            <CardDescription>Daily order volume trends across the network.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#8b5cf6" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 3, stroke: '#fff' }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Insights */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-blue-400">
                <Activity size={24} />
                <h4 className="font-black uppercase tracking-widest text-xs">AI Fleet Insights</h4>
             </div>
             <h3 className="text-2xl font-black max-w-lg">Predictive demand suggests increasing driver capacity in Sunset District by 15% for tomorrow.</h3>
             <p className="text-slate-400 text-sm max-w-md">Our algorithm detected a recurring pattern in weekend logistics. Consider incentivizing drivers for the Saturday morning shift.</p>
          </div>
          <Button className="rounded-2xl h-14 px-8 bg-blue-600 hover:bg-blue-700 font-bold border-none shadow-xl shadow-blue-500/20">
            Optimize Fleet Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
