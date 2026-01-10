
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  User, Mail, Phone, Camera, Shield, 
  Clock, Package, Star, CreditCard, 
  Activity, ArrowRight, LogOut, Lock,
  Key
} from 'lucide-react';
// Fixed: Added CardDescription to the UI component imports to resolve reference error on line 129
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';
import { formatCurrency, formatDate } from '../utils/formatters';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 min-h-screen">
      <div className="relative h-64 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute -bottom-16 left-12 flex items-end gap-8">
            <div className="relative group">
               <div className="w-40 h-40 bg-white rounded-[2.5rem] p-1 shadow-2xl overflow-hidden border-8 border-slate-50">
                  <div className="w-full h-full bg-slate-100 rounded-[2rem] flex items-center justify-center text-4xl font-black text-blue-600">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
               </div>
               <button className="absolute bottom-4 right-4 p-3 bg-slate-900 text-white rounded-2xl shadow-xl hover:scale-110 transition-transform">
                  <Camera size={18} />
               </button>
            </div>
            <div className="pb-20 text-white">
               <h1 className="text-4xl font-black tracking-tight leading-none mb-2">{user.firstName} {user.lastName}</h1>
               <div className="flex items-center gap-3">
                  <Badge className="bg-white/20 text-white border-none font-black text-[10px] tracking-widest uppercase py-1">{user.role}</Badge>
                  <span className="text-white/60 text-sm font-medium">Joined {new Date(user.createdAt).getFullYear()}</span>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Role Specific Stats */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden bg-white">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Personal Metrics</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Deliveries</p>
                       <p className="text-2xl font-black text-slate-900">1.2k</p>
                    </div>
                    <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100">
                       <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Score</p>
                       <p className="text-2xl font-black text-blue-700">4.95</p>
                    </div>
                 </div>
                 <div className="space-y-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-slate-500 font-bold">Account Security</span>
                       <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px]">HIGH</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-slate-500 font-bold">System Reliability</span>
                       <span className="font-black">99.8%</span>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Button 
            onClick={logout}
            variant="ghost" 
            className="w-full rounded-[2rem] py-8 text-rose-600 hover:bg-rose-50 font-black uppercase tracking-widest text-xs"
           >
             Terminate Session <LogOut size={18} className="ml-2" />
           </Button>
        </div>

        {/* Identity & Security Workspace */}
        <div className="lg:col-span-8 space-y-8">
           <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden bg-white shadow-sm">
              <CardHeader className="p-8 border-b border-slate-50">
                 <CardTitle className="text-xl font-black">Identity Details</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                       <Input defaultValue={user.firstName} className="py-7 rounded-2xl" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                       <Input defaultValue={user.lastName} className="py-7 rounded-2xl" />
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Relay</label>
                       <Input defaultValue={user.email} className="py-7 rounded-2xl" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verified Phone</label>
                       <Input defaultValue={user.phone} className="py-7 rounded-2xl" />
                    </div>
                 </div>
                 <div className="pt-4 flex justify-end">
                    <Button className="rounded-2xl h-14 px-10 bg-slate-900 text-white font-black uppercase tracking-widest text-xs">
                       Update Identity <ArrowRight size={18} className="ml-2" />
                    </Button>
                 </div>
              </CardContent>
           </Card>

           <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden bg-white shadow-sm">
              <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                 <CardTitle className="text-xl font-black">Security Rotation</CardTitle>
                 <CardDescription>Hardened access and authentication controls.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                 <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center"><Shield size={24} /></div>
                       <div>
                          <p className="font-bold text-sm">Two-Factor Authentication</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Active • Using TOTP Relay</p>
                       </div>
                    </div>
                    <Button variant="ghost" className="text-blue-400 font-black text-xs p-0 h-auto">MANAGE</Button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                       <Input type="password" placeholder="••••••••" className="py-7 rounded-2xl" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Hash</label>
                       <Input type="password" placeholder="••••••••" className="py-7 rounded-2xl" />
                    </div>
                 </div>

                 <div className="pt-4 flex justify-end">
                    <Button className="rounded-2xl h-14 px-10 border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 font-black uppercase tracking-widest text-xs">
                       Rotate Credentials <Lock size={18} className="ml-2" />
                    </Button>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
