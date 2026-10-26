'use client';

import { ArrowLeft, ArrowRight, CheckCircle2, Download, Wallet } from 'lucide-react';

interface Step2Props {
  metodePembayaran: 'COD' | 'QRIS';
  setMetodePembayaran: (v: 'COD' | 'QRIS') => void;
  totalPrice: number;
  timeLeft?: number;
  onEditData: () => void;
  onNext: () => void;
}

const OFFICIAL_QRIS_IMAGE = '/qris-bg-fajar.png';
const CASH_OPTION_IMAGE = '/cashStep2.png';
const QRIS_OPTION_IMAGE = '/qrisStep2.png';

export default function Step2Pembayaran({
  metodePembayaran,
  setMetodePembayaran,
  totalPrice,
  onEditData,
  onNext,
}: Step2Props) {
  const handleDownloadQR = async () => {
    try {
      const response = await fetch(OFFICIAL_QRIS_IMAGE);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QRIS-AlmahyraRisol-BangFajar.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Gagal mendownload gambar QR Code');
    }
  };

  return (
    /* GRID KOTAK UTAMA DENGAN BORDER KUNING & SHADOW KUNING */
    <div className="bg-white border-2 border-amber-400 rounded-2xl p-3.5 sm:p-6 shadow-[3px_3px_0px_#f59e0b] space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
        <Wallet className="w-5 h-5 text-amber-500" />
        <h2 className="text-base sm:text-lg font-black text-gray-900">
          Langkah 2: Pilih Metode Pembayaran
        </h2>
      </div>

      {/* KARTU PILIHAN CASH (HIJAU) & QRIS (BIRU) saat Aktif */}
      <div className="grid grid-cols-2 gap-3">
        {/* OPSI CASH FULL PNG */}
        <button
          type="button"
          onClick={() => setMetodePembayaran('COD')}
          className={`relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl border-2 transition-all overflow-hidden p-0.5 active:scale-95 ${
            metodePembayaran === 'COD'
              ? 'border-emerald-500 bg-emerald-50/80 shadow-[3px_3px_0px_#10b981]'
              : 'border-slate-900 bg-slate-50 hover:bg-slate-100'
          }`}
        >
          {/* CHECKMARK HIJAU */}
          {metodePembayaran === 'COD' && (
            <div className="absolute top-1.5 right-1.5 z-20 bg-emerald-500 text-white rounded-full p-0.5 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-500 text-white" />
            </div>
          )}

          <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={CASH_OPTION_IMAGE}
              alt="Poster Cash"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </button>

        {/* OPSI QRIS FULL PNG */}
        <button
          type="button"
          onClick={() => setMetodePembayaran('QRIS')}
          className={`relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl border-2 transition-all overflow-hidden p-0.5 active:scale-95 ${
            metodePembayaran === 'QRIS'
              ? 'border-blue-500 bg-blue-50/80 shadow-[3px_3px_0px_#3b82f6]'
              : 'border-slate-900 bg-slate-50 hover:bg-slate-100'
          }`}
        >
          {/* CHECKMARK BIRU */}
          {metodePembayaran === 'QRIS' && (
            <div className="absolute top-1.5 right-1.5 z-20 bg-blue-500 text-white rounded-full p-0.5 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-blue-500 text-white" />
            </div>
          )}

          <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={QRIS_OPTION_IMAGE}
              alt="Poster QRIS"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </button>
      </div>

      {/* TAMPILAN QRIS RESMI */}
      {metodePembayaran === 'QRIS' && (
        <div className="py-2 space-y-3 text-center animate-fade-in">
          <div className="space-y-0.5">
            <h4 className="font-black text-xs sm:text-sm text-gray-900">
              QRIS Almahyra Risol
            </h4>
            <p className="text-xs font-extrabold text-red-600">
              Input Pembayaran Rp {totalPrice.toLocaleString('id-ID')}
            </p>
          </div>

          <div className="max-w-[220px] mx-auto p-1.5 bg-white rounded-xl border border-slate-300 shadow-sm">
            <img
              src={OFFICIAL_QRIS_IMAGE}
              alt="QRIS Resmi Almahyra Risol Bang Fajar"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* TOMBOL DOWNLOAD */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleDownloadQR}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white font-black text-xs rounded-lg transition-all flex items-center gap-1.5 active:scale-95 shadow-md border border-orange-400"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>
      )}

      {/* FOOTER ACTION BUTTONS */}
      <div className="pt-3 flex items-center justify-between border-t border-gray-100">
        <button
          type="button"
          onClick={onEditData}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-sky-400 hover:bg-sky-500 text-white font-extrabold text-xs sm:text-sm rounded-md border border-sky-500 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Kembali</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs sm:text-sm rounded-md border border-amber-400 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}