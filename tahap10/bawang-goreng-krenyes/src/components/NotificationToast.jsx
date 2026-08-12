import React from 'react';

export function NotificationToast({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 transition-all animate-in slide-in-from-bottom-5 duration-200 ${
            toast.type === 'success'
              ? 'bg-[#351000] text-white border-[#8d4b00]'
              : toast.type === 'error'
              ? 'bg-[#b02d29] text-white border-[#ff665c]'
              : 'bg-[#51230a] text-white border-[#dbc2b0]'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' ? (
              <span className="material-symbols-outlined text-emerald-400 text-xl">check_circle</span>
            ) : toast.type === 'error' ? (
              <span className="material-symbols-outlined text-rose-300 text-xl">error</span>
            ) : (
              <span className="material-symbols-outlined text-[#ffdcc3] text-xl">info</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="font-['Plus_Jakarta_Sans'] font-bold text-xs leading-snug">
              {toast.title}
            </h5>
            <p className="font-['Be_Vietnam_Pro'] text-[11px] opacity-90 leading-tight mt-0.5">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/70 hover:text-white p-0.5 rounded-md"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  );
}
