
import React, { useState, useEffect } from 'react';
import { 
  Tag, Plus, Search, Filter, RefreshCw, 
  Trash2, Edit3, CheckCircle2, XCircle, 
  Calendar, DollarSign, Percent, Info,
  ChevronRight, ArrowRight, Download, X
} from 'lucide-react';
import { promosApi } from '../../api/endpoints/promos.api';
import { PromoCode, DiscountType } from '../../types/api.types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { toast } from 'sonner';

const PromoManagement: React.FC = () => {
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const res = await promosApi.getAll();
      setPromos(res.data || []);
    } catch (err) {
      // Mock for demo
      setPromos([
        { id: '1', code: 'WELCOME50', discountType: DiscountType.PERCENTAGE, discountValue: 50, minOrderAmount: 20, maxDiscount: 10, usageLimit: 500, usedCount: 142, validFrom: '2024-01-01', validUntil: '2024-12-31', isActive: true, createdAt: '', updatedAt: '' },
        { id: '2', code: 'SWIFT25', discountType: DiscountType.FIXED_AMOUNT, discountValue: 25, minOrderAmount: 100, maxDiscount: 25, usageLimit: 100, usedCount: 88, validFrom: '2024-03-01', validUntil: '2024-06-01', isActive: true, createdAt: '', updatedAt: '' },
        { id: '3', code: 'LAUNCHVIP', discountType: DiscountType.PERCENTAGE, discountValue: 100, minOrderAmount: 0, maxDiscount: 50, usageLimit: 10, usedCount: 10, validFrom: '2024-01-01', validUntil: '2024-02-01', isActive: false, createdAt: '', updatedAt: '' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await promosApi.toggleStatus(id, !currentStatus);
      toast.success(`Promo code ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchPromos();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const filteredPromos = promos.filter(p => p.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Yield & Incentive Control</h1>
          <p className="text-slate-500 font-medium">Manage platform-wide promo codes and user vouchers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-12 border-slate-200">
             <Download size={16} className="mr-2" /> Export Performance
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="rounded-xl h-12 px-6 bg-blue-600 shadow-lg font-bold">
            <Plus size={18} className="mr-2" /> New Voucher Relay
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
           <Input 
             placeholder="Search active codes or identifiers..." 
             className="pl-12 py-7 rounded-2xl bg-slate-50 border-none text-lg"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPromos.map((p) => (
          <Card key={p.id} className={cn(
            "rounded-[2.5rem] border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden bg-white",
            !p.isActive && "opacity-60"
          )}>
            <CardContent className="p-0">
               <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                     <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black">
                        <Tag size={24} />
                     </div>
                     <Badge className={cn(
                       "font-black text-[9px] py-1 px-2.5 rounded-full uppercase",
                       p.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                     )}>
                       {p.isActive ? 'Active' : 'Expired'}
                     </Badge>
                  </div>

                  <div>
                     <h3 className="text-2xl font-black text-slate-900 leading-none">{p.code}</h3>
                     <p className="text-xs text-slate-500 mt-2 font-medium">
                        {p.discountType === DiscountType.PERCENTAGE ? `${p.discountValue}% OFF` : `${formatCurrency(p.discountValue)} OFF`}
                        {p.maxDiscount > 0 && ` • Max ${formatCurrency(p.maxDiscount)}`}
                     </p>
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        <span>Usage Distribution</span>
                        <span>{p.usedCount} / {p.usageLimit}</span>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${(p.usedCount / p.usageLimit) * 100}%` }}></div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Valid From</p>
                        <p className="text-xs font-bold text-slate-700">{p.validFrom}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Expires</p>
                        <p className="text-xs font-bold text-slate-700">{p.validUntil}</p>
                     </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                     <Button 
                       variant="outline" 
                       onClick={() => handleToggleStatus(p.id, p.isActive)}
                       className="flex-1 rounded-xl h-12 border-slate-100 font-bold text-xs"
                     >
                        {p.isActive ? <XCircle size={14} className="mr-2" /> : <CheckCircle2 size={14} className="mr-2" />}
                        {p.isActive ? 'Deactivate' : 'Activate'}
                     </Button>
                     <Button className="rounded-xl h-12 w-12 bg-slate-900 flex items-center justify-center p-0">
                        <Edit3 size={16} />
                     </Button>
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromoManagement;
