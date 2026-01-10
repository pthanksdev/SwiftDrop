
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login, loading } = useAuth();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: async (data) => {
      try {
        loginSchema.parse(data);
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

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-md py-8">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20 transition-transform hover:scale-105">
            <LogIn className="text-white" size={32} />
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome to SwiftDrop</h1>
          <p className="text-slate-400 mt-2 font-medium">Manage your deliveries with precision</p>
        </div>

        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800/10">
          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                leftIcon={<Mail size={18} />}
                {...register('email')}
                error={errors.email?.message}
              />

              <div className="space-y-1">
                <div className="flex items-center justify-between px-1">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot password?</button>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} />}
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>

              <Button
                type="submit"
                className="w-full py-4 text-lg shadow-xl shadow-blue-200"
                isLoading={loading}
                rightIcon={<ArrowRight size={18} />}
              >
                Sign In
              </Button>
            </form>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account? <Link to="/register" className="font-bold text-blue-600 hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
        <p className="text-center text-slate-500 text-xs mt-8">
          &copy; 2024 SwiftDrop Logistics Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
