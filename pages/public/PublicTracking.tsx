
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Truck, Globe, ShieldCheck, Map as MapIcon, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

const PublicTracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    setLoading(true);
    // Simulate lookup
    setTimeout(() => {
      setLoading(false);
      navigate(`/public-tracking/${orderId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-2xl relative z-10 space-y-12 text-center">
         <div className="space-y-6">
            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-3xl shadow-blue-500/20 animate-bounce-slow">
               <Globe size={40} className="text-white" />
            </div>
            <div className="space-y-2">
               <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Locate Shipment</h1>
               <p className="text-slate-400 font-medium">Enter your SwiftDrop Tracking ID for real-time telemetry.</p>
            </div>
         </div>

         <form onSubmit={handleTrack} className="space-y-6">
            <div className="relative group">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Search size={24} />
               </div>
               <input 
                  type="text"
                  placeholder="e.g. ORD-7721"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-[2.5rem] py-8 pl-16 pr-8 text-2xl font-black text-white placeholder:text-slate-700 outline-none focus:border-blue-500 focus:bg-white/10 transition-all shadow-2xl"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
               />
               <button 
                  type="submit"
                  disabled={!orderId || loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
               >
                  {loading ? <Loader2 className="animate-spin" /> : <ArrowRight size={28} />}
               </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
               {[
                  { label: 'Satellite GPS', icon: Globe },
                  { label: 'Carrier Mesh', icon: Truck },
                  { label: 'E2E Encrypted', icon: ShieldCheck }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <item.icon size={14} className="text-blue-500/50" />
                     {item.label}
                  </div>
               ))}
            </div>
         </form>

         <div className="pt-12 border-t border-white/5">
            <p className="text-slate-600 text-xs font-medium">
               Lost your tracking ID? Check your order confirmation email <br/> or contact support at <span className="text-blue-500">hello@swiftdrop.io</span>
            </p>
         </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PublicTracking;
