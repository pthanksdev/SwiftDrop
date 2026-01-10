
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, User as UserIcon, LogOut, Settings, HelpCircle } from 'lucide-react';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import NotificationBell from './NotificationBell';
import SearchBar from '../common/SearchBar';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 z-30 sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-8 flex-1">
        <button 
          onClick={toggleSidebar} 
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>
        
        <div className="hidden md:block w-full max-w-xl">
           <SearchBar />
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        <NotificationBell />

        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-1.5 pr-3 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/20">
              {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-slate-900 leading-tight">{user?.firstName} {user?.lastName}</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{user?.role}</p>
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
              <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 rounded-[1.5rem] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-slate-50 mb-2">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Signed in as</p>
                   <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                </div>
                <Link to="/profile" className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <UserIcon size={18} className="mr-3 text-slate-400" /> Identity Profile
                </Link>
                <Link to="/settings" className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <Settings size={18} className="mr-3 text-slate-400" /> Platform Settings
                </Link>
                <button className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <HelpCircle size={18} className="mr-3 text-slate-400" /> System Guide
                </button>
                <div className="my-2 border-t border-slate-50"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors"
                >
                  <LogOut size={18} className="mr-3" /> Terminate Session
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
