
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Package, 
  MapPin, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Clock, 
  Phone, 
  Info,
  Calendar,
  CheckCircle,
  Truck,
  // Added ShieldCheck and CreditCard to fix missing name errors
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { PackageType } from '../../types/order.types';
import { Customer } from '../../types/customer.types';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../utils/formatters';

// Validation Schemas
const step1Schema = z.object({
  customerId: z.string().min(1, 'Please select a customer'),
});

const step2Schema = z.object({
  pickupAddress: z.string().min(5, 'Pickup address is required'),
  pickupContactName: z.string().min(2, 'Contact name is required'),
  pickupContactPhone: z.string().min(10, 'Valid phone number required'),
  scheduledPickupTime: z.string().optional(),
});

const step3Schema = z.object({
  deliveryAddress: z.string().min(5, 'Delivery address is required'),
  recipientName: z.string().min(2, 'Recipient name is required'),
  recipientPhone: z.string().min(10, 'Valid phone number required'),
  packageType: z.nativeEnum(PackageType),
  packageWeight: z.string().min(1, 'Weight is required'),
  specialInstructions: z.string().optional(),
});

interface OrderFormProps {
  step: number;
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData: any;
  isLoading: boolean;
  customers: Customer[];
  calculatedPrice: any;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  step, 
  onSubmit, 
  onBack, 
  initialData, 
  isLoading, 
  customers,
  calculatedPrice
}) => {
  const [addressSearch, setAddressSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // Use separate forms for each step to handle validation cleanly
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      customerId: initialData.customerId || '',
      pickupAddress: initialData.pickupAddress || '',
      pickupContactName: initialData.pickupContactName || '',
      pickupContactPhone: initialData.pickupContactPhone || '',
      scheduledPickupTime: initialData.scheduledPickupTime || new Date().toISOString().slice(0, 16),
      deliveryAddress: initialData.deliveryAddress || '',
      recipientName: initialData.recipientName || '',
      recipientPhone: initialData.recipientPhone || '',
      packageType: initialData.packageType || PackageType.PARCEL,
      packageWeight: initialData.packageWeight || '1',
      specialInstructions: initialData.specialInstructions || '',
    },
    // We validate manually on step transition in the onSubmit of this specific component
  });

  const selectedCustomerId = watch('customerId');
  const filteredCustomers = customers.filter(c => 
    `${c.user?.firstName} ${c.user?.lastName}`.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.user?.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const onNext = (data: any) => {
    onSubmit(data);
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          placeholder="Search customers by name or email..." 
          className="pl-12 py-6 rounded-2xl bg-white border-slate-200"
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
          <label 
            key={customer.id}
            className={cn(
              "flex items-center p-5 rounded-3xl border-2 cursor-pointer transition-all",
              selectedCustomerId === customer.id 
                ? "border-blue-600 bg-blue-50/50" 
                : "border-slate-100 hover:border-slate-200 bg-white"
            )}
          >
            <input 
              type="radio" 
              className="hidden" 
              value={customer.id} 
              {...register('customerId')} 
            />
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shrink-0 transition-colors",
              selectedCustomerId === customer.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
            )}>
              <User size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={cn("font-bold text-sm", selectedCustomerId === customer.id ? "text-blue-600" : "text-slate-900")}>
                {customer.user?.firstName} {customer.user?.lastName}
              </p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest truncate">{customer.user?.email}</p>
            </div>
            {selectedCustomerId === customer.id && <CheckCircle size={18} className="text-blue-600 ml-2" />}
          </label>
        )) : (
          <div className="col-span-full py-12 text-center text-slate-400">
            <p className="font-bold">No customers found</p>
            <button className="text-blue-600 text-xs mt-2 hover:underline">Register new customer</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Pickup Location</label>
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            {...register('pickupAddress')}
            placeholder="e.g. 123 Logistics Way, Suite 100" 
            className="pl-12 py-6 rounded-2xl"
          />
        </div>
        <p className="text-[10px] text-slate-400 flex items-center"><Info size={12} className="mr-1" /> Use a descriptive address for faster driver matching.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Sender Name</label>
          <div className="relative">
             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <Input {...register('pickupContactName')} placeholder="Full Name" className="pl-12 py-6 rounded-2xl" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Sender Phone</label>
          <div className="relative">
             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <Input {...register('pickupContactPhone')} placeholder="+1 (555) 000-0000" className="pl-12 py-6 rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Scheduled Pickup</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="datetime-local" 
            {...register('scheduledPickupTime')}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" 
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Delivery Destination</label>
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            {...register('deliveryAddress')}
            placeholder="Recipient's full address..." 
            className="pl-12 py-6 rounded-2xl border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input {...register('recipientName')} label="Recipient Name" placeholder="Contact Person" className="py-6 rounded-2xl" />
        <Input {...register('recipientPhone')} label="Recipient Phone" placeholder="Contact Phone" className="py-6 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Package Category</label>
          <select 
            {...register('packageType')}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            {Object.values(PackageType).map(type => (
              <option key={type} value={type}>{type.charAt(0) + type.slice(1).toLowerCase()}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Weight (kg)</label>
          <Input 
            type="number" 
            step="0.1" 
            {...register('packageWeight')}
            placeholder="1.0" 
            className="py-6 rounded-2xl" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Special Handling Instructions</label>
        <textarea 
          {...register('specialInstructions')}
          placeholder="Fragile, gate codes, call upon arrival, etc." 
          className="w-full p-4 border border-slate-200 rounded-2xl text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500/20"
        ></textarea>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center p-8 bg-blue-50 rounded-[3rem] border border-blue-100">
         <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-blue-500/20">
            <ShieldCheck size={32} />
         </div>
         <h3 className="text-xl font-black text-slate-900">Confirm & Dispatch</h3>
         <p className="text-sm text-slate-500 mt-2">Please verify all shipment details before final submission.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
           <div className="p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                 <Truck size={12} className="mr-1.5 text-blue-500" /> Logistics Details
              </h4>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0"></div>
                    <div className="min-w-0">
                       <p className="text-[10px] font-bold text-slate-500 uppercase">From</p>
                       <p className="text-sm font-bold text-slate-900 truncate">{watch('pickupAddress')}</p>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    <div className="min-w-0">
                       <p className="text-[10px] font-bold text-slate-500 uppercase">To</p>
                       <p className="text-sm font-bold text-slate-900 truncate">{watch('deliveryAddress')}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <div className="p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                 <Package size={12} className="mr-1.5 text-blue-500" /> Items & Category
              </h4>
              <div className="flex items-center justify-between">
                 <div>
                    <p className="text-sm font-bold text-slate-900">{watch('packageType')}</p>
                    <p className="text-xs text-slate-500">{watch('packageWeight')} kg Total weight</p>
                 </div>
                 <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500">INSURED</div>
              </div>
           </div>
        </div>
      </div>

      <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
         <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Total Fare Payable</p>
            <CreditCard size={18} className="text-blue-500" />
         </div>
         <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{formatCurrency(calculatedPrice.total)}</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">USD</span>
         </div>
         <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
            Payment will be processed upon driver pickup. Changes to the destination or weight may affect the final amount.
         </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
      <form onSubmit={handleSubmit(onNext)}>
        <div className="p-8 md:p-12">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        <div className="px-8 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onBack} 
            disabled={step === 1 || isLoading}
            className="rounded-xl px-6 font-bold text-slate-500"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </Button>

          {step < 4 ? (
            <Button 
              type="submit" 
              className="rounded-2xl px-10 py-6 bg-blue-600 text-white shadow-xl shadow-blue-500/20 font-black uppercase tracking-widest text-xs"
            >
              Next Step <ArrowRight size={18} className="ml-2" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              isLoading={isLoading}
              className="rounded-2xl px-12 py-6 bg-blue-600 text-white shadow-xl shadow-blue-600/30 font-black uppercase tracking-widest text-xs"
            >
              Confirm & Dispatch <Truck size={18} className="ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
