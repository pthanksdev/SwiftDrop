
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Truck, User, CreditCard, ShieldCheck, Check, Info } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { useDrivers } from '../../hooks/useDrivers';
import { toast } from 'sonner';

const driverSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone is required'),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  vehiclePlate: z.string().min(4, 'Plate number is required'),
  licenseNumber: z.string().min(5, 'License number is required'),
});

const CreateDriverPage: React.FC = () => {
  const navigate = useNavigate();
  const { createDriver } = useDrivers();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(driverSchema)
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createDriver(data);
      toast.success('Driver application submitted');
      navigate('/drivers');
    } catch (err) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/drivers')}
          className="rounded-xl h-12 w-12 bg-white border border-slate-100"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Onboard Courier</h1>
          <p className="text-slate-500 font-medium">Register a new delivery partner to the fleet.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden shadow-sm">
              <div className="p-8 space-y-8">
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-blue-600">
                    <User size={20} />
                    <h3 className="font-black text-xs uppercase tracking-widest">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input {...register('firstName')} placeholder="First Name" className="py-6 rounded-2xl" error={errors.firstName?.message as string} />
                    <Input {...register('lastName')} placeholder="Last Name" className="py-6 rounded-2xl" error={errors.lastName?.message as string} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input {...register('email')} type="email" placeholder="Email Address" className="py-6 rounded-2xl" error={errors.email?.message as string} />
                    <Input {...register('phone')} placeholder="Phone Number" className="py-6 rounded-2xl" error={errors.phone?.message as string} />
                  </div>
                </section>

                <hr className="border-slate-100" />

                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <Truck size={20} />
                    <h3 className="font-black text-xs uppercase tracking-widest">Vehicle Specifications</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select 
                      {...register('vehicleType')}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="BIKE">Bicycle</option>
                      <option value="MOTORCYCLE">Motorcycle</option>
                      <option value="SEDAN">Sedan</option>
                      <option value="VAN">Delivery Van</option>
                      <option value="TRUCK">Heavy Truck</option>
                    </select>
                    <Input {...register('vehiclePlate')} placeholder="Plate Number (e.g. ABC-1234)" className="py-6 rounded-2xl" error={errors.vehiclePlate?.message as string} />
                  </div>
                </section>

                <hr className="border-slate-100" />

                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-indigo-600">
                    <CreditCard size={20} />
                    <h3 className="font-black text-xs uppercase tracking-widest">Verification Details</h3>
                  </div>
                  <Input {...register('licenseNumber')} placeholder="Driver's License Number" className="py-6 rounded-2xl" error={errors.licenseNumber?.message as string} />
                </section>
              </div>

              <div className="px-8 py-8 bg-slate-50 border-t border-slate-100">
                <Button 
                  type="submit" 
                  isLoading={loading}
                  className="w-full rounded-2xl py-8 bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20"
                >
                  Submit Registration <ShieldCheck size={18} className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6">
               <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={24} />
               </div>
               <h3 className="text-xl font-bold">Onboarding Policy</h3>
               <p className="text-sm text-slate-400 leading-relaxed">
                 All new drivers must undergo a mandatory background check and vehicle inspection within 48 hours of registration.
               </p>
               <ul className="space-y-3">
                 {['Valid License', 'Clean Record', 'Insured Vehicle'].map((item) => (
                   <li key={item} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                     <Check size={14} className="text-emerald-500" /> {item}
                   </li>
                 ))}
               </ul>
            </div>

            <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] space-y-4">
               <div className="flex items-center gap-3 text-blue-600">
                  <Info size={18} />
                  <h4 className="font-bold text-sm">Need Help?</h4>
               </div>
               <p className="text-xs text-blue-700 leading-relaxed">
                 Having trouble with registration? Contact fleet support at 1-800-SWIFT-DRIVE.
               </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDriverPage;
