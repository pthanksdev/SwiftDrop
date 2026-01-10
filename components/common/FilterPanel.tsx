import React from 'react';
import { X, Filter, Save, Trash2, Calendar, DollarSign, Star, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onClear: () => void;
  onSavePreset?: () => void;
  children: React.ReactNode;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  isOpen, onClose, title, onClear, onSavePreset, children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-500">
        <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Filter size={24} />
             </div>
             <div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">Advanced Slicing</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
          {children}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <Button 
            variant="ghost" 
            onClick={onClear}
            className="flex-1 rounded-2xl py-8 font-black uppercase tracking-widest text-[10px] text-rose-500 hover:bg-rose-50"
          >
            <Trash2 size={16} className="mr-2" /> Reset All
          </Button>
          {onSavePreset && (
            <Button 
              variant="outline"
              onClick={onSavePreset}
              className="flex-1 rounded-2xl py-8 border-slate-200 font-black uppercase tracking-widest text-[10px]"
            >
              <Save size={16} className="mr-2" /> Save View
            </Button>
          )}
          <Button 
            onClick={onClose}
            className="flex-1 rounded-2xl py-8 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-500/20"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export const FilterGroup: React.FC<{ label: string; icon?: any; children: React.ReactNode }> = ({ label, icon: Icon, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-slate-400">
      {Icon && <Icon size={14} />}
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</h4>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

export const MultiSelectPills: React.FC<{ options: string[]; selected: string[]; onChange: (vals: string[]) => void }> = ({ options, selected, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map(opt => (
      <button
        key={opt}
        onClick={() => {
          const next = selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt];
          onChange(next);
        }}
        className={cn(
          "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
          selected.includes(opt) ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
        )}
      >
        {opt.replace('_', ' ')}
      </button>
    ))}
  </div>
);

export const RangeSlider: React.FC<{ min: number; max: number; value: number; onChange: (v: number) => void; unit?: string }> = ({ min, max, value, onChange, unit }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
       <span className="text-[10px] font-black text-slate-400 uppercase">{min}{unit}</span>
       <span className="text-xl font-black text-slate-900">{value}{unit}</span>
       <span className="text-[10px] font-black text-slate-400 uppercase">{max}{unit}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))} 
      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);