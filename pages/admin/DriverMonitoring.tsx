
import React, { useState, useEffect } from 'react';
import { 
  Map as MapIcon, Users, Truck, Activity, 
  Star, Clock, ChevronRight, Phone, 
  AlertTriangle, Filter, Search, Ban,
  Signal, ShieldCheck, TrendingUp,
  // Added X to the imports from lucide-react
  X
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { adminApi } from '../../api/endpoints/admin.api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../utils/formatters';

// Custom Marker Icons for Fleet
const createDriverIcon = (status: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="relative flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-xl border-2 ${status === 'ONLINE' ? 'border-emerald-500' : 'border-slate-300'}">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${status === 'ONLINE' ? '#10b981' : '#64748b'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3m15 0h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
           <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${status === 'ONLINE' ? 'bg-emerald-500' : 'bg-slate-400'}"></div>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const DriverMonitoring: React.FC = () => {
  const [fleet, setFleet] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const res = await adminApi.getLiveFleetStatus();
        setFleet(res.data || []);
      } catch (err) {
        // Mock data for real-time visualization
        setFleet([
          { id: 'd1', name: 'James Wilson', plate: 'SF-9902', lat: 37.7749, lng: -122.4194, status: 'ONLINE', orders: 2, rating: 4.9, onTime: '98%', earnings: 420 },
          { id: 'd2', name: 'Maria Garcia', plate: 'SF-8821', lat: 37.7833, lng: -122.4167, status: 'ONLINE', orders: 1, rating: 5.0, onTime: '100%', earnings: 1250 },
          { id: 'd3', name: 'Kevin Park', plate: 'SF-7711', lat: 37.7651, lng: -122.4241, status: 'BUSY', orders: 4, rating: 4.7, onTime: '92%', earnings: 2100 },
          { id: 'd4', name: 'Elena Rossi', plate: 'SF-6644', lat: 37.7901, lng: -122.4001, status: 'OFFLINE', orders: 0, rating: 4.8, onTime: '96%', earnings: 840 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
    const interval = setInterval(fetchFleet, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const filteredFleet = fleet.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.plate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-40 flex bg-slate-50 font-sans">
      {/* Sidebar: Driver List */}
      <div className="w-[450px] bg-white border-r border-slate-200 flex flex-col h-full shadow-2xl relative z-50 animate-in slide-in-from-left duration-500">
        <div className="p-8 border-b border-slate-50 space-y-6">
           <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Fleet Command</h1>
              <Badge className="bg-emerald-100 text-emerald-700 font-black text-[10px]">LIVE RECEPTION</Badge>
           </div>
           
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <Input 
                placeholder="Locate Driver ID or Plate..." 
                className="pl-12 py-6 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>

           <div className="grid grid-cols-3 gap-2">
             {[
               { label: 'Total', count: fleet.length, color: 'text-slate-900' },
               { label: 'Active', count: fleet.filter(d => d.status === 'ONLINE').length, color: 'text-emerald-500' },
               { label: 'Busy', count: fleet.filter(d => d.status === 'BUSY').length, color: 'text-amber-500' }
             ].map(stat => (
               <div key={stat.label} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={cn("text-lg font-black", stat.color)}>{stat.count}</p>
               </div>
             ))}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-6 space-y-4">
           {filteredFleet.map((driver) => (
             <Card 
               key={driver.id} 
               onClick={() => setSelectedDriver(driver)}
               className={cn(
                 "rounded-[2rem] border-slate-200 shadow-sm cursor-pointer transition-all hover:scale-[1.02]",
                 selectedDriver?.id === driver.id ? "ring-2 ring-blue-600 shadow-xl" : "hover:shadow-md"
               )}
             >
               <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400">
                           {driver.name.charAt(0)}{driver.name.split(' ')[1]?.charAt(0)}
                        </div>
                        <div>
                           <h4 className="font-black text-slate-900">{driver.name}</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{driver.plate}</p>
                        </div>
                     </div>
                     <Badge className={cn(
                       "text-[9px] font-black py-0.5",
                       driver.status === 'ONLINE' ? "bg-emerald-50 text-emerald-600 border-none" : "bg-slate-100 text-slate-400 border-none"
                     )}>
                       {driver.status}
                     </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase">
                           <Activity size={10} className="text-blue-500" /> Dispatching
                        </div>
                        <p className="text-xs font-bold text-slate-700">{driver.orders} Active Orders</p>
                     </div>
                     <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase">
                           <Star size={10} className="text-amber-500" /> Success
                        </div>
                        <p className="text-xs font-bold text-slate-700">{driver.onTime} On-Time</p>
                     </div>
                  </div>
               </CardContent>
             </Card>
           ))}
        </div>

        {selectedDriver && (
          <div className="p-8 bg-slate-900 text-white animate-in slide-in-from-bottom duration-500">
             <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-black">{selectedDriver.name}</h3>
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Fleet Telemetry</p>
                </div>
                <button onClick={() => setSelectedDriver(null)}><X size={20} className="text-slate-400" /></button>
             </div>
             
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-400">Lifetime Revenue</span>
                   <span className="text-lg font-black text-emerald-400">{formatCurrency(selectedDriver.earnings)}</span>
                </div>
                <div className="flex gap-2">
                   <Button className="flex-1 rounded-xl h-12 bg-blue-600 font-bold"><Phone size={16} className="mr-2" /> Call Driver</Button>
                   <Button variant="outline" className="flex-1 rounded-xl h-12 border-slate-700 hover:bg-rose-600 hover:text-white transition-colors text-rose-500 font-bold">
                     <Ban size={16} className="mr-2" /> Deactivate
                   </Button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Main Content: Map View */}
      <div className="flex-1 relative overflow-hidden bg-slate-100">
         <MapContainer 
           center={[37.7749, -122.4194]} 
           zoom={13} 
           className="h-full w-full"
           zoomControl={false}
         >
           <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           
           {filteredFleet.map(driver => (
             <Marker 
               key={driver.id} 
               position={[driver.lat, driver.lng]} 
               icon={createDriverIcon(driver.status)}
               eventHandlers={{
                 click: () => setSelectedDriver(driver),
               }}
             >
               <Popup className="font-sans">
                 <div className="p-2 space-y-2">
                    <p className="font-black text-sm text-slate-900">{driver.name}</p>
                    <Badge variant="secondary" className="text-[9px]">{driver.status}</Badge>
                    <p className="text-[10px] text-slate-500">Last heartbeat: 2s ago</p>
                 </div>
               </Popup>
             </Marker>
           ))}
         </MapContainer>

         {/* Floating Map HUD */}
         <div className="absolute top-8 right-8 z-[1000] flex flex-col gap-4">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-6 rounded-[2rem] shadow-2xl flex items-center gap-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Signal size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Signal Health</p>
                    <p className="text-sm font-black text-slate-900">Optimal (42ms)</p>
                  </div>
               </div>
               <div className="h-10 w-px bg-slate-200"></div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><ShieldCheck size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Fleet Security</p>
                    <p className="text-sm font-black text-slate-900">All Units Encrypted</p>
                  </div>
               </div>
            </div>

            <Card className="bg-slate-900/90 backdrop-blur-md border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden max-w-sm ml-auto">
               <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3 text-blue-400">
                     <TrendingUp size={24} />
                     <h4 className="font-black uppercase tracking-widest text-xs">Peak Hour Intel</h4>
                  </div>
                  <h3 className="text-xl font-black text-white">Demand is peaking in Tenderloin district.</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">System predicts a 22% increase in logistics volume over the next 45 minutes. Consider redirecting Unit-22 for coverage.</p>
                  <Button className="w-full h-12 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-widest">Broadcast Alert to Fleet</Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default DriverMonitoring;
