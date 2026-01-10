
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, ShieldCheck, ArrowRight, Truck, UserCircle, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { UserRole } from '../../types/api.types';
import { cn } from '../../lib/utils';

const userSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  role: z.nativeEnum(UserRole),
  isActive: z.boolean().default(true),
  // Driver specific fields (optional in schema, handled in UI)
  vehicleType: z.string().optional(),
  vehiclePlate: z.string().optional(),
});

interface UserFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData, loading }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || { role: UserRole.CUSTOMER, isActive: true }
  });

  const selectedRole = watch('role');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input {...register('firstName')} label="First Name" placeholder="Jane" error={errors.firstName?.message as string} className="py-6 rounded-2xl" />
        <Input {...register('lastName')} label="Last Name" placeholder="Doe" error={errors.lastName?.message as string} className="py-6 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input {...register('email')} label="Email Address" type="email" placeholder="jane@example.com" error={errors.email?.message as string} className="py-6 rounded-2xl" />
        <Input {...register('phone')} label="Phone Number" placeholder="+1 (555) 000-0000" error={errors.phone?.message as string} className="py-6 rounded-2xl" />
      </div>

      <div className="space-y-3">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">System Role</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.values(UserRole).map((role) => (
            <label 
              key={role}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all text-center",
                selectedRole === role ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 hover:border-slate-200 text-slate-400"
              )}
            >
              <input type="radio" className="hidden" value={role} {...register('role')} />
              <span className="text-[10px] font-black uppercase tracking-widest">{role}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedRole === UserRole.DRIVER && (
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Truck size={16} />
            <h4 className="text-xs font-black uppercase tracking-widest">Driver Credentials</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input {...register('vehicleType')} placeholder="Vehicle Type (e.g. Van)" className="py-6 rounded-2xl bg-white" />
            <Input {...register('vehiclePlate')} placeholder="License Plate" className="py-6 rounded-2xl bg-white" />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-slate-900">Account Access</p>
          <p className="text-xs text-slate-500">Toggle active status for this user.</p>
        </div>
        <input type="checkbox" {...register('isActive')} className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-emerald-500 cursor-pointer transition-colors relative after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:w-3 after:h-3 after:rounded-full after:transition-all checked:after:translate-x-5" />
      </div>

      <Button 
        type="submit" 
        isLoading={loading}
        className="w-full rounded-2xl py-8 bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20"
      >
        Save User Profile <ArrowRight size={18} className="ml-2" />
      </Button>
    </form>
  );
};

export default UserForm;
