
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, RefreshCcw, Search, Filter, 
  RotateCcw, CheckCircle, XCircle, Clock, 
  FileText, User, DollarSign, ArrowRight,
  MessageSquare, ChevronRight, Eye, ShieldCheck,
  AlertTriangle, History, Ban
} from 'lucide-react';
import { adminApi } from '../../api/endpoints/admin.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';

const Refunds: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [notes, setNotes] = useState('');

  const fetchRefunds = async () => {
    setLoading(true);
    try {
      // Mock data for high-fidelity review interface
      setRequests([
        { 
          id: 'REF-9021', orderId: 'ORD-7721', customer: 'Sarah Jenkins', 
          amount: 45.00, reason: 'Courier delivered to wrong unit. Package reported stolen.',
          status: 'PENDING', date: new Date().toISOString(), 
          attachments: 2, priority: 'HIGH'
        },
        { 
          id: 'REF-9022', orderId: 'ORD-7734', customer: 'Mark Vargo', 
          amount: 12.50, reason: 'Late delivery (> 2 hours beyond window).',
          status: 'REVIEWING', date: new Date(Date.now() - 3600000).toISOString(), 
          attachments: 0, priority: 'NORMAL'
        },
        { 
          id: 'REF-9023', orderId: 'ORD-8811', customer: 'Elena Rossi', 
          amount: 112.20, reason: 'Damaged items. Electronics screen shattered during transit.',
          status: 'PENDING', date: new Date(Date.now() - 7200000).toISOString(), 
          attachments: 4, priority: 'CRITICAL'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  const handleProcess = async (action: 'APPROVE' | 'REJECT') => {
    if (!selectedRequest) return;
    try {
      // await adminApi.processRefund(selectedRequest.id, action, notes);
      toast.success(`Claim ${action === 'APPROVE' ? 'settled' : 'declined'}. Notification sent to customer.`);
      setSelectedRequest(null);
      setNotes('');
      fetchRefunds();
    } catch (err) {
      toast.error('Processing failed');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Claims Adjudication</h1>
          <p className="text-slate-500 font-medium">Review and process logistics liability and refund requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-rose-50 text-rose-600 border-rose-100 font-black text-[10px] uppercase tracking-widest px-4 py-2">
            {requests.filter(r => r.status === 'PENDING').length} Urgent Claims
          </Badge>
          <Button onClick={fetchRefunds} variant="ghost" className="rounded-xl h-12 w-12 border border-slate-100 bg-white">
            <RefreshCcw size={18} className={cn(loading && "animate-spin")} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-350px)]">
        {/* Claims List */}
        <Card className="lg:col-span-5 rounded-[3rem] border-slate-200 shadow-sm overflow-hidden flex flex-col bg-white">
          <CardHeader className="p-8 border-b border-slate-50">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <Input placeholder="Find Claim ID or Order..." className="pl-12 py-6 rounded-2xl bg-slate-50 border-none" />
             </div>
          </CardHeader>
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50">
            {requests.map((r) => (
              <div 
                key={r.id} 
                onClick={() => setSelectedRequest(r)}
                className={cn(
                  "p-8 cursor-pointer transition-all hover:bg-slate-50 relative group",
                  selectedRequest?.id === r.id ? "bg-blue-50/50" : ""
                )}
              >
                {selectedRequest?.id === r.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-r-full"></div>}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black text-slate-900 flex items-center gap-2">
                      {r.id} 
                      {r.priority === 'CRITICAL' && <Badge className="bg-rose-100 text-rose-700 text-[8px] px-1.5 border-none">CRITICAL</Badge>}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">For Order #{r.orderId}</p>
                  </div>
                  <p className="text-sm font-black text-rose-600">{formatCurrency(r.amount)}</p>
                </div>
                <div className="flex items-center justify-between">
                   <p className="text-xs text-slate-500 font-medium truncate pr-4">{r.reason}</p>
                   <Badge variant="outline" className="text-[9px] font-black uppercase whitespace-nowrap">{r.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Review Workspace */}
        <Card className="lg:col-span-7 rounded-[3rem] border-slate-200 shadow-sm overflow-hidden flex flex-col bg-white">
          {selectedRequest ? (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
               <div className="p-8 border-b border-slate-50 bg-slate-900 text-white flex justify-between items-center">
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-xl font-black shadow-xl">
                        {selectedRequest.customer.charAt(0)}
                     </div>
                     <div>
                        <h3 className="text-xl font-black">{selectedRequest.customer}</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none mt-1">Claim Origin: Customer Portal</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Submission Date</p>
                     <p className="text-sm font-bold">{formatDate(selectedRequest.date)}</p>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
                  <section className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare size={12} className="text-blue-500" /> Formal Statement
                     </h4>
                     <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-sm text-slate-700 leading-relaxed">
                        "{selectedRequest.reason}"
                     </div>
                  </section>

                  <div className="grid grid-cols-2 gap-8">
                     <section className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <FileText size={12} className="text-emerald-500" /> Evidence Logs
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                           {Array.from({length: selectedRequest.attachments}).map((_, i) => (
                             <div key={i} className="aspect-square bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                                <Eye size={20} />
                             </div>
                           ))}
                           {selectedRequest.attachments === 0 && <p className="text-xs text-slate-400 font-bold italic">No files attached.</p>}
                        </div>
                     </section>

                     <section className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Clock size={12} className="text-amber-500" /> Logistics Context
                        </h4>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-slate-500">Order Delivery Status</span>
                              <Badge className="bg-emerald-100 text-emerald-700">DELIVERED</Badge>
                           </div>
                           <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-slate-500">Carrier ID</span>
                              <span className="text-slate-900">Unit-092 (Kevin P.)</span>
                           </div>
                           <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-slate-500">POD Status</span>
                              <span className="text-emerald-600">Verified Photo</span>
                           </div>
                        </div>
                     </section>
                  </div>

                  <section className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Resolution Notes</h4>
                     <textarea 
                        className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                        placeholder="Document the basis for your adjudication decision..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                     ></textarea>
                  </section>
               </div>

               <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-6">
                  <div className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm">
                     <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center"><DollarSign size={20} /></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Liability Amount</p>
                        <p className="text-sm font-black text-slate-900">{formatCurrency(selectedRequest.amount)}</p>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <Button 
                        variant="outline" 
                        onClick={() => handleProcess('REJECT')}
                        className="rounded-2xl h-14 px-8 border-slate-200 text-rose-600 font-bold"
                     >
                        <Ban size={18} className="mr-2" /> Decline Claim
                     </Button>
                     <Button 
                        onClick={() => handleProcess('APPROVE')}
                        className="rounded-2xl h-14 px-10 bg-blue-600 shadow-xl shadow-blue-500/20 font-black uppercase tracking-widest text-xs"
                     >
                        Approve Reversal <ArrowRight size={18} className="ml-2" />
                     </Button>
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-20 text-center space-y-6">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                  <ShieldAlert size={48} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-900">Vault Operations Locked</h3>
                  <p className="text-slate-500 mt-2 max-w-xs mx-auto">Select a claim from the roster to begin security review and financial adjudication.</p>
               </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Refunds;
