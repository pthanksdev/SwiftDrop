
import React, { useState, useEffect } from 'react';
import { 
  Shield, Truck, Search, Filter, 
  FileText, CheckCircle, XCircle, 
  Clock, ArrowRight, UserPlus,
  RefreshCw, X, MoreVertical, ExternalLink
} from 'lucide-react';
import { adminApi } from '../../api/endpoints/admin.api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';
import DriverReviewDialog from '../../components/admin/DriverReviewDialog';

const DriverApproval: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getDriverApplications(activeTab);
      setApplications(res.data || []);
    } catch (err) {
      // Mock data for high-fidelity demonstration
      setApplications([
        { 
          id: '1', 
          firstName: 'Marcus', 
          lastName: 'Holloway', 
          email: 'marcus.h@example.com', 
          phone: '+1 (415) 555-0911',
          vehicleType: 'VAN', 
          plate: 'SF-GRID-99', 
          date: new Date().toISOString(),
          status: 'PENDING'
        },
        { 
          id: '2', 
          firstName: 'Sarah', 
          lastName: 'Chen', 
          email: 's.chen@logistics.net', 
          phone: '+1 (415) 555-8821',
          vehicleType: 'SEDAN', 
          plate: 'SF-VOLT-22', 
          date: new Date().toISOString(),
          status: 'PENDING'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [activeTab]);

  const handleApprove = async (id: string) => {
    await adminApi.approveDriver(id);
    fetchApplications();
  };

  const handleReject = async (id: string, reason: string) => {
    await adminApi.rejectDriver(id, reason);
    fetchApplications();
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fleet Verification</h1>
          <p className="text-slate-500 font-medium">Review and validate field personnel applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-black text-[10px] uppercase tracking-widest px-4 py-2">
            {applications.length} Applications Active
          </Badge>
          <Button onClick={fetchApplications} variant="ghost" className="rounded-xl h-12 w-12 border border-slate-100 bg-white">
            <RefreshCw size={18} className={cn(loading && "animate-spin")} />
          </Button>
        </div>
      </div>

      <div className="flex items-center bg-white p-1.5 rounded-[2rem] border border-slate-200 w-fit shadow-sm">
        {(['PENDING', 'APPROVED', 'REJECTED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === tab 
                ? "bg-slate-900 text-white shadow-xl" 
                : "text-slate-400 hover:text-slate-900"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 rounded-[3rem] animate-pulse" />)
        ) : applications.length > 0 ? (
          applications.map((app) => (
            <Card key={app.id} className="rounded-[3rem] border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center text-xl font-black">
                      {app.firstName.charAt(0)}{app.lastName.charAt(0)}
                    </div>
                    <Badge variant="outline" className="border-slate-100 font-bold text-[9px] uppercase tracking-widest">
                       {new Date(app.date).toLocaleDateString()}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-none">{app.firstName} {app.lastName}</h3>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{app.email}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400"><Truck size={14} /></div>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{app.vehicleType} • {app.plate}</span>
                     </div>
                     <CheckCircle size={14} className="text-slate-300" />
                  </div>

                  <Button 
                    onClick={() => setSelectedApp(app)}
                    className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg transition-all"
                  >
                    Open Review Audit <ExternalLink size={14} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
                <Shield size={40} />
             </div>
             <h4 className="text-xl font-black text-slate-900">Queue is empty</h4>
             <p className="text-slate-500 mt-2">No {activeTab.toLowerCase()} applications require your attention.</p>
          </div>
        )}
      </div>

      {/* Review Modal Overlay */}
      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-5xl h-[90vh] bg-white rounded-[3.5rem] shadow-2xl overflow-hidden relative shadow-blue-500/10">
              <DriverReviewDialog 
                application={selectedApp} 
                onClose={() => setSelectedApp(null)}
                onApprove={handleApprove}
                onReject={handleReject}
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default DriverApproval;
