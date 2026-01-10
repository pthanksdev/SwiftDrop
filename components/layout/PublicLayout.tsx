
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Truck, Menu, X, Sun, Moon } from 'lucide-react';
import Button from '../common/Button';
import { cn } from '../../lib/utils';

const PublicLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full z-[100] bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <Truck size={24} />
                </div>
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">SwiftDrop</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button 
                onClick={() => navigate('/login')} 
                className="text-sm font-black text-slate-600 dark:text-slate-400 hover:text-blue-600 px-4 transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 dark:text-slate-400 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block text-lg font-bold text-slate-900 dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full rounded-2xl" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 py-20 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
                <Truck className="text-blue-500" size={24} />
                <span className="text-xl font-bold tracking-tight">SwiftDrop</span>
              </div>
              <p className="text-sm leading-relaxed">
                Logistics reimagined for the modern world. Precision, speed, and reliability in every single relay.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/about" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
                <li><Link to="/press" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/pricing" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link to="/tracking" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Public Tracking</Link></li>
                <li><Link to="/api" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">API Reference</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/privacy" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} SwiftDrop Logistics Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
