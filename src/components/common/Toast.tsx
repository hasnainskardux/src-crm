import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCrm();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
            case 'warning':
              return <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
            case 'error':
              return <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-[#2E66F6] shrink-0" />;
          }
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-3.5 flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200"
          >
            {getIcon()}
            <div className="flex-1 min-w-0 pr-1">
              <h5 className="text-sm font-semibold text-slate-800 leading-tight">
                {toast.title}
              </h5>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
