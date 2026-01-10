import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, LayoutGrid, List as ListIcon, 
  RefreshCw, Package, X, Calendar, DollarSign, Box, Zap
} from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { OrderStatus, PackageType } from '../../types/order.types';
import OrderCard from '../../components/orders/OrderCard';
import { Button } from '../../components/ui/button';
// Fixed: Switched from ui/input to common/Input to correctly support the 'label' prop
import Input from '../../components/common/Input';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { FilterPanel, FilterGroup, MultiSelectPills, RangeSlider } from '../../components/common/FilterPanel';
import { formatCurrency } from '../../utils/formatters';
import { OrderCardSkeleton } from '../../components/common/Skeleton';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isListView, setIsListView] = useState(false);
  
  const [filters, setFilters] = useState({
    status: [] as OrderStatus[],
    packageType: [] as PackageType[],
    maxPrice: 500,
    search: '',
  });

  const { orders, loading, fetchOrders, cancelOrder } = useOrders({
    status: filters.status.length === 1 ? filters.status[0] : 'ALL' as any,
    search: filters.search
  });

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const activeFiltersCount = filters.status.length + filters.packageType.length + (filters.maxPrice < 500 ? 1 : 0);

  const clearFilters = () => {
    setFilters({ status: [], packageType: [], maxPrice: 500, search: '' });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Logistics Pipeline</h1>
          <p className="text-slate-500 font-medium">Global shipment surveillance and intervention console.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => fetchOrders()} className="rounded-xl border-slate-200">
            <RefreshCw size={16} className={cn("mr-2", loading && "animate-spin")} /> Refresh Relay
          </Button>
          <Button onClick={() => navigate('/orders/create')} className="rounded-xl px-6 bg-blue-600 hover:bg-blue-700 shadow-lg">
            <Plus size={18} className="mr-2" /> Dispatch Request
          </Button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={18} />
              <Input 
                placeholder="Find Shipment ID, Recipient or Courier..." 
                className="pl-12 py-7 rounded-[1.5rem] bg-slate-50 border-none text-lg"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
           </div>
           <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(true)}
                className={cn(
                  "rounded-2xl h-14 px-8 border-slate-100 font-black uppercase tracking-widest text-[10px] relative",
                  activeFiltersCount > 0 ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-slate-50 text-slate-400"
                )}
              >
                <Filter size={16} className="mr-2" /> 
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] border-4 border-white shadow-lg">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                 <button onClick={() => setIsListView(false)} className={cn("p-2 rounded-lg transition-all", !isListView ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}><LayoutGrid size={18} /></button>
                 <button onClick={() => setIsListView(true)} className={cn("p-2 rounded-lg transition-all", isListView ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}><ListIcon size={18} /></button>
              </div>
           </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 animate-in slide-in-from-top-2">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Active Slices:</span>
             {filters.status.map(s => (
               <Badge key={s} className="bg-blue-50 text-blue-600 border-blue-100 px-3 py-1.5 flex items-center gap-2">
                 {s} <X size={10} className="cursor-pointer" onClick={() => setFilters({...filters, status: filters.status.filter(x => x !== s)})} />
               </Badge>
             ))}
             {filters.packageType.map(t => (
               <Badge key={t} className="bg-indigo-50 text-indigo-600 border-indigo-100 px-3 py-1.5 flex items-center gap-2">
                 {t} <X size={10} className="cursor-pointer" onClick={() => setFilters({...filters, packageType: filters.packageType.filter(x => x !== t)})} />
               </Badge>
             ))}
             {filters.maxPrice < 500 && (
               <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 px-3 py-1.5 flex items-center gap-2">
                 Max {formatCurrency(filters.maxPrice)} <X size={10} className="cursor-pointer" onClick={() => setFilters({...filters, maxPrice: 500})} />
               </Badge>
             )}
             <button onClick={clearFilters} className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-auto hover:underline">Clear Roster</button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[1,2,3,4,5,6].map(i => <OrderCardSkeleton key={i} />)}
        </div>
      ) : orders.length > 0 ? (
        <div className={cn("grid gap-8", isListView ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
          {orders.map(order => <OrderCard key={order.id} order={order} onCancel={cancelOrder} />)}
        </div>
      ) : (
        <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
           <Package size={48} className="mx-auto text-slate-200 mb-4" />
           <h3 className="text-xl font-black text-slate-900">No shipments found</h3>
           <p className="text-slate-500 mt-2">Adjust your filters to see more results.</p>
        </div>
      )}

      <FilterPanel 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        title="Shipment Filters"
        onClear={clearFilters}
      >
        <FilterGroup label="Operational Status" icon={Zap}>
           <MultiSelectPills 
             options={Object.values(OrderStatus)} 
             selected={filters.status} 
             onChange={(vals) => setFilters({...filters, status: vals as OrderStatus[]})} 
           />
        </FilterGroup>

        <FilterGroup label="Package Category" icon={Box}>
           <MultiSelectPills 
             options={Object.values(PackageType)} 
             selected={filters.packageType} 
             onChange={(vals) => setFilters({...filters, packageType: vals as PackageType[]})} 
           />
        </FilterGroup>

        <FilterGroup label="Financial Ceiling" icon={DollarSign}>
           <RangeSlider 
             min={0} 
             max={1000} 
             unit="$" 
             value={filters.maxPrice} 
             onChange={(v) => setFilters({...filters, maxPrice: v})} 
           />
        </FilterGroup>

        <FilterGroup label="Date Range" icon={Calendar}>
           <div className="grid grid-cols-2 gap-4">
              <Input type="date" label="Start" className="rounded-xl border-slate-100" />
              <Input type="date" label="End" className="rounded-xl border-slate-100" />
           </div>
        </FilterGroup>
      </FilterPanel>
    </div>
  );
};

export default OrdersPage;