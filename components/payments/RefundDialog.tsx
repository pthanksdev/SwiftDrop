
import React, { useState } from 'react';
import { AlertTriangle, ShieldX, ArrowRight, RefreshCw } from 'lucide-react';
import { Payment } from '../../types/payment.types';
import { Button } from '../ui/button';
import { formatCurrency } from '../../utils/formatters';

interface RefundDialogProps {
  payment: Payment;
  onConfirm: (reason: string) => Promise<void>;
  onClose: () => void;
}

const RefundDialog: React.FC<RefundDialogProps> = ({ payment, onConfirm, onClose }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!reason) return;
    setLoading(true);
    try {
      await onConfirm(reason);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
          <ShieldX size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Initiate Refund</h2>
          <p className="text-slate-500 text-sm font-medium">Reversing {formatCurrency(payment.amount)} for Shipment #{payment.orderId}</p>
        </div>
      </div>

      <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-start gap-4">
        <AlertTriangle className="text-amber-600 shrink-0" size={20} />
        <p className="text-xs text-amber-800 leading-relaxed font-medium">
          Refunds are permanent and will be credited back to the customer's original payment method within 5-10 business days.
        </p>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Refund Reason</label>
        <textarea 
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          placeholder="e.g. Shipment cancelled by dispatcher..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="flex-1 rounded-2xl py-6 font-bold text-slate-500"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm}
          isLoading={loading}
          disabled={!reason}
          className="flex-1 rounded-2xl py-6 bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xl shadow-rose-500/20"
        >
          Confirm Reversal <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default RefundDialog;
