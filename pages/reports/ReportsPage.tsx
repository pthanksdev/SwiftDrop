
import React, { useState, useEffect } from 'react';
import { 
  FileText, Calendar, Download, RefreshCw, 
  PieChart as PieIcon, TrendingUp, DollarSign, 
  Truck, Users, Filter, Package, ShieldCheck,
  ChevronDown, ArrowUpRight, ArrowDownRight,
  Info, Activity, Mail, Clock, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import { ReportType, DateRange } from '../../types/report.types';
import { exportToCSV, exportToPDF } from '../../utils/reportExport';

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('ORDERS');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 2592000000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchReport = async () => {
    setLoading(true);
    // Simulation of API delay and multi-domain data
    setTimeout(() => {
      const mockData: any = {
        ORDERS: {
          summary: { total: 1245, completed: 1180, cancelled: 45, failed: 20, onTime: 98.4, avgTime: 24 },
          status: [
            { name: 'Delivered', value: 1180, color: '#10b981' },
            { name: 'Cancelled', value: 45, color: '#ef4444' },
            { name: 'Failed', value: 20, color: '#f59e0b' }
          ],
          types: [
            { name: 'Electronics', value: 450, color: '#3b82f6' },
            { name: 'Food', value: 320, color: '#10b981' },
            { name: 'Documents', value: 280, color: '#8b5cf6' },
            { name: 'Fragile', value: 195, color: '#f59e0b' }
          ],
          trends: [
            { date: 'Mon', volume: 140 }, { date: 'Tue', volume: 165 }, { date: 'Wed', volume: 180 },
            { date: 'Thu', volume: 210 }, { date: 'Fri', volume: 240 }, { date: 'Sat', volume: 190 }, { date: 'Sun', volume: 120 }
          ]
        },
        REVENUE: {
          summary: { total: 42500, net: 8500, aov: 34.12, discount: 1240 },
          methods: [
            { name: 'Credit Card', value: 65, color: '#3b82f6' },
            { name: 'Mobile Wallet', value: 25, color: '#10b981' },
            { name: 'Bank Transfer', value: 10, color: '#8b5cf6' }
          ],
          trends: [
            { date: 'Mon', amount: 4200 }, { date: 'Tue', amount: 4800 }, { date: 'Wed', amount: 5100 },
            { date: 'Thu', amount: 6200 }, { date: 'Fri', amount: 7400 }, { date: 'Sat', amount: 8200 }, { date: 'Sun', amount: 6600 }
          ]
        },
        DRIVERS: {
          performers: [
            { name: 'John Doe', orders: 142, rating: 4.9, onTime: 99, earnings: 2450 },
            { name: 'Alice Smith', orders: 138, rating: 5.0, onTime: 100, earnings: 2210 },
            { name: 'Bob Vargo', orders: 125, rating: 4.7, onTime: 94, earnings: 1980 },
            { name: 'Elena R.', orders: 110, rating: 4.8, onTime: 96, earnings: 1750 }
          ]
        },
        CUSTOMERS: {
          summary: { new: 245, active: 890, churn: 1.2, ltv: 1240 },
          acquisition: [
            { date: 'Week 1', count: 45 }, { date: 'Week 2', count: 52 }, { date: 'Week 3', count: 68 }, { date: 'Week 4', count: 80 }
          ]
        }
      };
      setData(mockData[reportType]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchReport();
  }, [reportType]);

  const handleExport = (format: 'PDF' | 'CSV') => {
    if (!data) return;
    
    const title = `${reportType.charAt(0) + reportType.slice(1).toLowerCase()} Intelligence Report`;
    
    if (format === 'CSV') {
      const exportData = reportType === 'DRIVERS' ? data.performers : data.trends || data.acquisition;
      exportToCSV(exportData, title);
    } else {
      let headers: string[] = [];
      let rows: any[][] = [];
      let summary: { label: string; value: string }[] = [];

      if (reportType === 'ORDERS') {
        headers = ['Period', 'Shipment Volume'];
        rows = data.trends.map((t: any) => [t.date, t.volume]);
        summary = [
          { label: 'Total Volume', value: data.summary.total.toString() },
          { label: 'Completion Rate', value: `${((data.summary.completed/data.summary.total)*100).toFixed(1)}%` },
          { label: 'On-Time Delivery', value: `${data.summary.onTime}%` }
        ];
      } else if (reportType === 'REVENUE') {
        headers = ['Period', 'Gross Revenue'];
        rows = data.trends.map((t: any) => [t.date, formatCurrency(t.amount)]);
        summary = [
          { label: 'Total Revenue', value: formatCurrency(data.summary.total) },
          { label: 'Net Platform Yield', value: formatCurrency(data.summary.net) },
          { label: 'Average Order Value', value: formatCurrency(data.summary.aov) }
        ];
      } else if (reportType === 'DRIVERS') {
        headers = ['Courier Name', 'Deliveries', 'Score', 'On-Time', 'Earnings'];
        rows = data.performers.map((p: any) => [p.name, p.orders, `${p.rating}*`, `${p.onTime}%`, formatCurrency(p.earnings)]);
      }

      exportToPDF(title, headers, rows, summary);
    }
    toast.success(`${format} report generated successfully.`);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-blue-600">
             <FileText size={24} />
             <h1 className="text-3xl font-black text-slate-900 tracking-tight tracking-tighter">Report Engine</h1>
          </div>
          <p className="text-slate-500 font-medium max-w-md text-sm leading-relaxed">
            Synthesize cross-platform data into high-fidelity intelligence documents and audits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           <div className="flex bg-slate-100 p-1.5 rounded-[2rem] shadow-inner">
              {(['ORDERS', 'REVENUE', 'DRIVERS', 'CUSTOMERS'] as ReportType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className={cn(
                    "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                    reportType === type ? "bg-white text-blue-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {type}
                </button>
              ))}
           </div>
           
           <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
              <Calendar size={16} className="text-slate-400" />
              <div className="flex items-center gap-2">
                 <input 
                  type="date" 
                  value={dateRange.startDate} 
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  className="bg-transparent text-[10px] font-black uppercase outline-none" 
                 />
                 <span className="text-slate-300">—</span>
                 <input 
                  type="date" 
                  value={dateRange.endDate} 
                  onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  className="bg-transparent text-[10px] font-black uppercase outline-none" 
                 />
              </div>
           </div>

           <Button onClick={fetchReport} variant="ghost" className="rounded-2xl h-14 w-14 border border-slate-100 bg-white">
              <RefreshCw size={18} className={cn(loading && "animate-spin")} />
           </Button>
        </div>
      </div>

      {!data ? (
        <div className="h-96 flex items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
           <div className="text-center space-y-4">
              <Activity className="mx-auto text-slate-200 animate-pulse" size={48} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Querying Data Warehouse...</p>
           </div>
        </div>
      ) : (
        <div className="space-y-10 animate-in fade-in duration-500">
           {/* Summary Metrics Matrix */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {reportType === 'ORDERS' && (
                <>
                  <MetricCard label="Total Logistics Volume" value={data.summary.total} icon={Package} color="text-blue-500" bg="bg-blue-50" />
                  <MetricCard label="Fulfillment Velocity" value={`${data.summary.onTime}%`} icon={TrendingUp} color="text-emerald-500" bg="bg-emerald-50" />
                  {/* Fix: icon Clock correctly referenced after adding to imports */}
                  <MetricCard label="Avg. Delivery Lag" value={`${data.summary.avgTime}m`} icon={Clock} color="text-indigo-500" bg="bg-indigo-50" />
                  {/* Fix: icon AlertCircle correctly referenced after adding to imports */}
                  <MetricCard label="Claim Incident Rate" value={`${((data.summary.failed/data.summary.total)*100).toFixed(1)}%`} icon={AlertCircle} color="text-rose-500" bg="bg-rose-50" />
                </>
              )}
              {reportType === 'REVENUE' && (
                <>
                  <MetricCard label="Gross Circulation" value={formatCurrency(data.summary.total)} icon={DollarSign} color="text-emerald-500" bg="bg-emerald-50" />
                  <MetricCard label="Platform Retention" value={formatCurrency(data.summary.net)} icon={ShieldCheck} color="text-blue-500" bg="bg-blue-50" />
                  <MetricCard label="Unit Yield (AOV)" value={formatCurrency(data.summary.aov)} icon={Activity} color="text-indigo-500" bg="bg-indigo-50" />
                  <MetricCard label="Voucher Liability" value={formatCurrency(data.summary.discount)} icon={Package} color="text-amber-500" bg="bg-amber-50" />
                </>
              )}
           </div>

           {/* Visual Intelligence Section */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <Card className="lg:col-span-8 rounded-[3.5rem] border-slate-200 shadow-sm overflow-hidden bg-white">
                 <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-black">Temporal Intelligence</CardTitle>
                      <CardDescription>Volume and performance tracking over active period.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                       <Button onClick={() => handleExport('CSV')} variant="outline" className="rounded-xl h-12 px-6 border-slate-200 font-bold text-xs"><Download size={16} className="mr-2" /> CSV</Button>
                       <Button onClick={() => handleExport('PDF')} className="rounded-xl h-12 px-8 bg-slate-900 font-black uppercase tracking-widest text-[10px]"><Download size={16} className="mr-2" /> Final PDF</Button>
                    </div>
                 </CardHeader>
                 <CardContent className="p-10">
                    <div className="h-[400px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          {reportType === 'ORDERS' ? (
                            <AreaChart data={data.trends}>
                               <defs>
                                 <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                 </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                               <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                               <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                               <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                               <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorTrend)" animationDuration={1500} />
                            </AreaChart>
                          ) : (
                            <BarChart data={data.trends}>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                               <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                               <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                               <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                               <Bar dataKey="amount" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={40} animationDuration={1500} />
                            </BarChart>
                          )}
                       </ResponsiveContainer>
                    </div>
                 </CardContent>
              </Card>

              <Card className="lg:col-span-4 rounded-[3.5rem] border-slate-200 shadow-sm overflow-hidden bg-white">
                 <CardHeader className="p-10 border-b border-slate-50">
                    <CardTitle className="text-xl font-black">Segment Analysis</CardTitle>
                    <CardDescription>Composition of ecosystem participants.</CardDescription>
                 </CardHeader>
                 <CardContent className="p-10">
                    <div className="h-[250px] w-full relative">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie 
                              data={reportType === 'ORDERS' ? data.status : data.methods} 
                              innerRadius={70} 
                              outerRadius={95} 
                              paddingAngle={8} 
                              dataKey="value"
                             >
                                {(reportType === 'ORDERS' ? data.status : data.methods).map((entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                             </Pie>
                             <Tooltip />
                          </PieChart>
                       </ResponsiveContainer>
                       <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <p className="text-3xl font-black text-slate-900">
                             {reportType === 'ORDERS' ? data.summary.total : '100%'}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate</p>
                       </div>
                    </div>
                    <div className="mt-12 space-y-4">
                       {(reportType === 'ORDERS' ? data.status : data.methods).map((item: any) => (
                         <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-3">
                               <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                               <span className="text-xs font-bold text-slate-600">{item.name}</span>
                            </div>
                            <span className="text-xs font-black text-slate-900">{item.value}{reportType === 'REVENUE' ? '%' : ''}</span>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
           </div>

           {/* Performance Table for Drivers */}
           {reportType === 'DRIVERS' && (
              <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden bg-white">
                 <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/30">
                    <div>
                       <CardTitle className="text-xl font-black">Field Force Efficiency Leaderboard</CardTitle>
                       <CardDescription>Top performing couriers by successful relay volume.</CardDescription>
                    </div>
                    <Button onClick={() => handleExport('PDF')} className="rounded-2xl h-14 px-10 bg-blue-600 shadow-xl shadow-blue-500/20 font-black uppercase tracking-widest text-[10px]">Generate Payroll Audit</Button>
                 </CardHeader>
                 <CardContent className="p-0">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead className="bg-slate-100/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <tr>
                                <th className="px-10 py-6">Identity</th>
                                <th className="px-10 py-6">Total Relays</th>
                                <th className="px-10 py-6">Success Floor</th>
                                <th className="px-10 py-6">On-Time</th>
                                <th className="px-10 py-6">Net Earnings</th>
                                <th className="px-10 py-6 text-right">Performance Index</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                             {data.performers.map((p: any) => (
                               <tr key={p.name} className="hover:bg-slate-50/50 transition-colors group">
                                  <td className="px-10 py-6">
                                     <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-xs text-slate-500">
                                           {p.name.charAt(0)}
                                        </div>
                                        <p className="text-sm font-black text-slate-900">{p.name}</p>
                                     </div>
                                  </td>
                                  <td className="px-10 py-6">
                                     <p className="text-sm font-bold text-slate-700">{p.orders}</p>
                                  </td>
                                  <td className="px-10 py-6">
                                     <div className="flex items-center gap-1.5">
                                        <div className="flex gap-0.5">
                                           {[1,2,3,4,5].map(s => <div key={s} className={cn("w-1 h-3 rounded-full", s <= Math.floor(p.rating) ? "bg-amber-400" : "bg-slate-100")}></div>)}
                                        </div>
                                        <span className="text-xs font-black text-slate-900">{p.rating}</span>
                                     </div>
                                  </td>
                                  <td className="px-10 py-6">
                                     <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-[9px]">{p.onTime}%</Badge>
                                  </td>
                                  <td className="px-10 py-6">
                                     <p className="text-sm font-black text-blue-600">{formatCurrency(p.earnings)}</p>
                                  </td>
                                  <td className="px-10 py-6 text-right">
                                     <div className="w-32 h-2 bg-slate-100 rounded-full ml-auto overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${(p.orders/150)*100}%` }}></div>
                                     </div>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </CardContent>
              </Card>
           )}
        </div>
      )}

      {/* Security Footer */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-blue-400">
                  <ShieldCheck size={28} />
                  <h4 className="font-black uppercase tracking-[0.2em] text-xs">Immutable Audit Trail</h4>
               </div>
               <h3 className="text-2xl font-black max-w-xl">Every data point exported via this engine is cryptographically hashed and logged to the master security audit.</h3>
               <p className="text-slate-400 text-sm max-w-md leading-relaxed">SwiftDrop ensures total transparency in logistics reporting, making every relay verifiable for regulatory compliance.</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
               <Button className="rounded-2xl h-14 px-10 bg-white text-slate-900 hover:bg-slate-100 font-black uppercase tracking-widest text-xs">
                  Review Security Logs
               </Button>
               <Button variant="ghost" className="text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest">
                  <Mail size={16} className="mr-2" /> Email Admin Copy
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string | number; icon: any; color: string; bg: string }> = ({ label, value, icon: Icon, color, bg }) => (
  <Card className="rounded-[2.5rem] border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-8">
      <div className="flex justify-between items-start mb-6">
         <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", bg, color)}>
            <Icon size={24} />
         </div>
         <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Verified</div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
    </CardContent>
  </Card>
);

export default ReportsPage;
