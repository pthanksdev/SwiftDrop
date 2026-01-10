
import React from 'react';
import { Truck, CheckCircle2, Download, Printer, ShieldCheck } from 'lucide-react';
import { Payment } from '../../types/payment.types';
import { Button } from '../ui/button';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface ReceiptViewProps {
  payment: Payment;
  onClose: () => void;
}

const ReceiptView: React.FC<ReceiptViewProps> = ({ payment, onClose }) => {
  return (
    <div className="p-8 space-y-8 animate-in zoom-in-95 duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center shadow-sm">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Payment Successful</h2>
          <p className="text-slate-500 text-sm font-medium">Transaction ID: {payment.transactionId}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 border-dashed space-y-6">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>Itemized Summary</span>
          <span>Shipment #ORD-9902</span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <span className="text-sm font-bold text-slate-600">Base Logistics Fare</span>
             <span className="text-sm font-black text-slate-900">{formatCurrency(payment.amount * 0.4)}</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-sm font-bold text-slate-600">Distance & Weight Surcharge</span>
             <span className="text-sm font-black text-slate-900">{formatCurrency(payment.amount * 0.6)}</span>
          </div>
          <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
             <span className="text-lg font-black text-slate-900">Total Amount Paid</span>
             <span className="text-2xl font-black text-blue-600">{formatCurrency(payment.amount)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-100">
           <ShieldCheck size={16} className="text-emerald-500" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Paid via {payment.paymentMethod}</span>
           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-auto">{formatDate(payment.createdAt)}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button className="flex-1 rounded-2xl py-6 bg-slate-900 text-white font-bold">
           <Printer size={18} className="mr-2" /> Print
        </Button>
        <Button variant="outline" className="flex-1 rounded-2xl py-6 border-slate-200 text-slate-600 font-bold">
           <Download size={18} className="mr-2" /> Save PDF
        </Button>
      </div>

      <div className="text-center">
         <Button variant="ghost" onClick={onClose} className="text-xs font-black text-slate-400 uppercase tracking-widest">Return to Ledger</Button>
      </div>
    </div>
  );
};

export default ReceiptView;
