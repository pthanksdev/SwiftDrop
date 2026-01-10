import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, RefreshCw, Filter, Trash2, Calendar, TrendingUp, ShieldCheck, X } from 'lucide-react';
import { useCustomers } from '../../hooks/useCustomers';
import CustomerCard from '../../components/customers/CustomerCard';
import CustomerForm from '../../components/customers/CustomerForm';
import { Button } from '../../components/ui/button';
// Fixed: Switched from ui/input to common/Input to correctly support the 'label' prop
import Input from '../../components/common/Input';
import { cn } from '../../lib/utils';
import { FilterPanel, FilterGroup, RangeSlider, MultiSelectPills } from '../../components/common/FilterPanel';
import { CustomerCardSkeleton } from '../../components/common/Skeleton';

const CustomersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minOrders, setMinOrders] = useState(0);
  
  const { customers, loading, fetchCustomers, addCustomer } = useCustomers(searchQuery);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleCreateCustomer = async (data: any) => {
    await addCustomer(data);
    setIsFormOpen(false);
  };

  const activeFiltersCount = (minOrders > 0 ? 1 : 0);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customer Directory</h1>
          <p className="text-slate-500 font-medium">Platform relationship and CRM control center.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => fetchCustomers()} className="rounded-xl h-12 border-slate-200 shadow-sm">
            <RefreshCw size={16} className={cn("mr-2", loading && "animate-spin")} /> Sync Matrix
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="rounded-xl h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold">
            <Plus size={18} className="mr-2" /> Enroll Client
          </Button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={18} />
              <Input 
                placeholder="Find Name, Account Email or Primary Phone..." 
                className="pl-12 py-7 rounded-[1.5rem] bg-slate-50 border-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <Button 
             variant="outline" 
             onClick={() => setIsFilterOpen(true)}
             className={cn(
               "rounded-2xl h-14 px-8 border-slate-100 font-black uppercase tracking-widest text-[10px] relative",
               activeFiltersCount > 0 ? "bg-purple-50 border-purple-200 text-purple-600" : "bg-slate-50 text-slate-400"
             )}
           >
             <Filter size={16} className="mr-2" /> 
             Account Analysis
             {activeFiltersCount > 0 && (
               <span className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-[10px] border-4 border-white shadow-lg font-black">
                 {activeFiltersCount}
               </span>
             )}
           </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[1,2,3,4,5,6].map(i => <CustomerCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customers.map(customer => <CustomerCard key={customer.id} customer={customer} />)}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden relative">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-xl font-black">Enroll New Client</h3>
              <button onClick={() => setIsFormOpen(false)}><X size={20} /></button>
            </div>
            <div className="p-8">
              <CustomerForm onSubmit={handleCreateCustomer} loading={loading} />
            </div>
          </div>
        </div>
      )}

      <FilterPanel 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        title="Directory Filters"
        onClear={() => { setMinOrders(0); setSearchQuery(''); }}
      >
        <FilterGroup label="Account Volume (LTV)" icon={TrendingUp}>
           <RangeSlider 
             min={0} 
             max={100} 
             unit=" orders" 
             value={minOrders} 
             onChange={(v) => setMinOrders(v)} 
           />
        </FilterGroup>

        <FilterGroup label="Registration Cycle" icon={Calendar}>
           <div className="grid grid-cols-2 gap-4">
              <Input type="date" label="Start" className="rounded-xl border-slate-100" />
              <Input type="date" label="End" className="rounded-xl border-slate-100" />
           </div>
        </FilterGroup>

        <FilterGroup label="Verification Status" icon={ShieldCheck}>
           <MultiSelectPills 
             options={['VERIFIED', 'PENDING', 'FLAGGED']} 
             selected={[]} 
             onChange={() => {}} 
           />
        </FilterGroup>
      </FilterPanel>
    </div>
  );
};

export default CustomersPage;