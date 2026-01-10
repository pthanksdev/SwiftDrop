
import React, { useState } from 'react';
import { 
  X, Check, AlertTriangle, FileText, Truck, 
  ShieldCheck, ArrowRight, Ban, Info, Eye, Download,
  User, CreditCard, Shield, MapPin
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

interface DriverReviewDialogProps {
  application: any;
  onClose: () => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason: string) => Promise<void>;
}

const DriverReviewDialog: React.FC<DriverReviewDialogProps> = ({ 
  application, onClose, onApprove, onReject 
}) => {
  const [checklist, setChecklist] = useState({
    license: false,
    registration: false,
    insurance: false,
    background: false
  });
  const [notes, setNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allVerified = Object.values(checklist).every(v => v);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await onApprove(application.id);
      toast.success('Driver account provisioned and activated.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason) return;
    setLoading(true);
    try {
      await onReject(application.id, rejectReason);
      toast.info('Application declined.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in zoom-in-95 duration-300">
      {/* Header Overlay */}
      <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-2xl font-black shadow-xl">
            {application.firstName.charAt(0)}{application.lastName.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-black leading-none">{application.firstName} {application.lastName}</h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">Applied on {new Date(application.date).toLocaleDateString()}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Data & Docs */}
          <div className="space-y-10">
            <section className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={12} className="text-blue-500" /> Identity Details
              </h4>
              <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-[2rem]">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                    <p className="text-sm font-bold text-slate-900">{application.email}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</p>
                    <p className="text-sm font-bold text-slate-900">{application.phone}</p>
                 </div>
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Truck size={12} className="text-emerald-500" /> Vehicle Information
              </h4>
              <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-[2rem]">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Vehicle Type</p>
                    <p className="text-sm font-bold text-slate-900">{application.vehicleType}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">License Plate</p>
                    <p className="text-sm font-bold text-slate-900">{application.plate}</p>
                 </div>
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Documentation</h4>
              <div className="grid grid-cols-1 gap-3">
                 {[
                   { label: 'Driver\'s License (Front/Back)', icon: CreditCard },
                   { label: 'Vehicle Registration (V5C/Title)', icon: FileText },
                   { label: 'Commercial Insurance Certificate', icon: Shield }
                 ].map((doc, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl group hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><doc.icon size={18} /></div>
                         <p className="text-sm font-bold text-slate-700">{doc.label}</p>
                      </div>
                      <div className="flex gap-2">
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Eye size={14} /></Button>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Download size={14} /></Button>
                      </div>
                   </div>
                 ))}
              </div>
            </section>
          </div>

          {/* Right Column: Audit Checklist */}
          <div className="space-y-8">
             <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 space-y-6">
                <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight flex items-center gap-2">
                  <ShieldCheck size={18} /> Verification Protocol
                </h4>
                <div className="space-y-3">
                   {[
                     { id: 'license', label: 'License validity & expiry verified' },
                     { id: 'registration', label: 'Vehicle registration matches plate' },
                     { id: 'insurance', label: 'Commercial liability confirmed' },
                     { id: 'background', label: 'Criminal background check passed' }
                   ].map((item) => (
                     <button 
                       key={item.id}
                       onClick={() => toggleCheck(item.id as any)}
                       className={cn(
                         "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                         checklist[item.id as keyof typeof checklist] 
                           ? "bg-white border-blue-500 text-blue-600 shadow-sm" 
                           : "bg-blue-100/50 border-transparent text-blue-400 hover:bg-white"
                       )}
                     >
                       <span className="text-xs font-bold">{item.label}</span>
                       <div className={cn(
                         "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                         checklist[item.id as keyof typeof checklist] ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-400"
                       )}>
                         <Check size={14} />
                       </div>
                     </button>
                   ))}
                </div>
             </div>

             <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Internal Audit Notes</label>
               <textarea 
                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                placeholder="Document any irregularities or follow-up requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
               ></textarea>
             </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-8 bg-slate-50 border-t border-slate-100">
        {showRejectForm ? (
          <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-2">
            <p className="text-xs font-black text-rose-600 uppercase tracking-widest ml-1">Specify Rejection Reason</p>
            <div className="flex gap-3">
              <input 
                className="flex-1 px-6 py-4 bg-white border border-rose-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-500/10"
                placeholder="e.g. Expired insurance documents..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <Button onClick={handleReject} isLoading={loading} className="bg-rose-600 px-8 py-4 rounded-2xl font-bold">Declined Application</Button>
              <Button variant="ghost" onClick={() => setShowRejectForm(false)} className="rounded-2xl">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowRejectForm(true)}
                className="rounded-2xl h-14 px-8 border-slate-200 text-rose-600 font-bold"
              >
                <Ban size={18} className="mr-2" /> Decline Applicant
              </Button>
              <Button variant="ghost" className="rounded-2xl h-14 px-8 text-slate-500 font-bold">
                <Info size={18} className="mr-2" /> Request Data
              </Button>
            </div>
            <Button 
              onClick={handleApprove}
              isLoading={loading}
              disabled={!allVerified}
              className={cn(
                "rounded-2xl h-14 px-12 font-black uppercase tracking-widest text-xs shadow-xl transition-all",
                allVerified ? "bg-blue-600 text-white shadow-blue-500/20" : "bg-slate-200 text-slate-400 pointer-events-none"
              )}
            >
              Approve & Onboard <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverReviewDialog;
