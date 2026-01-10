
import React from 'react';
import { Package, Truck, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Stat {
  title: string;
  value: string | number;
  trend: string;
  trendType: 'up' | 'down';
  icon: any;
  color: string;
}

interface DashboardCardsProps {
  stats?: Stat[];
  loading?: boolean;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-slate-100 animate-pulse rounded"></div>
              <div className="h-4 w-4 bg-slate-100 animate-pulse rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-20 bg-slate-100 animate-pulse rounded mt-1"></div>
              <div className="h-3 w-32 bg-slate-100 animate-pulse rounded mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats?.map((stat, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
              <stat.icon size={16} className={stat.color.replace('bg-', 'text-')} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900">{stat.value}</div>
            <p className="text-xs mt-1 flex items-center font-bold">
              <span className={`flex items-center mr-1 ${stat.trendType === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trendType === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </span>
              <span className="text-slate-400">vs last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
