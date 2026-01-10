
import React, { useState } from 'react';
import { Star, Filter, ArrowUpDown, MessageSquare, ShieldCheck, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { formatDate } from '../../utils/formatters';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  feedback: string;
  tags: string[];
  date: string;
  isVerified: boolean;
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  const [filter, setFilter] = useState<number | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');

  const filteredReviews = reviews
    .filter(r => filter === 'ALL' || r.rating === filter)
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return b.rating - a.rating;
    });

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-10">
      {/* Review Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
         <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Platform Score</h4>
            <div className="flex items-center gap-4">
               <span className="text-6xl font-black text-slate-900">{avgRating.toFixed(1)}</span>
               <div>
                  <div className="flex gap-1 mb-1">
                     {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={16} className={cn(s <= Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-slate-200")} />
                     ))}
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase">{reviews.length} Verified Reviews</p>
               </div>
            </div>
         </div>

         <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(star => {
               const count = reviews.filter(r => r.rating === star).length;
               const percent = (count / reviews.length) * 100;
               return (
                  <div key={star} className="flex items-center gap-3">
                     <span className="text-[10px] font-black text-slate-500 w-4">{star}</span>
                     <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400" style={{ width: `${percent}%` }}></div>
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 w-8">{Math.round(percent)}%</span>
                  </div>
               );
            })}
         </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
               onClick={() => setFilter('ALL')}
               className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                  filter === 'ALL' ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-100 text-slate-500"
               )}
            >
               All
            </button>
            {[5, 4, 3, 2, 1].map(s => (
               <button 
                  key={s}
                  onClick={() => setFilter(s)}
                  className={cn(
                     "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-1.5",
                     filter === s ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-100 text-slate-500"
                  )}
               >
                  {s} <Star size={10} className={filter === s ? "fill-white" : "fill-slate-300 text-transparent"} />
               </button>
            ))}
         </div>

         <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-black text-[9px] px-3 py-1.5 border-none">
               <ArrowUpDown size={12} className="mr-2" /> 
               <select 
                  className="bg-transparent outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
               >
                  <option value="newest">Newest First</option>
                  <option value="highest">Highest Rating</option>
               </select>
            </Badge>
         </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
         {filteredReviews.length > 0 ? filteredReviews.map((r, i) => (
            <div key={r.id} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm animate-in slide-in-from-bottom-2 transition-all hover:shadow-md" style={{ animationDelay: `${i * 100}ms` }}>
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400">
                        {r.authorName.charAt(0)}
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <h5 className="font-black text-slate-900">{r.authorName}</h5>
                           {r.isVerified && (
                              <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black px-1.5 py-0">
                                 <ShieldCheck size={10} className="mr-1" /> VERIFIED
                              </Badge>
                           )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{formatDate(r.date)}</p>
                     </div>
                  </div>
                  <div className="flex gap-1">
                     {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={14} className={cn(s <= r.rating ? "fill-amber-400 text-amber-400" : "text-slate-100")} />
                     ))}
                  </div>
               </div>

               <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">"{r.feedback}"</p>

               <div className="flex flex-wrap gap-2">
                  {r.tags.map(tag => (
                     <Badge key={tag} variant="outline" className="text-[9px] font-black uppercase text-blue-500 border-blue-100 bg-blue-50/30">
                        {tag}
                     </Badge>
                  ))}
               </div>
            </div>
         )) : (
            <div className="py-20 text-center space-y-4">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-200">
                  <Star size={32} />
               </div>
               <p className="text-slate-400 font-bold">No reviews match your filter.</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default ReviewsList;
