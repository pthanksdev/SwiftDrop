
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, CreditCard, ArrowUpRight, 
  ArrowDownRight, PieChart as PieChartIcon, Clock, 
  Users, RefreshCw, Download, Filter, Eye, RotateCcw,
  CheckCircle2, AlertCircle, ChevronRight, Wallet
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { adminApi } from '../../api/endpoints/admin.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';

const FinancialManagement: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFinanceData = async () => {
    setLoading(true);
    try {
      // Mocked data for high-fidelity representation
      setStats({
        revenue: { today: 4250.20, week: 28400.00, month: 124500.50, total: 842000.00 },
        breakdown: [
          { name: 'Card', value: 65, color: '#3b82f6' },
          { name: 'Mobile', value: 20, color: '#10b981' },
          { name: 'Cash', value: 10, color: '#f59e0b' },
          { name: 'Transfer', value: 5, color: '#8b5cf6' },
        ],
        trends: [
          { name: 'Mon', revenue: 4200 },
          { name: 'Tue', revenue: 3800 },
          { name: 'Wed', revenue: 5600 },
          { name: 'Thu', revenue: 4900 },
          { name: 'Fri', revenue: 7200 },
          { name: 'Sat', revenue: 8400 },
          { name: 'Sun', revenue: 6100 },
        ],
        topDrivers: [
          { name: 'James Wilson', earnings: 2450, orders: 112 },
          { name: 'Maria Garcia', earnings: 2100, orders: 98 },
          { name: 'Kevin Park', earnings: 1850, orders: 84 },
        ]
      });

      setTransactions([
        { id: 'TXN-9901', order: 'ORD-7721', amount: 45.00, method: 'CARD', status: 'COMPLETED', date: new Date().toISOString() },
        { id: 'TXN-9902', order: 'ORD-7722', amount: 12.50, method: 'MOBILE', status: 'COMPLETED', date: new Date().toISOString() },
        { id: 'TXN-9903', order: 'ORD-7723', amount: 88.20, method: 'CARD', status: 'PENDING', date: new Date().toISOString() },
      ]);

      setPayouts([
        { driverId: 'd1', name: 'James Wilson', pendingAmount: 1450.00, lastPayout: '2024-03-10' },
        { driverId: 'd2', name: 'Maria Garcia', pendingAmount: 840.50, lastPayout: '2024-03-08' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const handlePayout = async (driverId: string, amount: number) => {
    try {
      // await adminApi.processPayout(driverId, amount);
      toast.success(`Payout of ${formatCurrency(amount)} initiated.`);
      fetchFinanceData();
    } catch (err) {
      toast.error('Payout failed');
    }
  };

  if (loading || !stats) return <div className="h-screen flex items-center justify-center"><RefreshCw className="animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Settlement</h1>
          <p className="text-slate-500 font-medium">Platform-wide financial surveillance and treasury management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-12 border-slate-200">
            <Download size={16} className="mr-2" /> Financial Reports
          </Button>
          <Button onClick={fetchFinanceData} variant="ghost" className="rounded-2xl h-12 w-12 border border-slate-100 bg-white">
            <RefreshCw size={18} className={cn(loading && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Revenue Overlays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Circulation: Today', value: stats.revenue.today, trend: '+12.5%', trendUp: true, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Weekly Gross', value: stats.revenue.week, trend: '+8.2%', trendUp: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Monthly Volume', value: stats.revenue.month, trend: '-2.4%', trendUp: false, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Lifetime GMV', value: stats.revenue.total, trend: '+42%', trendUp: true, color: 'text-slate-900', bg: 'bg-slate-100' }
        ].map((item, i) => (
          <Card key={i} className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-4">{item.label}</p>
              <div className="flex items-end justify-between">
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">{formatCurrency(item.value)}</h3>
                 <Badge className={cn(
                   "font-black text-[10px] py-0.5",
                   item.trendUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                 )}>
                   {item.trendUp ? <ArrowUpRight size={10} className="mr-1" /> : <ArrowDownRight size={10} className="mr-1" />}
                   {item.trend}
                 </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Velocity Chart */}
        <Card className="lg:col-span-2 rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black">Revenue Velocity</CardTitle>
            <CardDescription>Daily gross tracking for the current cycle.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.trends}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Method Distribution */}
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black">Settlement Methods</CardTitle>
            <CardDescription>Breakdown of incoming flows.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.breakdown} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {stats.breakdown.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 space-y-3">
              {stats.breakdown.map((item: any) => (
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
        {/* Pending Payouts */}
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-black">Field Disbursements</CardTitle>
              <CardDescription>Drivers awaiting earnings settlement.</CardDescription>
            </div>
            <Badge className="bg-amber-100 text-amber-700 font-black text-[10px] uppercase tracking-widest">PENDING LIQUIDITY</Badge>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-50">
               {payouts.map((p) => (
                 <div key={p.driverId} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black">
                        {p.name.charAt(0)}
                     </div>
                     <div>
                       <p className="text-sm font-black text-slate-900">{p.name}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last payout: {p.lastPayout}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="text-right">
                         <p className="text-sm font-black text-slate-900">{formatCurrency(p.pendingAmount)}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Net Payable</p>
                      </div>
                      <Button onClick={() => handlePayout(p.driverId, p.pendingAmount)} size="sm" className="rounded-xl bg-blue-600 font-bold text-xs">Release Funds</Button>
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>

        {/* Transaction Ledger */}
        <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-lg font-black">Flow History</CardTitle>
            <CardDescription>Real-time transaction activity log.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <tr>
                     <th className="px-8 py-4">Relay ID</th>
                     <th className="px-8 py-4">Volume</th>
                     <th className="px-8 py-4">State</th>
                     <th className="px-8 py-4 text-right">Vault</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {transactions.map((t) => (
                     <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-8 py-5">
                          <p className="text-sm font-black text-slate-900">{t.id}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{t.order}</p>
                       </td>
                       <td className="px-8 py-5">
                          <p className="text-sm font-black text-blue-600">{formatCurrency(t.amount)}</p>
                       </td>
                       <td className="px-8 py-5">
                          <Badge className={cn(
                            "text-[9px] font-black uppercase py-0.5",
                            t.status === 'COMPLETED' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          )}>
                            {t.status}
                          </Badge>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <Button variant="ghost" size="icon" className="rounded-xl"><Eye size={16} /></Button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialManagement;
