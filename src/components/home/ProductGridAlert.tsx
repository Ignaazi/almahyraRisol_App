'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface ProductGridAlertProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export default function ProductGridAlert({ toasts, onRemove }: ProductGridAlertProps) {
  if (toasts.length === 0) return null;

  // Batasi maksimal 3 item terbaru
  const visibleToasts = toasts.slice(-3);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none w-full max-w-sm px-4">
      {visibleToasts.map((toast, index) => {
        // Hitung urutan dari yang paling baru (terbaru di paling bawah/depan)
        const reverseIndex = visibleToasts.length - 1 - index;

        // Tentukan skala ukuran dan opacity berdasarkan urutan
        let scaleClass = 'scale-100 z-30 opacity-100';
        let marginClass = 'mt-0';

        if (reverseIndex === 1) {
          scaleClass = 'scale-95 z-20 opacity-90';
          marginClass = '-mt-2'; // Efek menumpuk sedikit di belakang
        } else if (reverseIndex === 2) {
          scaleClass = 'scale-90 z-10 opacity-75';
          marginClass = '-mt-2';
        }

        return (
          <div
            key={toast.id}
            onClick={() => onRemove(toast.id)}
            className={`pointer-events-auto cursor-pointer bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-200/80 shadow-md flex items-center gap-3 transition-all duration-300 transform ${scaleClass} ${marginClass} hover:scale-105 active:scale-95 w-full max-w-[320px]`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
            )}

            <span className="text-xs sm:text-sm font-extrabold tracking-wide text-gray-800 truncate">
              {toast.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}