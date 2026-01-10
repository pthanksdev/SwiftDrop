
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { UserRole } from '../../types/api.types';

const customerSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
});

interface CustomerFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  loading?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, initialData, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">First Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              {...register('firstName')} 
              placeholder="e.g. Michael" 
              className="pl-12 py-6 rounded-2xl" 
              error={errors.firstName?.message as string}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Last Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              {...register('lastName')} 
              placeholder="e.g. Scott" 
              className="pl-12 py-6 rounded-2xl" 
              error={errors.lastName?.message as string}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            {...register('email')} 
            type="email"
            placeholder="michael.scott@dundermifflin.com" 
            className="pl-12 py-6 rounded-2xl" 
            error={errors.email?.message as string}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Primary Phone</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            {...register('phone')} 
            placeholder="+1 (555) 000-0000" 
            className="pl-12 py-6 rounded-2xl" 
            error={errors.phone?.message as string}
          />
        </div>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          isLoading={loading}
          className="w-full rounded-2xl py-8 bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20"
        >
          Confirm Client Profile <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>

      <div className="flex items-center gap-2 justify-center py-2">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profiles are secured and encrypted</span>
      </div>
    </form>
  );
};

export default CustomerForm;
