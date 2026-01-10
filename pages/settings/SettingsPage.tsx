
import React, { useState } from 'react';
import { 
  Settings, Globe, DollarSign, Bell, Cloud, 
  Save, RefreshCw, CheckCircle, Info, Truck,
  Clock, CreditCard, ShieldCheck, Map as MapIcon,
  MessageSquare, Zap, Smartphone, Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

type SettingsTab = 'general' | 'pricing' | 'notifications' | 'integrations';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('System configuration updated.');
    }, 1000);
  };

  const NavItem = ({ id, icon: Icon, label }: { id: SettingsTab; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "flex items-center gap-3 p-4 rounded-2xl font-bold text-sm transition-all",
        activeTab === id 
          ? "bg-slate-900 text-white shadow-xl" 
          : "text-slate-500 hover:bg-slate-100"
      )}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Core</h1>
          <p className="text-slate-500 font-medium">Calibrate global platform parameters and uplinks.</p>
        </div>
        <Button onClick={handleSave} isLoading={loading} className="rounded-2xl h-14 px-10 bg-blue-600 shadow-xl shadow-blue-500/20 font-black uppercase tracking-widest text-xs">
          Deploy Changes <Save size={18} className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 flex flex-col gap-2">
          <NavItem id="general" icon={Globe} label="Identity & Regional" />
          <NavItem id="pricing" icon={DollarSign} label="Logistics Pricing" />
          <NavItem id="notifications" icon={Bell} label="Alert Protocols" />
          <NavItem id="integrations" icon={Cloud} label="Service Uplinks" />
          
          <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
             <div className="flex items-center gap-2 text-slate-400 mb-2">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Environment</span>
             </div>
             <p className="text-xs font-bold text-slate-900">Production Node Alpha</p>
             <p className="text-[10px] text-slate-400 mt-1">Last Deploy: 2h ago</p>
          </div>
        </div>

        <div className="lg:col-span-9 animate-in fade-in duration-500">
          {activeTab === 'general' && (
            <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-xl font-black">Platform Identity</CardTitle>
                <CardDescription>Branding and regional operational standards.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                      <Input defaultValue="SwiftDrop Logistics Inc." className="py-6 rounded-2xl" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Hotline</label>
                      <Input defaultValue="+1 (888) SWIFT-LOG" className="py-6 rounded-2xl" />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Currency</label>
                      <select className="w-full h-[52px] bg-white border border-slate-200 rounded-2xl px-4 font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Timezone</label>
                      <select className="w-full h-[52px] bg-white border border-slate-200 rounded-2xl px-4 font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10">
                        <option>UTC-8 (Pacific)</option>
                        <option>UTC-5 (Eastern)</option>
                        <option>UTC+0 (GMT)</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit System</label>
                      <select className="w-full h-[52px] bg-white border border-slate-200 rounded-2xl px-4 font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10">
                        <option>Metric (km/kg)</option>
                        <option>Imperial (mi/lb)</option>
                      </select>
                   </div>
                </div>

                <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                   <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Clock size={16} /> Operational Availability
                   </h4>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <p className="text-[10px] font-bold text-slate-400 uppercase">Dispatch Start</p>
                         <Input type="time" defaultValue="08:00" className="py-6 rounded-xl bg-white" />
                      </div>
                      <div className="space-y-2">
                         <p className="text-[10px] font-bold text-slate-400 uppercase">Dispatch End</p>
                         <Input type="time" defaultValue="22:00" className="py-6 rounded-xl bg-white" />
                      </div>
                   </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'pricing' && (
            <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-xl font-black">Yield Calibration</CardTitle>
                <CardDescription>Determine logistics costs and platform margins.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Delivery Fare ($)</label>
                      <Input type="number" defaultValue="15.00" className="py-6 rounded-2xl" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Distance Charge ($/km)</label>
                      <Input type="number" defaultValue="2.50" className="py-6 rounded-2xl" />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mass Surcharge ($/kg)</label>
                      <Input type="number" defaultValue="1.00" className="py-6 rounded-2xl" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Commission (%)</label>
                      <Input type="number" defaultValue="20" className="py-6 rounded-2xl" />
                   </div>
                </div>

                <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-amber-700">
                         <Zap size={20} />
                         <h4 className="font-black uppercase tracking-widest text-xs">Peak Surge Protocol</h4>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 border-none text-[8px] font-black">ENABLED</Badge>
                   </div>
                   <div className="flex items-center gap-12">
                      <div className="flex-1 space-y-2">
                         <p className="text-2xl font-black text-slate-900">1.5x</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Surge Multiplier</p>
                      </div>
                      <div className="w-1/2">
                        <input type="range" min="1" max="5" step="0.1" defaultValue="1.5" className="w-full accent-amber-500" />
                      </div>
                   </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-xl font-black">Alert Protocols</CardTitle>
                <CardDescription>Manage user and administrative notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {[
                  { id: 'email', label: 'Email Infrastructure', desc: 'Transaction receipts and security alerts.', icon: Mail },
                  { id: 'sms', label: 'SMS Relays', desc: 'Real-time courier-to-customer status updates.', icon: Smartphone },
                  { id: 'push', label: 'In-App / Push', desc: 'Driver dispatch pings and platform broadcast.', icon: Zap }
                ].map((pref) => (
                  <div key={pref.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                          <pref.icon size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-slate-900">{pref.label}</p>
                          <p className="text-xs text-slate-500">{pref.desc}</p>
                       </div>
                    </div>
                    <button className="w-12 h-6 bg-emerald-500 rounded-full relative shadow-inner">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-xl font-black">Service Uplinks</CardTitle>
                <CardDescription>Third-party API and infrastructure configuration.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-10">
                {[
                  { label: 'Google Maps Cloud', icon: MapIcon, key: 'AIzaSy****************', status: 'Optimal' },
                  { label: 'Stripe Settlement', icon: CreditCard, key: 'sk_live_****************', status: 'Optimal' },
                  { label: 'Twilio Communication', icon: MessageSquare, key: 'AC8821****************', status: 'Lag Detected' }
                ].map((int) => (
                  <div key={int.label} className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400"><int.icon size={16} /></div>
                           <h4 className="font-bold text-slate-900">{int.label}</h4>
                        </div>
                        <Badge className={cn(
                          "text-[8px] font-black uppercase border-none",
                          int.status === 'Optimal' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        )}>{int.status}</Badge>
                     </div>
                     <div className="flex gap-4">
                        <Input type="password" value={int.key} readOnly className="flex-1 py-6 rounded-xl font-mono text-xs bg-slate-50 border-none" />
                        <Button variant="outline" className="rounded-xl px-6 font-bold text-xs border-slate-200">Reset Key</Button>
                     </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
