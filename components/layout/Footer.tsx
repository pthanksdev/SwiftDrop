import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';

// Added FooterProps interface to accept className
interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    // Used cn to merge the default styles with the incoming className prop
    <footer className={cn("mt-auto py-8 px-4 md:px-8 bg-white border-t border-slate-200", className)}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm font-medium text-slate-500">
          &copy; {new Date().getFullYear()} <span className="text-slate-900 font-bold">SwiftDrop Logistics Inc.</span> 
          <span className="hidden sm:inline"> • Precision in Motion.</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link to="/help" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Support</Link>
          <Link to="/privacy" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Privacy</Link>
          <Link to="/terms" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Terms</Link>
        </div>

        <div className="flex items-center text-xs font-medium text-slate-400">
          Made with <Heart size={12} className="mx-1 text-red-500 fill-red-500" /> globally
        </div>
      </div>
    </footer>
  );
};

export default Footer;