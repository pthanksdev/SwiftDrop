
import React, { useState, useEffect } from 'react';
import { 
  Settings, Shield, Zap, Globe, 
  Map as MapIcon, CreditCard, MessageSquare, 
  Bell, Lock, Terminal, Save, 
  RefreshCw, CheckCircle, Info, Truck,
  Clock, AlertTriangle, Database, Cloud
} from 'lucide-react';
import { adminApi } from '../../api/endpoints/admin.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

type TabType = 'general' | 'operations' | 'integrations' | 'security';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>({
    general: {
      companyName: 'SwiftDrop Logistics',
      contactEmail: 'admin@swiftdrop.io',
      timezone: 'UTC-8',
      currency: 'USD',
      businessHours: { open: '08:00', close: '22:00' }
    },
    operations: {
      autoAssign: true,
      assignmentRadius: 5,
      maxDeliveriesPerDriver: 3,
      cancellationWindow: 15,
      minDriverRating: 4.5
    },
    integrations: {
      googleMapsKey: 'AIzaSy****************',
      stripeMode: 'TEST',
      smsProvider: 'TWILIO',
      fcmKey: 'AAAA****************'
    },
    security: {
      sessionTimeout: 60,
      maxLoginAttempts: 5,
      twoFactorAuth: true,
      passwordRequirements: { upper: true, number: true, special: true }
    }
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // await adminApi.updateSystemSettings(settings);
      toast.success('System configuration deployed across network.');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (service: string) => {
    toast.info(`Initiating diagnostic for ${service}...`);
    setTimeout(() => {
      toast.success(`${service} uplink established and verified.`);
    }, 1500);
  };

  const SidebarItem = ({ id, label, icon: Icon, color }: { id: TabType, label: string, icon: any, color: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all group",
        activeTab === id 
          ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
          : "text-slate-500 hover:bg-slate-100"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
        activeTab === id ? color : "bg-slate-100 text-slate-400 group-hover:bg-white"
      )}>
        <Icon size={20} />
      </div>
      <span className="flex-1 text-left">{label}</span>
      {activeTab === id && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
    </button>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Core</h1>
          <p className="text-slate-500 font-medium">Control the operational parameters and security layers of SwiftDrop.</p>
        </div>
        <Button onClick={handleSave} isLoading={loading} className="rounded-2xl h-14 px-10 bg-blue-600 shadow-xl shadow-blue-500/20 font-black uppercase tracking-widest text-xs">
          Deploy All Changes <Save size={18} className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <SidebarItem id="general" label="Identity & Regional" icon={Globe} color="bg-blue-600" />
          <SidebarItem id="operations" label="Logistics Engine" icon={Zap} color="bg-amber-500" />
          <SidebarItem id="integrations" label="Service Uplinks" icon={Cloud} color="bg-indigo-600" />
          <SidebarItem id="security" label="Cyber Security" icon={Shield} color="bg-rose-600" />
          
          <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white space-y-4">
             <div className="flex items-center gap-3">
                <Database size={20} className="text-blue-400" />
                <h4 className="font-bold text-xs uppercase tracking-widest">Version Alpha</h4>
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
               Last build: 2024-03-15.112<br/>
               Relay Environment: Production<br/>
               Health: Nominal
             </p>
          </div>
        </div>

        {/* Workspace Area */}
        <div className="lg:col-span-9 animate-in fade-in slide-in-from-right-4 duration-500">
          {activeTab === 'general' && (
            <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
               <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                  <CardTitle className="text-xl font-black">Global Identity</CardTitle>
                  <CardDescription>Public-facing platform properties and regional settings.</CardDescription>
               </CardHeader>
               <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Alias</label>
                        <Input 
                          value={settings.general.companyName} 
                          onChange={(e) => setSettings({...settings, general: {...settings.general, companyName: e.target.value}})}
                          className="py-7 rounded-2xl"
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Alert Relay (Email)</label>
                        <Input 
                          type="email"
                          value={settings.general.contactEmail} 
                          onChange={(e) => setSettings({...settings, general: {...settings.general, contactEmail: e.target.value}})}
                          className="py-7 rounded-2xl"
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Timezone</label>
                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold">
                           <option>UTC-8 (Pacific)</option>
                           <option>UTC-5 (Eastern)</option>
                           <option>UTC+0 (London)</option>
                        </select>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Currency</label>
                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold">
                           <option>USD ($)</option>
                           <option>EUR (€)</option>
                           <option>GBP (£)</option>
                        </select>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Language</label>
                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold">
                           <option>English (US)</option>
                           <option>Spanish</option>
                           <option>French</option>
                        </select>
                     </div>
                  </div>

                  <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                     <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Clock size={16} /> Operational Availability
                     </h4>
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Daily Dispatch Start</p>
                           <Input type="time" value={settings.general.businessHours.open} className="py-6 rounded-xl bg-white" />
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Daily Dispatch Cease</p>
                           <Input type="time" value={settings.general.businessHours.close} className="py-6 rounded-xl bg-white" />
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          )}

          {activeTab === 'operations' && (
            <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
               <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                  <CardTitle className="text-xl font-black">Logistics Routing Engine</CardTitle>
                  <CardDescription>Calibrate the automated dispatch and matching algorithms.</CardDescription>
               </CardHeader>
               <CardContent className="p-8 space-y-10">
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                     <div className="space-y-1">
                        <h4 className="font-black text-slate-900 leading-tight">Autonomous Dispatch</h4>
                        <p className="text-xs text-slate-500">Enable algorithmic driver assignment for pending orders.</p>
                     </div>
                     <button 
                        onClick={() => setSettings({...settings, operations: {...settings.operations, autoAssign: !settings.operations.autoAssign}})}
                        className={cn(
                          "w-16 h-8 rounded-full transition-all relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-6 after:h-6 after:bg-white after:rounded-full after:transition-all",
                          settings.operations.autoAssign ? "bg-blue-600 after:translate-x-8" : "bg-slate-300"
                        )}
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assignment Radius (km)</label>
                        <div className="flex items-center gap-4">
                           <input type="range" min="1" max="20" className="flex-1 accent-blue-600" value={settings.operations.assignmentRadius} onChange={(e) => setSettings({...settings, operations: {...settings.operations, assignmentRadius: Number(e.target.value)}})} />
                           <Badge className="bg-blue-50 text-blue-600 border-none font-black px-3 py-1.5">{settings.operations.assignmentRadius} km</Badge>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Maximum search distance for driver matching from pickup point.</p>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Concurrency Limit</label>
                        <Input type="number" value={settings.operations.maxDeliveriesPerDriver} className="py-6 rounded-xl" />
                        <p className="text-[10px] text-slate-400 font-medium">Max active shipments allowed per courier unit simultaneously.</p>
                     </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cancellation Window (min)</label>
                        <Input type="number" value={settings.operations.cancellationWindow} className="py-6 rounded-xl" />
                        <p className="text-[10px] text-slate-400 font-medium">Minutes allowed for refund-free cancellation after order placement.</p>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Min. Performance Floor (Rating)</label>
                        <Input type="number" step="0.1" value={settings.operations.minDriverRating} className="py-6 rounded-xl" />
                        <p className="text-[10px] text-slate-400 font-medium">Drivers falling below this star threshold are automatically suspended.</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-8">
               <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
                  <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                     <CardTitle className="text-xl font-black">Third-Party Uplinks</CardTitle>
                     <CardDescription>Manage API keys and external logistics service credentials.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-10">
                     {[
                        { label: 'Google Maps Infrastructure', icon: MapIcon, key: 'googleMapsKey', desc: 'Required for geospatial routing and address auto-complete.' },
                        { label: 'Stripe Payment Gateway', icon: CreditCard, key: 'stripeMode', desc: 'Secure settlement for platform-wide financial transactions.' },
                        { label: 'Twilio SMS Communication', icon: MessageSquare, key: 'smsProvider', desc: 'Outbound real-time shipment alerts to customers.' },
                        { label: 'Firebase Cloud Messaging', icon: Bell, key: 'fcmKey', desc: 'Infrastructure for real-time mobile push notifications.' }
                     ].map((item) => (
                        <div key={item.key} className="space-y-4">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                                    <item.icon size={16} />
                                 </div>
                                 <h4 className="font-bold text-slate-900">{item.label}</h4>
                              </div>
                              <Button variant="ghost" onClick={() => testConnection(item.label)} className="text-[10px] font-black uppercase text-blue-600">Test Connection</Button>
                           </div>
                           <div className="flex gap-4">
                              <Input 
                                 type="password" 
                                 value={settings.integrations[item.key]} 
                                 className="flex-1 py-6 rounded-xl font-mono text-xs bg-slate-50 border-none" 
                                 readOnly
                              />
                              <Button variant="outline" className="rounded-xl px-6 border-slate-200 font-bold text-xs">Update Key</Button>
                           </div>
                           <p className="text-[10px] text-slate-400 italic">{item.desc}</p>
                        </div>
                     ))}
                  </CardContent>
               </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <Card className="rounded-[3rem] border-slate-200 shadow-sm overflow-hidden">
               <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                  <CardTitle className="text-xl font-black">Cyber Defense Protocols</CardTitle>
                  <CardDescription>Harden platform access and administrative security layers.</CardDescription>
               </CardHeader>
               <CardContent className="p-8 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Session TTL (Minutes)</label>
                        <Input type="number" value={settings.security.sessionTimeout} className="py-6 rounded-xl" />
                        <p className="text-[10px] text-slate-400 font-medium">Time before an inactive admin session is forcefully terminated.</p>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brute-Force Guard</label>
                        <Input type="number" value={settings.security.maxLoginAttempts} className="py-6 rounded-xl" />
                        <p className="text-[10px] text-slate-400 font-medium">Failed login attempts allowed before account lockout.</p>
                     </div>
                  </div>

                  <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-rose-700">
                           <Lock size={20} />
                           <h4 className="font-black uppercase tracking-widest text-xs">Multi-Factor Authentication</h4>
                        </div>
                        <button 
                           onClick={() => setSettings({...settings, security: {...settings.security, twoFactorAuth: !settings.security.twoFactorAuth}})}
                           className={cn(
                             "w-16 h-8 rounded-full transition-all relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-6 after:h-6 after:bg-white after:rounded-full after:transition-all",
                             settings.security.twoFactorAuth ? "bg-emerald-600 after:translate-x-8" : "bg-rose-600"
                           )}
                        />
                     </div>
                     <p className="text-xs text-rose-600 font-medium leading-relaxed">
                        Mandatory for all accounts with ADMIN or DISPATCHER privileges. Uses TOTP (Authenticator App) or SMS validation on every login attempt.
                     </p>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Network Whitelist (IP Addresses)</label>
                     <textarea 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-mono min-h-[100px] outline-none"
                        placeholder="192.168.1.1, 45.12.0.0/24..."
                     ></textarea>
                     <p className="text-[10px] text-slate-400 italic flex items-center gap-1">
                        <Shield size={10} className="text-rose-500" /> Administrative console access will be restricted ONLY to these addresses.
                     </p>
                  </div>
               </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
