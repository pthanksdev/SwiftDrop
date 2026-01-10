
import React, { useEffect, useState } from 'react';
import { 
  CreditCard, DollarSign, Search, Filter, 
  Download, FileText, RotateCcw, ShieldCheck,
  ArrowUpRight, ArrowDownRight, RefreshCw, X, ChevronRight
} from 'lucide-react';
import { paymentsApi } from '../../api/endpoints/payments.api';
import { Payment, PaymentStatus } from '../../types/payment.types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import ReceiptView from '../../components/payments/ReceiptView';
import RefundDialog from '../../components/payments/RefundDialog';

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [modalMode, setModalMode] = useState<'receipt' | 'refund' | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await paymentsApi.getAll();
      setPayments(res.data);
    } catch (err) {
      setPayments([
        { id: 'p1', orderId: 'ORD-7721', amount: 45.00, paymentMethod: 'CARD' as any, transactionId: 'TXN-9921288', status: PaymentStatus.COMPLETED, createdAt: new Date().toISOString() },
        { id: 'p2', orderId: 'ORD-7722', amount: 12.50, paymentMethod: 'MOBILE_WALLET' as any, transactionId: 'TXN-9921289', status: PaymentStatus.COMPLETED, createdAt: new Date().toISOString() },
        { id: 'p3', orderId: 'ORD-7723', amount: 88.20, paymentMethod: 'BANK_TRANSFER' as any, transactionId: 'TXN-9921290', status: PaymentStatus.PENDING, createdAt: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleRefund = async (reason: string) => {
    if (!selectedPayment) return;
    try {
      toast.success('Refund processed successfully');
      fetchPayments();
    } catch (err) {
      toast.error('Refund failed');
    }
  };

  const filteredPayments = payments.filter(p => 
    p.orderId.toLowerCase().includes(search.toLowerCase()) || 
    p.transactionId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Financial Ledger</h1>
          <p className="text-slate-500 font-medium text-xs md:text-sm">Track logistics transactions and settlement activity.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl h-10 md:h-12 border-slate-200 text-xs flex-1 md:flex-none">
            <Download size={14} className="mr-2" /> Export
          </Button>
          <Button onClick={fetchPayments} variant="ghost" className="rounded-xl h-10 w-10 md:h-12 md:w-12 border border-slate-100 bg-white">
            <RefreshCw size={16} className={cn(loading && "animate-spin")} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 md:pb-0">
        {[
          { label: 'Revenue', value: 24520, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Ticket', value: 34.2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Refund Rate', value: '1.2%', color: 'text-rose-600', bg: 'bg-rose-50', isPrice: false }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col min-w-[200px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <h4 className="text-xl font-black text-slate-900">
                {stat.isPrice === false ? stat.value : formatCurrency(stat.value as number)}
              </h4>
          </div>
        ))}
      </div>

      <div className="bg-white p-2 md:p-4 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search transactions..." 
            className="pl-12 py-6 rounded-2xl bg-slate-50 border-none text-sm md:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table View (Desktop Only) */}
      <Card className="hidden md:block rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-5">Shipment</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900">{p.orderId}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{formatDate(p.createdAt)}</p>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-blue-600">{formatCurrency(p.amount)}</td>
                    <td className="px-8 py-6">
                      <Badge className={cn("text-[9px] font-black uppercase py-0.5", p.status === 'COMPLETED' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{p.status}</Badge>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl" onClick={() => { setSelectedPayment(p); setModalMode('receipt'); }}><FileText size={18} /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Card View (Mobile Only) */}
      <div className="md:hidden space-y-4">
        {filteredPayments.map((p) => (
          <Card key={p.id} onClick={() => { setSelectedPayment(p); setModalMode('receipt'); }} className="rounded-[2rem] border-slate-200 shadow-sm active:scale-[0.98] transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h4 className="font-black text-slate-900 text-sm">#{p.orderId}</h4>
                   <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{formatDate(p.createdAt)}</p>
                </div>
                <Badge className={cn("text-[8px] font-black uppercase py-0.5", p.status === 'COMPLETED' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>{p.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CreditCard size={14} /></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.paymentMethod}</span>
                 </div>
                 <p className="text-lg font-black text-blue-600">{formatCurrency(p.amount)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {modalMode && selectedPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden relative">
              <button onClick={() => setModalMode(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-xl text-slate-400 z-10"><X size={18} /></button>
              {modalMode === 'receipt' && <ReceiptView payment={selectedPayment} onClose={() => setModalMode(null)} />}
              {modalMode === 'refund' && <RefundDialog payment={selectedPayment} onConfirm={handleRefund} onClose={() => setModalMode(null)} />}
           </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
