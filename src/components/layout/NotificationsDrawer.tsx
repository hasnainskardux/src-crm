import React from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  X,
  Bell,
  CheckCheck,
  Tag,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    setCurrentTab
  } = useCrm();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2E66F6] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Notifications</h3>
              <p className="text-xs text-slate-500">Real-time alerts and activity updates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAllNotifications}
              className="text-xs text-slate-500 hover:text-[#2E66F6] flex items-center gap-1 font-medium px-2 py-1 rounded hover:bg-slate-100 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No notifications right now.
            </div>
          ) : (
            notifications.map(item => {
              const getIcon = () => {
                switch (item.type) {
                  case 'offer':
                    return <Tag className="w-4 h-4 text-amber-600" />;
                  case 'appointment':
                    return <Calendar className="w-4 h-4 text-[#2E66F6]" />;
                  case 'lead':
                    return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
                  default:
                    return <AlertCircle className="w-4 h-4 text-slate-600" />;
                }
              };

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    markNotificationAsRead(item.id);
                    if (item.type === 'offer') setCurrentTab('offers');
                    if (item.type === 'appointment') setCurrentTab('calendar');
                    if (item.type === 'lead') setCurrentTab('leads');
                    setIsNotificationsOpen(false);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    item.read
                      ? 'bg-white border-slate-100 opacity-75 hover:opacity-100 hover:border-slate-200'
                      : 'bg-blue-50/40 border-blue-100/80 shadow-xs hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                      {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-800 truncate">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 shrink-0 tabular-nums">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#2E66F6] shrink-0 mt-1.5" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
          <button
            onClick={() => {
              setCurrentTab('activities');
              setIsNotificationsOpen(false);
            }}
            className="text-xs font-semibold text-[#2E66F6] hover:underline"
          >
            View Complete Activity Log →
          </button>
        </div>
      </div>
    </div>
  );
};
