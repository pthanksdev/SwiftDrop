
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/slices/authSlice';
import { authApi } from '../api/endpoints/auth.api';
import { toast } from 'sonner';
import { LoginRequest, RegisterRequest } from '../types/auth.types';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginRequest) => {
    dispatch(loginStart());
    try {
      const response = await authApi.login(credentials);
      dispatch(loginSuccess(response.data));
      toast.success('Successfully logged in');
      navigate('/dashboard');
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      dispatch(loginFailure(message));
      toast.error(message);
      throw err;
    }
  };

  const register = async (data: RegisterRequest) => {
    dispatch(loginStart());
    try {
      // 1. Perform registration
      const regResponse = await authApi.register(data);
      toast.success('Account created successfully!');

      // 2. Auto-login: Most APIs return token on register, or we call login
      // For this demo/mock structure, we'll simulate an auto-login success
      const authData = {
        token: 'mock-jwt-token-auto-gen',
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          role: data.role,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };

      dispatch(loginSuccess(authData));
      navigate('/dashboard');
      return authData;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      dispatch(loginFailure(message));
      toast.error(message);
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      // Optional: await authApi.logout();
    } finally {
      dispatch(logout());
      toast.info('Logged out successfully');
      navigate('/login');
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: handleLogout,
  };
};
