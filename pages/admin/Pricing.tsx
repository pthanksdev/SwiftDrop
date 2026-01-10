
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, MapPin, Package, Clock, 
  Percent, Save, Plus, Trash2, 
  Calendar, Zap, TrendingUp, Info,
  Tag, ShieldCheck, ArrowRight
} from 'lucide-react';
import { adminApi } from '../../api/endpoints/admin.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const Pricing: React.FC = () => {
  const [config, setConfig] = useState<any>({
    baseFare: 15.00,
    perKmRate: 2.50,
    perKgRate: 1.00,
    peakMultiplier: 1.5,
    commissionRate: 80, // % to driver
    platformFee: 2.50,
  });
  
  const [promos, setPromos] = useState<any[]>([
    { code: 'WELCOME50', discount: '50%', expiry: '2024-12-31', usage: '124/500' },
    { code: 'SWIFTFREE', discount: '100%', expiry: '2024-06-01', usage: '42/100' },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSaveConfig = async () => {
    setLoading(true);
    try {
      // await adminApi.updatePricingConfig(config);
      toast.success('Logistics rates calibrated successfully.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Yield & Logistics Calibration</h1>
          <p className="text-slate-500 font-medium">Fine-tune the financial engine of your delivery network.</p>
        </div>
        <Button onClick={handleSaveConfig} isLoading={loading} className="rounded-2xl h-14 px-10 bg-blue-600 shadow-xl shadow-blue-500/20 font-black uppercase tracking-widest text-xs">
          Deploy New Rates <Save size={18} className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Rate Card */}
        <Card className="lg:col-span-2 rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
            <CardTitle className="text-lg font-black flex items-center gap-3">
              <TrendingUp size={20} className="text-blue-500" /> Fundamental Logistics Pricing
            </CardTitle>
            <CardDescription>Determine the baseline costs for all shipment relays.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Logistics Fare ($)</label>
                 <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <Input 
                      type="number" 
                      value={config.baseFare} 
                      onChange={(e) => setConfig({...config, baseFare: Number(e.target.value)})}
                      className="pl-12 py-7 rounded-2xl bg-white border-slate-200"
                    />
                 </div>
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Distance Multiplier ($/km)</label>
                 <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <Input 
                      type="number" 
                      value={config.perKmRate} 
                      onChange={(e) => setConfig({...config, perKmRate: Number(e.target.value)})}
                      className="pl-12 py-7 rounded-2xl bg-white border-slate-200"
                    />
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mass Charge ($/kg)</label>
                 <div className="relative group">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <Input 
                      type="number" 
                      value={config.perKgRate} 
                      onChange={(e) => setConfig({...config, perKgRate: Number(e.target.value)})}
                      className="pl-12 py-7 rounded-2xl bg-white border-slate-200"
                    />
                 </div>
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Admin Fee ($)</label>
                 <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <Input 
                      type="number" 
                      value={config.platformFee} 
                      onChange={(e) => setConfig({...config, platformFee: Number(e.target.value)})}
                      className="pl-12 py-7 rounded-2xl bg-white border-slate-200"
                    />
                 </div>
               </div>
            </div>

            <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white space-y-6 shadow-2xl shadow-blue-500/20">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Zap size={24} className="text-blue-200" />
                     <h4 className="font-black uppercase tracking-widest text-xs">Peak Surge Protocol</h4>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/10 font-black text-[10px]">DYNAMIC ENABLED</Badge>
               </div>
               <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 space-y-2">
                     <p className="text-2xl font-black">{config.peakMultiplier}x</p>
                     <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Active Traffic Multiplier</p>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center gap-4 bg-white/10 p-4 rounded-2xl">
                     <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      step="0.1" 
                      value={config.peakMultiplier}
                      onChange={(e) => setConfig({...config, peakMultiplier: Number(e.target.value)})}
                      className="flex-1 accent-white" 
                     />
                     <span className="font-black text-sm">{config.peakMultiplier}x</span>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission & Promos */}
        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b border-slate-50">
              <CardTitle className="text-lg font-black">Driver Revenue Share</CardTitle>
              <CardDescription>Determine the platform commission.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Courier Payout</span>
                  <span className="text-lg font-black text-blue-600">{config.commissionRate}%</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${config.commissionRate}%` }}></div>
               </div>
               <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                  <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                    Increasing this percentage attracts more high-quality drivers but reduces platform operational margins.
                  </p>
               </div>
               <Input 
                type="number" 
                max="100" 
                min="0"
                value={config.commissionRate}
                onChange={(e) => setConfig({...config, commissionRate: Number(e.target.value)})}
                className="py-6 rounded-2xl bg-white border-slate-100 text-center font-black"
               />
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black">Active Vouchers</CardTitle>
                <CardDescription>Manage user incentive codes.</CardDescription>
              </div>
              <Button size="icon" className="rounded-xl h-10 w-10 bg-slate-900"><Plus size={18} /></Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-50">
                 {promos.map((p) => (
                   <div key={p.code} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                     <div>
                       <div className="flex items-center gap-2">
                          <Tag size={12} className="text-blue-500" />
                          <p className="text-sm font-black text-slate-900">{p.code}</p>
                       </div>
                       <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{p.discount} OFF • Usage: {p.usage}</p>
                     </div>
                     <button className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
