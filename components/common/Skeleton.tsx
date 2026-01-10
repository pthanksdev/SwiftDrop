
import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rect' }) => {
  return (
    <div
      className={cn(
        "animate-shimmer bg-slate-200",
        variant === 'circle' ? "rounded-full" : variant === 'text' ? "rounded h-3 w-3/4" : "rounded-2xl",
        className
      )}
    />
  );
};

export const OrderCardSkeleton = () => (
  <div className="bg-white rounded-[2rem] border border-slate-200/60 p-0 overflow-hidden">
    <div className="p-5 md:p-6 border-b border-slate-50 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="w-12 h-2" variant="text" />
          <Skeleton className="w-20 h-3" variant="text" />
        </div>
      </div>
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
    <div className="p-5 md:p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="flex-1 h-3" variant="text" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="flex-1 h-3" variant="text" />
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <Skeleton className="w-24 h-3" variant="text" />
        <Skeleton className="w-16 h-4" variant="text" />
      </div>
    </div>
  </div>
);

export const DriverCardSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 space-y-6">
    <div className="flex items-start justify-between">
      <Skeleton className="w-16 h-16 rounded-[1.5rem]" />
      <div className="flex gap-2">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-10 h-10 rounded-xl" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="w-3/4 h-5" variant="text" />
      <Skeleton className="w-1/2 h-3" variant="text" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Skeleton className="h-16 rounded-2xl" />
      <Skeleton className="h-16 rounded-2xl" />
    </div>
    <Skeleton className="w-full h-14 rounded-2xl" />
  </div>
);

export const CustomerCardSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 space-y-6">
    <div className="flex items-start justify-between">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <Skeleton className="w-20 h-6 rounded-lg" />
    </div>
    <div className="space-y-3">
      <Skeleton className="w-3/4 h-6" variant="text" />
      <Skeleton className="w-1/2 h-3" variant="text" />
      <Skeleton className="w-1/2 h-3" variant="text" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Skeleton className="h-20 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="flex-1 h-14 rounded-2xl" />
      <Skeleton className="flex-1 h-14 rounded-2xl" />
    </div>
  </div>
);
