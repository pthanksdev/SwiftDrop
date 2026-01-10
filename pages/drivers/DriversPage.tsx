
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Plus, Search, Filter, RefreshCw, Star, MapPin, Zap } from 'lucide-react';
import { useDrivers } from '../../hooks/useDrivers';
import { AvailabilityStatus } from '../../types/driver.types';
import DriverCard from '../../components/drivers/DriverCard';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';
import { FilterPanel, FilterGroup, MultiSelectPills, RangeSlider } from '../../components/common/FilterPanel';
import { DriverCardSkeleton } from '../../components/common/Skeleton';

const DriversPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as AvailabilityStatus[],
    vehicleType: [] as string[],
    minRating: 0,
    search: '',
  });
  
  const { drivers, loading, fetchDrivers } = useDrivers({
    status: filters.status.length === 1 ? filters.status[0] : 'ALL' as any,
    search: filters.search
  });

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const activeFiltersCount = filters.status.length + filters.vehicleType.length + (filters.minRating > 0 ? 1 : 0);

  const clearFilters = () => setFilters({ status: [], vehicleType: [], minRating: 0, search: '' });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fleet Control</h1>
          <p className="text-slate-500 font-medium">Coordinate and manage active delivery personnel network.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => fetchDrivers()} className="rounded-xl h-12 border-slate-200 shadow-sm">
            <RefreshCw size={16} className={cn("mr-2", loading && "animate-spin")} /> Sync Fleet
          </Button>
          <Button onClick={() => navigate('/drivers/create')} className="rounded-xl h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold">
            <Plus size={18} className="mr-2" /> Onboard Courier
          </Button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={18} />
              <Input 
                placeholder="Locate Courier Name or Plate ID..." 
                className="pl-12 py-7 rounded-[1.5rem] bg-slate-50 border-none text-lg"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
           </div>
           <Button 
             variant="outline" 
             onClick={() => setIsFilterOpen(true)}
             className={cn(
               "rounded-2xl h-14 px-8 border-slate-100 font-black uppercase tracking-widest text-[10px] relative",
               activeFiltersCount > 0 ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-slate-50 text-slate-400"
             )}
           >
             <Filter size={16} className="mr-2" /> 
             Fleet Analysis
             {activeFiltersCount > 0 && (
               <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] border-4 border-white shadow-lg font-black">
                 {activeFiltersCount}
               </span>
             )}
           </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[1,2,3,4,5,6].map(i => <DriverCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drivers.map(driver => <DriverCard key={driver.id} driver={driver} />)}
        </div>
      )}

      <FilterPanel 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        title="Fleet Parameters"
        onClear={clearFilters}
      >
        <FilterGroup label="Operational Pulse" icon={Zap}>
           <MultiSelectPills 
             options={Object.values(AvailabilityStatus)} 
             selected={filters.status} 
             onChange={(vals) => setFilters({...filters, status: vals as AvailabilityStatus[]})} 
           />
        </FilterGroup>

        <FilterGroup label="Unit Type" icon={Truck}>
           <MultiSelectPills 
             options={['BIKE', 'MOTORCYCLE', 'SEDAN', 'VAN', 'TRUCK']} 
             selected={filters.vehicleType} 
             onChange={(vals) => setFilters({...filters, vehicleType: vals})} 
           />
        </FilterGroup>

        <FilterGroup label="Performance Floor" icon={Star}>
           <RangeSlider 
             min={0} 
             max={5} 
             unit="★" 
             value={filters.minRating} 
             onChange={(v) => setFilters({...filters, minRating: v})} 
           />
        </FilterGroup>

        <FilterGroup label="Deployment Radius" icon={MapPin}>
           <RangeSlider 
             min={0} 
             max={50} 
             unit="km" 
             value={25} 
             onChange={() => {}} 
           />
        </FilterGroup>
      </FilterPanel>
    </div>
  );
};

export default DriversPage;
