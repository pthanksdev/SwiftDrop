
import React, { useState } from 'react';
import { Star, MessageSquare, Tag, X, Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface RatingDialogProps {
  type: 'driver' | 'customer';
  name: string;
  onSubmit: (data: { rating: number, feedback: string, tags: string[] }) => Promise<void>;
  onClose: () => void;
}

const RatingDialog: React.FC<RatingDialogProps> = ({ type, name, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const tags = type === 'driver' 
    ? ['On Time', 'Professional', 'Careful Handling', 'Polite', 'Great Communication']
    : ['Accurate Address', 'Polite', 'Quick Handover', 'Easy Access', 'Clear Instructions'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleFormSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    try {
      await onSubmit({ rating, feedback, tags: selectedTags });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-0 animate-in zoom-in-95 duration-300">
      <div className="p-8 bg-slate-900 text-white relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-2xl font-black mb-4 shadow-xl">
             {name.charAt(0)}
           </div>
           <h3 className="text-xl font-black">Rate your experience</h3>
           <p className="text-slate-400 text-xs mt-1 font-medium uppercase tracking-widest">Feedback for {name}</p>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Star Input */}
        <div className="flex flex-col items-center space-y-3">
           <div className="flex gap-2">
             {[1, 2, 3, 4, 5].map((star) => (
               <button
                 key={star}
                 onMouseEnter={() => setHoveredRating(star)}
                 onMouseLeave={() => setHoveredRating(0)}
                 onClick={() => setRating(star)}
                 className="transition-transform active:scale-90 hover:scale-110"
               >
                 <Star 
                   size={42} 
                   className={cn(
                     "transition-colors",
                     (hoveredRating || rating) >= star 
                      ? "fill-amber-400 text-amber-400" 
                      : "text-slate-200"
                   )}
                 />
               </button>
             ))}
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
             {rating === 5 ? 'Exceptional' : rating === 4 ? 'Very Good' : rating === 3 ? 'Average' : rating === 2 ? 'Poor' : rating === 1 ? 'Terrible' : 'Select a score'}
           </p>
        </div>

        {/* Tags */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-slate-400">
              <Tag size={14} />
              <h4 className="text-[10px] font-black uppercase tracking-widest">Highlights</h4>
           </div>
           <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all border-2",
                    selectedTags.includes(tag)
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                  )}
                >
                  {tag}
                </button>
              ))}
           </div>
        </div>

        {/* Feedback Area */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-slate-400">
              <MessageSquare size={14} />
              <h4 className="text-[10px] font-black uppercase tracking-widest">Detailed Review</h4>
           </div>
           <textarea 
            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            placeholder="Share details of your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
           ></textarea>
        </div>

        <Button 
          onClick={handleFormSubmit}
          disabled={rating === 0 || loading}
          isLoading={loading}
          className="w-full py-8 rounded-[2rem] bg-slate-900 text-white font-black uppercase tracking-widest text-xs shadow-xl"
        >
          Submit Feedback <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default RatingDialog;
