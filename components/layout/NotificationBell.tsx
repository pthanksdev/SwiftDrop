
import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Inbox, Clock, X } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { formatDate } from '../../utils/formatters';

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, fetchNotifications, markAsRead, clearAll } = useNotifications();

  useEffect(() => {
    if (isOpen) fetchNotifications();
  }, [isOpen]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-2xl transition-colors group"
      >
        <Bell size={22} className={cn(unreadCount > 0 && "group-hover:shake")} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center px-1">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-slate-200 rounded-[2rem] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 leading-none">Notifications</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{unreadCount} Unread Alerts</p>
              </div>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAll}
                  className="text-[10px] font-black uppercase text-blue-600 h-auto p-0 hover:bg-transparent"
                >
                  Mark all as read
                </Button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={cn(
                        "p-5 hover:bg-slate-50/80 transition-colors flex gap-4 items-start relative",
                        !notif.isRead && "bg-blue-50/30"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                        !notif.isRead ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                      )}>
                        <Inbox size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-slate-900 truncate pr-4">{notif.title}</h4>
                          {!notif.isRead && (
                             <button 
                               onClick={() => markAsRead(notif.id)}
                               className="text-blue-600 hover:text-blue-700 transition-colors"
                             >
                               <CheckCircle2 size={14} />
                             </button>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                        <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-slate-400 uppercase">
                          <Clock size={10} />
                          {formatDate(notif.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Inbox size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900">All caught up!</h4>
                  <p className="text-xs text-slate-500 mt-1 px-10">You have no new notifications to display right now.</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
              <Button variant="ghost" className="w-full text-xs font-black text-slate-400 uppercase tracking-widest h-auto py-2">View All Inbox</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
