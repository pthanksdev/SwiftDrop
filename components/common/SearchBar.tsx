import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, Truck, User, X, Loader2, ArrowRight, CornerDownLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchResult {
  id: string;
  type: 'order' | 'driver' | 'customer';
  title: string;
  subtitle: string;
  status?: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Search Logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);
    
    const timeoutId = setTimeout(() => {
      // Fixed: Explicitly typed 'type' property to resolve type incompatibility error on line 48
      const mockResults: SearchResult[] = [
        { id: 'ORD-9902', type: 'order' as const, title: 'ORD-9902', subtitle: 'Electronic Parcel to San Francisco', status: 'IN_TRANSIT' },
        { id: 'd1', type: 'driver' as const, title: 'John Doe', subtitle: 'Silver Prius • SF-9902', status: 'ONLINE' },
        { id: 'c1', type: 'customer' as const, title: 'Alice Johnson', subtitle: 'alice@example.com' },
      ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.subtitle.toLowerCase().includes(query.toLowerCase()));
      
      setResults(mockResults);
      setLoading(false);
      setSelectedIndex(-1);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    const path = result.type === 'order' ? `/orders/${result.id}` : 
                 result.type === 'driver' ? `/drivers/${result.id}` : 
                 `/customers/${result.id}`;
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl group">
      <div className={cn(
        "flex items-center bg-slate-100/50 border border-slate-200 px-5 py-3 rounded-2xl transition-all duration-300",
        isOpen && "bg-white border-blue-500 ring-4 ring-blue-500/10 shadow-xl"
      )}>
        {loading ? <Loader2 size={18} className="text-blue-500 animate-spin" /> : <Search size={18} className="text-slate-400 group-focus-within:text-blue-500" />}
        <input 
          type="text" 
          placeholder="Command Search: Orders, Fleet, Directory..." 
          className="bg-transparent border-none focus:ring-0 ml-3 text-sm w-full placeholder:text-slate-400 font-bold"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={onKeyDown}
        />
        {query && <button onClick={() => setQuery('')} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X size={14} /></button>}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-3 w-full bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Global Index Results</span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300">
               <CornerDownLeft size={10} /> Navigate
            </div>
          </div>
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {results.map((result, index) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  "w-full px-6 py-4 flex items-center justify-between text-left transition-colors border-b border-slate-50 last:border-none",
                  selectedIndex === index ? "bg-blue-50" : "bg-white"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    result.type === 'order' ? "bg-blue-100 text-blue-600" :
                    result.type === 'driver' ? "bg-emerald-100 text-emerald-600" : "bg-purple-100 text-purple-600"
                  )}>
                    {result.type === 'order' && <Package size={18} />}
                    {result.type === 'driver' && <Truck size={18} />}
                    {result.type === 'customer' && <User size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-none">{result.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">{result.subtitle}</p>
                  </div>
                </div>
                {result.status && (
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-[8px] font-black uppercase border-none bg-white text-slate-500">
                       {result.status}
                    </Badge>
                    <ArrowRight size={14} className={cn("transition-transform", selectedIndex === index ? "text-blue-500 translate-x-1" : "text-slate-200")} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Badge: React.FC<{ children: React.ReactNode; variant?: string; className?: string }> = ({ children, className }) => (
  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", className)}>
    {children}
  </span>
);

export default SearchBar;