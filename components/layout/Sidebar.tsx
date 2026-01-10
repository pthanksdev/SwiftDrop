
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  UserCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
  CreditCard,
  ShieldAlert,
  Fingerprint,
  Monitor,
  UserCheck,
  Activity,
  Wallet,
  Tag,
  RotateCcw,
  Cpu,
  FileText,
  Shield,
  FileBarChart
} from 'lucide-react';
import { UserRole } from '../../types/api.types';
import { logout } from '../../store/slices/authSlice';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/dashboard', 
      roles: [UserRole.ADMIN, UserRole.DISPATCHER, UserRole.DRIVER, UserRole.CUSTOMER] 
    },
    { 
      name: 'Shipments', 
      icon: Package, 
      path: '/orders', 
      roles: [UserRole.ADMIN, UserRole.DISPATCHER, UserRole.DRIVER, UserRole.CUSTOMER] 
    },
    { 
      name: 'Fleet Control', 
      icon: Truck, 
      path: '/drivers', 
      roles: [UserRole.ADMIN, UserRole.DISPATCHER] 
    },
    { 
      name: 'Directory', 
      icon: Users, 
      path: '/customers', 
      roles: [UserRole.ADMIN, UserRole.DISPATCHER] 
    },
    { 
      name: 'Intelligence', 
      icon: BarChart3, 
      path: '/analytics', 
      roles: [UserRole.ADMIN, UserRole.DISPATCHER] 
    },
    { 
      name: 'Reports', 
      icon: FileBarChart, 
      path: '/reports', 
      roles: [UserRole.ADMIN, UserRole.DISPATCHER] 
    },
    { 
      name: 'Payments', 
      icon: CreditCard, 
      path: '/payments', 
      roles: [UserRole.ADMIN, UserRole.CUSTOMER] 
    },
    { 
      name: 'Identity', 
      icon: UserCircle, 
      path: '/profile', 
      roles: [UserRole.ADMIN, UserRole.DISPATCHER, UserRole.DRIVER, UserRole.CUSTOMER] 
    },
    { 
      name: 'Settings', 
      icon: Settings, 
      path: '/settings', 
      roles: [UserRole.ADMIN, UserRole.DISPATCHER, UserRole.DRIVER, UserRole.CUSTOMER] 
    },
  ];

  const adminItems = [
    { name: 'System Pulse', icon: ShieldAlert, path: '/admin/dashboard' },
    { name: 'User Ops', icon: Fingerprint, path: '/admin/users' },
    { name: 'Fleet Verification', icon: UserCheck, path: '/admin/approvals' },
    { name: 'Fleet Command', icon: Monitor, path: '/admin/monitoring' },
    { name: 'Order Oversight', icon: Activity, path: '/admin/orders' },
    { name: 'Settlement Hub', icon: Wallet, path: '/admin/finance' },
    { name: 'Yield & Promos', icon: Tag, path: '/admin/promos' },
    { name: 'Claim Center', icon: RotateCcw, path: '/admin/refunds' },
    { name: 'Advanced Intel', icon: BarChart3, path: '/admin/analytics' },
    { name: 'Report Engine', icon: FileText, path: '/admin/reports' },
    { name: 'Security Audit', icon: Shield, path: '/admin/audit' },
    { name: 'System Core', icon: Cpu, path: '/admin/settings' },
  ];

  // Fix: Simplified filteredMenu logic to correctly use user.role and avoid type errors
  const filteredMenu = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <aside className={cn(
      "transition-all duration-500 bg-[#0F172A] text-white flex flex-col h-full relative z-40 shadow-2xl overflow-hidden shrink-0",
      isOpen ? 'w-72' : 'w-0 lg:w-24'
    )}>
      {/* Sidebar Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/50 shrink-0">
        <Link to="/dashboard" className="flex items-center space-x-3 overflow-hidden">
          <div className="min-w-[40px] w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Truck size={22} />
          </div>
          {isOpen && (
            <span className="text-xl font-black text-white tracking-tighter whitespace-nowrap animate-in fade-in slide-in-from-left-2">
              Swift<span className="text-blue-500">Drop</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pb-10">
        {isOpen && (
          <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Network Operations
          </p>
        )}
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon size={22} className={`min-w-[22px] transition-transform duration-300 group-hover:scale-110`} />
            {isOpen && (
              <span className="ml-4 font-bold text-sm tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-4">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}

        {user?.role === UserRole.ADMIN && (
          <div className="pt-6 space-y-1.5">
            {isOpen && (
              <p className="px-4 text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4">
                Admin Console
              </p>
            )}
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon size={22} className={`min-w-[22px] transition-transform duration-300 group-hover:scale-110`} />
                {isOpen && (
                  <span className="ml-4 font-bold text-sm tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-4">
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800/50 space-y-2 shrink-0">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-2xl transition-all group relative"
        >
          <LogOut size={22} className="min-w-[22px] group-hover:-translate-x-1 transition-transform" />
          {isOpen && (
            <span className="ml-4 font-bold text-sm tracking-tight">Sign Out</span>
          )}
        </button>
      </div>

      <button 
        onClick={toggle}
        className="hidden lg:flex absolute bottom-32 -right-3 w-6 h-6 bg-blue-600 text-white rounded-full items-center justify-center border-2 border-[#0F172A] hover:scale-110 transition-transform z-50 shadow-lg"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </aside>
  );
};

export default Sidebar;
