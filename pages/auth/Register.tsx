
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Phone, ArrowRight, Truck, UserCircle, Briefcase, ShieldCheck, ShieldAlert } from 'lucide-react';
import { z } from 'zod';
import { UserRole } from '../../types/api.types';
import { useAuth } from '../../hooks/useAuth';
import { authApi } from '../../api/endpoints/auth.api';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.nativeEnum(UserRole, { errorMap: () => ({ message: 'Please select a role' }) }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { register: registerUser, loading } = useAuth();
  const [adminExists, setAdminExists] = useState<boolean>(true); // Default true for security
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<RegisterFormData>({
    defaultValues: {
      role: UserRole.CUSTOMER
    },
    resolver: async (data) => {
      try {
        registerSchema.parse(data);
        return { values: data, errors: {} };
      } catch (err: any) {
        return {
          values: {},
          errors: err.formErrors?.fieldErrors ? Object.fromEntries(
            Object.entries(err.formErrors.fieldErrors).map(([k, v]) => [k, { message: (v as string[])[0] }])
          ) : {}
        };
      }
    }
  });

  const selectedRole = watch('role');

  // Check if admin exists on mount
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const { data } = await authApi.checkAdminExists();
        setAdminExists(data.exists);
      } catch (err) {
        // If API fails, check local storage mock or default to true for safety
        const mockExists = localStorage.getItem('sd_admin_initialized') === 'true';
        setAdminExists(mockExists);
      } finally {
        setCheckingAdmin(false);
      }
    };
    verifyAdmin();
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    const result = await registerUser(data);
    // If the registered user was an admin, mark system as initialized
    if (data.role === UserRole.ADMIN) {
      localStorage.setItem('sd_admin_initialized', 'true');
    }
  };

  const availableRoles = [
    { value: UserRole.CUSTOMER, label: 'Customer', icon: UserCircle, desc: 'Send packages & track deliveries' },
    { value: UserRole.DRIVER, label: 'Driver', icon: Truck, desc: 'Earn money by delivering packages' },
    { value: UserRole.DISPATCHER, label: 'Dispatcher', icon: Briefcase, desc: 'Manage fleet and assignments' },
  ];

  // Only add Admin if it doesn't exist in the system
  if (!adminExists) {
    availableRoles.unshift({ 
      value: UserRole.ADMIN, 
      label: 'System Admin', 
      icon: ShieldAlert, 
      desc: 'Full platform orchestration control' 
    });
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white rounded-3xl lg:rounded-[2.5rem] shadow-2xl">
        
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10">
             <Link to="/" className="flex items-center space-x-2 mb-12 transition-transform hover:scale-105 inline-block">
                <Truck size={32} />
                <span className="text-2xl font-black tracking-tight text-white">SwiftDrop</span>
             </Link>
             <h2 className="text-4xl font-black leading-tight mb-6 text-white">
               Join the future of <br /> logistics today.
             </h2>
             <p className="text-blue-100 text-lg">
               Create an account and get access to the world's most advanced delivery network.
             </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <p className="font-bold text-white">Enterprise-grade security</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ArrowRight size={20} className="text-white" />
              </div>
              <p className="font-bold text-white">Instant driver matching</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col bg-white">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center justify-between lg:block">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Create Account</h1>
                  <p className="text-slate-500 text-sm mt-1">Fill in the details to get started.</p>
                </div>
                <Link to="/" className="lg:hidden text-blue-600">
                   <Truck size={28} />
                </Link>
              </div>
            </div>

            {checkingAdmin ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Verifying System Status...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">I am joining as a:</label>
                  <div className="grid grid-cols-1 gap-2">
                    {availableRoles.map((role) => (
                      <label 
                        key={role.value}
                        className={`flex items-center p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          selectedRole === role.value 
                            ? (role.value === UserRole.ADMIN ? 'border-rose-600 bg-rose-50' : 'border-blue-600 bg-blue-50') 
                            : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                      >
                        <input 
                          type="radio" 
                          value={role.value} 
                          className="hidden" 
                          {...register('role')} 
                        />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shrink-0 ${
                          selectedRole === role.value 
                            ? (role.value === UserRole.ADMIN ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white') 
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          <role.icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className={`font-bold text-sm leading-tight ${selectedRole === role.value ? (role.value === UserRole.ADMIN ? 'text-rose-600' : 'text-blue-600') : 'text-slate-900'}`}>
                            {role.label}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">{role.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.role && <p className="text-red-500 text-xs font-medium">{errors.role.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    label="First Name" 
                    placeholder="Jane" 
                    {...register('firstName')} 
                    error={errors.firstName?.message}
                  />
                  <Input 
                    label="Last Name" 
                    placeholder="Doe" 
                    {...register('lastName')} 
                    error={errors.lastName?.message}
                  />
                </div>

                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="jane@example.com" 
                  leftIcon={<Mail size={18} />}
                  {...register('email')} 
                  error={errors.email?.message}
                />

                <Input 
                  label="Phone Number" 
                  placeholder="+1 (555) 000-0000" 
                  leftIcon={<Phone size={18} />}
                  {...register('phone')} 
                  error={errors.phone?.message}
                />

                <Input 
                  label="Password" 
                  type="password" 
                  placeholder="••••••••" 
                  leftIcon={<Lock size={18} />}
                  {...register('password')} 
                  error={errors.password?.message}
                />

                <Button 
                  type="submit" 
                  className={`w-full py-4 text-lg shadow-xl ${selectedRole === UserRole.ADMIN ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' : 'shadow-blue-200'}`} 
                  isLoading={loading}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Create {selectedRole === UserRole.ADMIN ? 'Administrator' : 'Account'}
                </Button>
              </form>
            )}

            <div className="mt-8 mb-4 text-center">
              <p className="text-sm text-slate-600">
                Already have an account? <Link to="/login" className="font-bold text-blue-600 hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
