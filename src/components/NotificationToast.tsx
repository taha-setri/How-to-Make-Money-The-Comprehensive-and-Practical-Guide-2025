import React from 'react';
import { Bell, X, Sparkles, Flame } from 'lucide-react';

interface NotificationToastProps {
  notification: { title: string; body: string } | null;
  onDismiss: () => void;
  onActionClick?: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onDismiss,
  onActionClick,
}) => {
  if (!notification) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 max-w-sm w-full bg-slate-900/95 text-white border border-emerald-500/50 shadow-2xl rounded-2xl p-4 animate-slideUp backdrop-blur-md text-right">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded">
                تنبيه فوري
              </span>
              <h5 className="font-extrabold text-xs text-white leading-tight">
                {notification.title}
              </h5>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {notification.body}
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={() => {
                  if (onActionClick) onActionClick();
                  onDismiss();
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1 rounded-lg transition-colors"
              >
                استعراض الفرصة
              </button>
              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-white text-[11px] px-2 py-1"
              >
                تجاهل
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
