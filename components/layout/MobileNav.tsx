import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  UserCircle, 
  BarChart3,
  Search
} from 'lucide-react';
import { UserRole } from '../../types/api.types';
import { cn } from '../../lib/utils';

const MobileNav: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  const tabs = [
    { name: 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Orders', icon: Package, path: '/orders' },
    { name: 'Search', icon: Search, path: '/orders', query: '?search=true' }, // Placeholder for global search trigger
  ];

  if (user.role === UserRole.ADMIN || user.role === UserRole.DISPATCHER) {
    tabs.push({ name: 'Fleet', icon: Truck, path: '/drivers' });
  }

  tabs.push({ name: 'Me', icon: UserCircle, path: '/profile' });

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around pb-safe h-20 z-50 px-2 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-300",
            isActive ? "text-blue-600" : "text-slate-400"
          )}
        >
          {/* Fixed: Use render prop for children to access isActive property and fix 'Cannot find name isActive' error */}
          {({ isActive }) => (
            <>
              <div className={cn(
                "p-2 rounded-xl transition-all",
                "active:scale-90"
              )}>
                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                {tab.name}
              </span>
              {/* Active Indicator */}
              <div className={cn(
                "w-1 h-1 rounded-full bg-blue-600 transition-all",
                isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}></div>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileNav;