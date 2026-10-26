'use client';

import confetti from 'canvas-confetti';
import { AlertCircle, ArrowLeft, CheckCircle2, Download, Printer, Send } from 'lucide-react';
import { useEffect } from 'react';

interface Step3Props {
  nama: string;
  noHp: string;
  alamat: string;
  catatan: string;
  metodePembayaran: 'COD' | 'QRIS';
  totalPrice: number;
  cartItems: any[];
  onBack?: () => void;
}

const MERCHANT_WA = '6285211489443';
const PRINT_LOGO_IMAGE = '/printPoster.png';

export default function Step3SuksesWA({
  nama,
  noHp,
  alamat,
  catatan,
  metodePembayaran,
  totalPrice,
  cartItems,
  onBack,
}: Step3Props) {
  const labelPembayaran = metodePembayaran === 'COD' ? 'Cash' : 'QRIS';

  // EFEK CONFETTI PERAYAAN
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // HANDLER DOWNLOAD RESI (FILTER LANGSUNG TOMBOL TANPA MENGUBAH STYLE / TANPA KEDIP)
  const handleDownloadReceipt = async () => {
    const receiptElement = document.getElementById('printable-receipt');
    if (!receiptElement) return;

    try {
      const { domToPng } = await import('modern-screenshot');

      // Filter elemen yang memiliki class 'receipt-actions' agar diabaikan saat pembentukan gambar
      const dataUrl = await domToPng(receiptElement, {
        scale: 3,
        backgroundColor: '#ffffff',
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains('receipt-actions')) {
            return false;
          }
          return true;
        },
      });

      // Unduh file gambar struk
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `Struk-AlmahyraRisol-${nama.replace(/\s+/g, '_') || 'Pesanan'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading receipt:', error);
      alert('Gagal mendownload gambar struk. Silakan coba lagi.');
    }
  };

  const handleSubmitKeWA = () => {
    let message = `PEMESANAN RESMI ALMAHYRA RISOL\n`;
    message += `---------------------------------\n\n`;
    
    message += `DATA PEMESAN\n`;
    message += `Nama : ${nama}\n`;
    message += `No HP : ${noHp}\n`;
    message += `Alamat : ${alamat}\n`;
    if (catatan) message += `Catatan : ${catatan}\n`;
    message += `Metode Bayar : ${labelPembayaran}\n\n`;

    message += `RINCIAN PESANAN\n`;
    cartItems.forEach((item, index) => {
      const subtotal = item.price * item.qty;
      message += `${index + 1}. ${item.name}\n`;
      message += `   (${item.qty}x Rp ${item.price.toLocaleString('id-ID')}) = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    message += `\n---------------------------------\n`;
    message += `TOTAL PEMBAYARAN : Rp ${totalPrice.toLocaleString('id-ID')}\n`;
    message += `---------------------------------\n\n`;

    if (metodePembayaran === 'QRIS') {
      message += `Saya melakukan pembayaran via QRIS. Bukti transfer akan saya kirimkan setelah pesan ini.`;
    }

    // KOSONGKAN KERANJANG & TRIGGER EVENT NAVBAR
    localStorage.removeItem('almahryra_cart');
    window.dispatchEvent(new Event('cart-updated'));

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${MERCHANT_WA}?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* STYLE KHUSUS PRINT */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible;
          }
          #printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: 2px solid #000 !important;
            box-shadow: none !important;
          }
          .receipt-actions {
            display: none !important;
          }
        }
      `}</style>

      {/* GRID KOTAK UTAMA STEP 3 */}
      <div className="bg-white border-2 border-emerald-500 rounded-2xl p-4 sm:p-6 shadow-[3px_3px_0px_#10b981] space-y-4 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-base sm:text-xl font-black text-gray-900">
            Pesanan Siap Dikirim!
          </h2>
          <p className="text-xs text-gray-600 font-bold max-w-sm mx-auto">
            Silakan periksa rincian pesanan dan kirim langsung ke WhatsApp resmi Almahyra Risol.
          </p>
        </div>

        {/* INFO KHUSUS METODE QRIS */}
        {metodePembayaran === 'QRIS' && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-tight">
              <span className="font-black text-amber-700">Penting:</span> Karena kamu menggunakan pembayaran QRIS, pastikan untuk <span className="underline decoration-amber-500 decoration-2">mengirimkan foto/screenshot bukti transfer</span> saat chat di WhatsApp ya!
            </p>
          </div>
        )}

        {/* STRUK RESI KHUSUS CETAK & DOWNLOAD */}
        <div
          id="printable-receipt"
          className="p-4 bg-white border-2 border-slate-900 rounded-xl space-y-3 font-mono text-xs text-slate-800 shadow-sm relative"
        >
          {/* HEADER STRUK DENGAN LOGO */}
          <div className="border-b-2 border-dashed border-slate-300 pb-3 flex items-center justify-between gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
              <img
                src={PRINT_LOGO_IMAGE}
                alt="Logo Almahyra Risol"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="text-right">
              <p className="font-black text-sm sm:text-base text-slate-900 tracking-tight">
                ALMAHYRA RISOL
              </p>
              <p className="text-[10px] sm:text-xs text-slate-500 font-sans font-bold">
                Bukti Rincian Pemesanan
              </p>
            </div>
          </div>

          {/* DATA PEMESAN */}
          <div className="space-y-1.5 text-[11px] sm:text-xs py-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Nama:</span>
              <span className="font-bold text-slate-900">{nama}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">No HP:</span>
              <span className="font-bold text-slate-900">{noHp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Alamat:</span>
              <span className="font-bold text-slate-900 max-w-[180px] sm:max-w-[240px] text-right truncate">
                {alamat}
              </span>
            </div>
            {catatan && (
              <div className="flex justify-between">
                <span className="text-slate-500">Catatan:</span>
                <span className="font-bold text-slate-900">{catatan}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">Pembayaran:</span>
              <span className="font-black text-slate-900 uppercase">{labelPembayaran}</span>
            </div>
          </div>

          {/* ITEM PESANAN */}
          <div className="border-t-2 border-dashed border-slate-300 pt-2.5 space-y-1.5">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[11px] sm:text-xs">
                <span>{item.name} (x{item.qty})</span>
                <span className="font-bold text-slate-900">
                  Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>

          {/* TOTAL PEMBAYARAN & ACTION BUTTONS */}
          <div className="border-t-2 border-dashed border-slate-300 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase font-sans">
                Total Pembayaran
              </span>
              <span className="font-black text-sm sm:text-base text-slate-900">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            {/* TOMBOL PRINT & DOWNLOAD (DENGAN KELAS receipt-actions DIFILTER TANPA HIDE KEDIP) */}
            <div className="receipt-actions flex items-center gap-1.5 justify-end font-sans">
              <button
                type="button"
                onClick={handlePrint}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg border border-slate-300 transition flex items-center gap-1 active:scale-95 shadow-sm"
                title="Cetak Resi"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="px-2.5 py-1.5 bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white font-extrabold text-xs rounded-lg transition flex items-center gap-1 active:scale-95 shadow-sm"
                title="Download Resi"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER ACTION BUTTONS */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-sky-400 hover:bg-sky-500 text-white font-extrabold text-xs sm:text-sm rounded-md border border-sky-500 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleSubmitKeWA}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-black text-xs sm:text-sm rounded-md transition flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <span>Kirim WA</span>
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </>
  );
}